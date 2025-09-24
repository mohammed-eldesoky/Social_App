import { IUser } from "../../utils";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export {};