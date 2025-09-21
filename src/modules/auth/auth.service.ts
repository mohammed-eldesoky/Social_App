import { NextFunction, Request, Response } from "express";
import { LoginDTO, RegistterDTO, VerifyAccountDTO } from "./auth.dto";
import {
  BadRequestException,
  ConflictException,
  NotAuthorizedException,
  NotFoundException,
} from "../../utils";
import { UserRepository } from "../../DB";
import { AuthFactory } from "./factory";
import { sendEmail } from "../../utils";
import { compareHash } from "../../utils";
import { USER_AGENT } from "../../utils";
import { authProvider } from "./auth.provider";

class AuthService {
  // private dbService  = new DBService<IUser>(User);
  private userRepository = new UserRepository();
  private authFactory = new AuthFactory();
  constructor() {}

  register = async (req: Request, res: Response, next: NextFunction) => {
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
    const user = await this.authFactory.register(registterDTO);
    //create user
    const createdUserdoc = await this.userRepository.create(user);
    //convert to plain object
    const createdUser = createdUserdoc.toObject();

    //send response

    return res.status(201).json({
      message: "User created successfully",
      success: true,
      data: createdUser,
    });
  };

  //_______________________________________________________________________________________________
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

  //__________________________________________________________________________________________________

  verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
    //get data from req
    const verifyAccountDTO: VerifyAccountDTO = req.body;
    //provider
    await authProvider.checkOtp(verifyAccountDTO);

    //updete user
    await this.userRepository.update(
      { email: verifyAccountDTO.email },
      { isVerified: true, $unset: { otp: "", otpExpiryAt: "" } }
    );

// send response
    return res.status(200).json({
      message: "Account verified successfully",
      success: true,
    });




  };
}

export default new AuthService(); //single ton
