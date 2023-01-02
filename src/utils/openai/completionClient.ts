import Config from "@/config";
import { Configuration, OpenAIApi } from "openai";
import { prismaClient } from "@/utils/prisma/prismaClient";

interface Tweet {
  text: string;
}

interface Instructions {
  text: string;
  pastTweets: Tweet[];
}

const configuration = new Configuration({
  apiKey: Config.OPEN_AI_KEY,
  organization: Config.OPEN_AI_ORG,
});

const getPrompt = ({ text, pastTweets }: Instructions) => {
  try {
    const pastTweetsText = pastTweets?.map((tweet) => tweet.text).join('",\n"');
    return `As a twitter influencer, create a tweet using the following text as inspiration: "${text}", without using any hashtags or tags`;
  } catch (ex) {
    console.log(ex);
    return "";
  }
};

export const getCompletionClient = () => {
  const openai = new OpenAIApi(configuration);

  return {
    createCompletion: async ({ text, pastTweets }: Instructions) => {
      const prompt = getPrompt({ text, pastTweets });

      console.log(prompt);

      return openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        max_tokens: 255,
        n: 1,
      });
    },
  };
};
