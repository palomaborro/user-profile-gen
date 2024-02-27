"use server";

import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { Product, UserInteraction } from "./Database";
import { UserInferredInfo } from "./types";
import { getServerSession } from "next-auth";
import { sql } from "@vercel/postgres";
import { headers } from "next/headers";
import {
  USER_CLUSTERING,
  USER_BASIC_INTERESTS,
  USER_COMMUNICATION_STYLE,
} from "./constants";

type UserInfoServer = {
  name: string;
  age: number;
  productDescriptions: Array<Product["description"]>;
  userInteractions: Array<UserInteraction["text"]>;
};

export const generateUserDescriptionFromTheServer: ({
  productDescriptions,
  name,
  age,
  userInteractions,
}: UserInfoServer) => Promise<UserInferredInfo> = async ({
  productDescriptions,
  name,
  age,
  userInteractions,
}) => {
  const session = await getServerSession();

  if (!session) {
    return {
      user_clustering: "",
      user_basic_interests: "",
      user_communication_style: "",
      success: false,
    };
  }

  const products = productDescriptions
    .map((description) => `* ${description}\n\n`)
    .join();
  const interactions = userInteractions.map((text) => `* ${text}\n\n`).join();

  const chain = PromptTemplate.fromTemplate(
    `You are a personal shopper. Imagine you have to create a user description based on:

    * the description of products he has purchased until now
    * the user name
    * the user age
    * a set of free text examples written by the user.
    
    The steps to follow are
    1. The above mentioned information will be given to you.
    2. You will help me to answer the following facts about the user in the following structure. Select more than one option when possible.


    * the user name
    ===========================
    {name}
    ===========================

    * the user age
    ===========================
    {age}
    ===========================

    * the description of products they have purchased until now
    ===========================
    {products}
    ===========================


    set of free text examples written by the user
    ===========================
    {interactions}
    ===========================`
  )
    .pipe(
      new ChatOpenAI({
        modelName: "gpt-3.5-turbo",
        temperature: 0.5,
        maxRetries: 2,
        callbacks: [
          {
            handleLLMEnd: ({ llmOutput }) => {
              const headersList = headers();
              const request = headersList.get("host");

              if (request !== "localhost:3000") {
                return sql`INSERT INTO poc_request (request_date, "user", tokens, comment, app) VALUES (NOW(), ${
                  session.user?.email
                }, ${
                  llmOutput?.tokenUsage.totalTokens
                }, ${null}, 'user-profile-gen')`;
              }
            },
          },
        ],
      }).bind({
        functions: [
          {
            name: "extractor",
            description: "The user description",
            parameters: {
              type: "object",
              properties: {
                user_clustering: {
                  type: "string",
                  enum: USER_CLUSTERING,
                  description:
                    "Make a clustering of the user based on the input. Use more than one cluster when possible based on the user_basic_interests. Example: 'Artists, Families, Creative'. If you can't find a cluster, use 'Other' as a fallback option",
                },
                user_basic_interests: {
                  type: "string",
                  enum: USER_BASIC_INTERESTS,
                  description:
                    "Make a list of the user basic interests. Use more than one interest when possible based on the user_clustering. Example: 'Cooking, Music, Art'. If you can't find an interest, use 'Other' as a fallback option.",
                },
                user_communication_style: {
                  type: "string",
                  enum: USER_COMMUNICATION_STYLE,
                  description:
                    "Make a list of the user communication style. Use more than one style when possible. Example: 'Respectful, Angry, Demanding'. If you can't find a style, use 'Other' as a fallback option.",
                },
              },
              required: [
                "user_clustering",
                "user_basic_interests",
                "user_communication_style",
              ],
            },
          },
        ],
        function_call: { name: "extractor" },
      })
    )
    .pipe(new JsonOutputFunctionsParser());

  return chain
    .invoke({
      products,
      name,
      age: age.toString(),
      interactions,
    })
    .then((result: Omit<UserInferredInfo, "success">) => ({
      ...result,
      success: true,
    }));
};
