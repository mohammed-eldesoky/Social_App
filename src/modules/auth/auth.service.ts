import { NextFunction, Request, Response } from "express";
import { LoginDTO, RegistterDTO } from "./auth.dto";
import {
  BadRequestException,
  ConflictException,
  NotAuthorizedException,
} from "../../utils/error";
import { UserRepository } from "../../DB/models/user/user.repository";
import { AuthFactory } from "./factory";
import { sendEmail } from "../../utils/email";
import { compareHash } from "../../utils/hash";
import { USER_AGENT } from "../../utils/common/enum";
import * as authValidation from "./auth.validation";
import { log } from "console";
import { map } from "zod/mini";
class AuthService {
  // private dbService  = new DBService<IUser>(User);
  private userRepository = new UserRepository();
  private authFactory = new AuthFactory();
  constructor() {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    //get data from req
    const registterDTO: RegistterDTO = req.body;
    // validation
    const result = authValidation.registerSchema.safeParse(registterDTO);
    if (result.success == false) {
      let errMessage = result.error.issues.map((issue) => ({
        path: issue.path[0],
        message: issue.message,
      })); //return {}
      log(errMessage);
      throw new BadRequestException("validation failed", errMessage);
    
    }
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
    const createdUserdoc = await this.userRepository.create(user);
    //convert to plain object
    const createdUser = createdUserdoc.toObject();

    // 4- send OTP via email
    const htmlTemplate = `
        <h1>Welcome to Social App 🎉</h1>
        <p>Hi ${createdUser.email},</p>
        <p>Your OTP code is: <strong>${createdUser.otp}</strong></p>
        <p>This code will expire in 5 minutes.</p>
      `;
    //send email

    await sendEmail({
      to: createdUser.email,
      subject: "Verify your email - Social App",
      html: htmlTemplate,
    });

    //send response

    return res.status(201).json({
      message: "User created successfully",
      success: true,
      data: createdUser,
    });
  };

  //____________________________________________________________
  login = async (req: Request, res: Response, next: NextFunction) => {
    const loginDTO: LoginDTO = req.body;

    // 1- check if user exists
    const user = await this.userRepository.exist({ email: loginDTO.email });
    if (!user) {
      throw new NotAuthorizedException("user not found");
    }

    // 2- check password (local accounts only)
    if (user.userAgent === USER_AGENT.local) {
      const isPasswordValid = compareHash(loginDTO.password, user.password);
      if (!isPasswordValid) {
        throw new NotAuthorizedException("Invalid credentials");
      }
    }

    // 3- send response
    return res.status(200).json({
      message: "Login successfully",
      success: true,
    });
  };
}

export default new AuthService(); //single ton
