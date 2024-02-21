"use server";

import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { Product, UserInteraction } from "./Database";
import { UserInferredInfo } from "./types";

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
  const products = productDescriptions.map((description) => `* ${description}\n\n`).join();
  const interactions = userInteractions.map((text) => `* ${text}\n\n`).join();
  // return new Promise((resolve) =>
  //   setTimeout(
  //     () =>
  //       resolve(
  //         "This person is a tech enthusiast who enjoys cooking and is interested in home automation."
  //       ),
  //     1000
  //   )
  // );
  const chain = PromptTemplate.fromTemplate(
    `You are a personal shopper. Imagine you have to create a user description based on:

    * the description of products he has purchased until now
    * the user name
    * the user age
    * a set of free text examples written by the user.
    
    The steps to follow are
    1. The above mentioned information will be given to you.
    2. You will help me to answer the following facts about the user in the following structure. Stick to the facts and avoid making assumptions. Do not summarize information we already know from the input, deduce new information based on you experience.


    * the user name
    ===========================
    {name}
    ===========================

    * the user age
    ===========================
    {age}
    ===========================

    * the description of products he has purchased until now
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
      }).bind({
        functions: [
          {
            name: "extractor",
            description: "The user description",
            parameters: {
              type: "object",
              properties: {
                user_gender: {
                  type: "string",
                  description: "reason if the user is a man or a women and why in two sentences",
                },
                user_basic_interests: {
                  type: "string",
                  description: "reason of the user basic interests and why in two sentences",
                },
                user_communication_style: {
                  type: "string",
                  description: "reason what is his communication style and why in two sentences",
                }
              },
              required: ["user_gender", "user_basic_interests", "user_communication_style"],
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
    });
};
