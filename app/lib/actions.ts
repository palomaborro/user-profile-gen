"use server";

import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";

export const generateUserDescriptionFromTheServer: ({
  products,
}: {
  products: string;
}) => Promise<string> = async ({ products }) => {
  const chain = PromptTemplate.fromTemplate(
    `You are a personal shopper. Imagine you have to create a user description based on the user purchase history. Generate a brief description about the person who would buy the {products}. What are they like? What do they like? What are they passionate about? Stick to the facts and avoid making assumptions. Example description: "This person is a tech enthusiast who enjoys cooking and is interested in home automation."`
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
                text: {
                  type: "string",
                  description:
                    "The description of the user without formatting in simple text",
                },
              },
              required: ["text"],
            },
          },
        ],
        function_call: { name: "extractor" },
      })
    )
    .pipe(new JsonOutputFunctionsParser());

  return chain.invoke({ products }).then(({ text }) => text);
};
