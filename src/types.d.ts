import "express-session";
declare module "express-session" {
  interface SessionData {
    code?: string;
    state?: string;
  }
}
