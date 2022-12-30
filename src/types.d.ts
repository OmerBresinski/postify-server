import "express";
import "express-session";

declare global {
  namespace Express {
    interface User {
      id: number;
      twitterId: string;
      profileUrl?: string | null;
      createdAt: Date;
      updatedAt: Date;
      twitterAccessToken: string;
      twitterUsername: string;
    }
  }
}
declare module "express-session" {
  interface SessionData {
    code?: string;
    state?: string;
    codeVerifier?: string;
    oauth_token?: string;
    oauth_token_secret?: string;
  }
}
