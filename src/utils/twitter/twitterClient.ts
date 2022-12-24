import TwitterApi from "twitter-api-v2";
import config from "@/config";

export const getTwitterClient = () =>
  new TwitterApi({
    clientId: config.TWITTER_API_KEY!,
    clientSecret: config.TWITTER_API_SECRET!,
  });
