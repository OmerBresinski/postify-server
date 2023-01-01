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
    const pastTweetsText = pastTweets.map((tweet) => tweet.text).join('"\n"');
    return `Considering the following past tweets of this twitter user, as well as their sentiment: "${pastTweetsText}",\nwrite a tweet using the same writing style, while ignoring any tags, but which would convey the following text: ${text}\n without tagging anyone or using any hashtags and no quotes`;
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

      return openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        max_tokens: 255,
        n: 1,
      });
    },
  };
};
