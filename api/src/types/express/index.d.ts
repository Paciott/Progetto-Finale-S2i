export {}

declare global {
  namespace Express {
    export interface Request {
      jwt?: string;
    }
  }
}