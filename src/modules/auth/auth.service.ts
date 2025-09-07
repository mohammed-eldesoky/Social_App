import { NextFunction, Request, Response } from "express";
import { RegistterDTO } from "./auth.dto";
import { ConflictException } from "../../utils/error";
import { UserRepository } from "../../DB/models/user/user.repository";
import { AuthFactory } from "./factory";

class AuthService {
  // private dbService  = new DBService<IUser>(User);
  private userRepository = new UserRepository();
  private authFactory = new AuthFactory();
  constructor() {}

   register= async(req: Request, res: Response, next: NextFunction)=> {
    //get data from req
    const registterDTO: RegistterDTO = req.body;
    //check user existance
    const userExist = await this.userRepository.exist({
      email: registterDTO.email,
    });
    //fail case
    if (userExist) {
      throw new ConflictException("User already exist");
    }

    //prepare data>>user document>> factory design pattern
    const user = this.authFactory.register(registterDTO);
    //create user
    const createdUser = await this.userRepository.create(user);
    //send response

    return res.status(201).json({
      message: "User created successfully",
      success: true,
      data: createdUser,
    });
  }
}

export default new AuthService(); //single ton
