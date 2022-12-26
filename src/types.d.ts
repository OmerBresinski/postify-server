import "express-session";
declare module "express-session" {
  interface SessionData {
    code?: string;
    state?: string;
    codeVerifier?: string;
    oauth_token?: string;
    oauth_token_secret?: string;
  }
}
