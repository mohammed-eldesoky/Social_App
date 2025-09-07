import { NextFunction, Request, Response } from "express";
import { RegistterDTO } from "./auth.dto";
import User from "../../DB/models/user/user.model";
import { ConflictException } from "../../utils/error";

import { IUser } from "../../utils/common/interface";
import { UserRepository } from "../../DB/models/user/user.repository";

class AuthService {
  // private dbService  = new DBService<IUser>(User);
  private userRepository= new UserRepository();

  constructor() {}

  async register(req: Request, res: Response, next: NextFunction) {
    //get data from req
    const registterDTO: RegistterDTO = req.body;
    //check user existance
    const userExist = await this.userRepository.exist({email:registterDTO.email})
    //fail case
    if (userExist) {
      throw new ConflictException("User already exist");
    }

    //prepare data>>user document
    //create user
 const createdUser = await  this.userRepository.create(registterDTO);
    //send response

    return res.status(201).json({
      message: "User created successfully",
      success: true,
    
    });
  }
}

export default new AuthService(); //single ton
