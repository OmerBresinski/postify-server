import TwitterApi, { type TwitterApiTokens } from "twitter-api-v2";
import Config from "@/config";

interface TwitterUserClient {
  accessToken: string;
  accessSecret: string;
  oauthVerifier: string;
}

export const getTwitterClient = (params: Partial<TwitterApiTokens> = {}) =>
  new TwitterApi({
    appKey: Config.TWITTER_API_KEY!,
    appSecret: Config.TWITTER_API_SECRET!,
    ...params,
  });

export const getTwitterUserClient = async ({
  accessSecret,
  accessToken,
  oauthVerifier,
}: TwitterUserClient) => {
  const client = getTwitterClient({
    accessSecret,
    accessToken,
  });
  const { client: userClient } = await client.login(oauthVerifier);

  return userClient;
};
