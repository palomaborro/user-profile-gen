"use server";

import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { Product, UserInteraction } from "./Database";

type UserInfoServer = {
  name: string;
  age: number;
  productDescriptions: Array<Product["description"]>;
  userInteraction: Array<UserInteraction["text"]>;
};

export const generateUserDescriptionFromTheServer: ({
  productDescriptions,
  name,
  age,
  userInteraction,
}: UserInfoServer) => Promise<string> = async ({
  productDescriptions,
  name,
  age,
  userInteraction,
}) => {
  const products = productDescriptions.join(". ");
  const interactions = userInteraction.join(". ");
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
    `You are a personal shopper. Imagine you have to create a user description based on the user purchase history. The user's name is {name}, age is {age}, and they have bought the following products: ${products}. They have had the following interactions: ${interactions}. Generate a brief description about the person who would buy these products. What are they like? What do they like? What are they passionate about? Stick to the facts and avoid making assumptions. Example description: "This person is a tech enthusiast who enjoys cooking and is interested in home automation."`
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
                user_description: {
                  type: "string",
                  description: "The description of the user",
                },
              },
              required: ["user_description"],
            },
          },
        ],
        function_call: { name: "extractor" },
      })
    )
    .pipe(new JsonOutputFunctionsParser());

  return chain
    .invoke({
      productDescriptions: products,
      name,
      age: age.toString(),
      userInteraction: interactions,
    })
    .then((result: string) => result);
};
