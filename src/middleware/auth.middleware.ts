import { NextFunction, Request, Response } from "express";
import { NotFoundException, verifyToken } from "../utils";
import { UserRepository } from "../DB";

// auth middleware
export const isAuthenticated = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization as string;
    const payload = verifyToken(token);
    const userRepository = new UserRepository();
    const user = await userRepository.exist(
      { _id: payload._id },
      {},
      { populate: [{ path: "friends", select: "fullName firstName lastName" }] }
    );
    if (!user) {
      throw new NotFoundException("User not found");
    }
    //logout >>iat
    req.user = user;
    next();
  };
};
