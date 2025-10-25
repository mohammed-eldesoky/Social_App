import { NextFunction, Request, Response } from "express";
import { NotFoundException, verifyToken } from "../utils";
import { UserRepository } from "../DB";

// auth middleware
export const isAuthenticatedGraphql = async (context: any) => {
    const token = context.token;
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
    context.user = user;

  };
