import { NextFunction, Request, Response } from "express";
import {
  LoginDTO,
  RegistterDTO,
  UpdateBasicInfoDTO,
  UpdatePasswordDTO,
  VerifyAccountDTO,
} from "./auth.dto";
import {
  BadRequestException,
  ConflictException,
  UnAuthorizedException,
  NotFoundException,
  ForbiddentException,
  generateToken,
  TOKEN_TYPES,
  SYS_ROLES,
} from "../../utils";
import { UserRepository } from "../../DB";
import { AuthFactory } from "./factory";
import { sendEmail } from "../../utils";
import { compareHash } from "../../utils";
import { USER_AGENT } from "../../utils";
import { authProvider } from "./auth.provider";
import Token from "./../../DB/models/token/token.model";
import { OAuth2Client } from "google-auth-library";

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
    // 1- get data from body
    const loginDTO: LoginDTO = req.body;

    // 2- check if user exists
    const user = await this.userRepository.exist({ email: loginDTO.email });
    if (!user) {
      throw new ForbiddentException("user not found");
    }

    // 3- check password (local accounts only)
    if (user.userAgent === USER_AGENT.local) {
      const isPasswordValid = await compareHash(
        loginDTO.password,
        user.password
      );
      if (!isPasswordValid) {
        throw new ForbiddentException("Invalid credentials");
      }
    }

    //4-generate access token
    const accessToken = generateToken({
      payload: { _id: user._id, role: user.role },
      options: { expiresIn: "1d" },
    });

    //generate refresh token
    const refreshToken = generateToken({
      payload: { _id: user._id, role: user.role },
      options: { expiresIn: "7d" },
    });

    //token in db

    Token.create({
      token: refreshToken,
      user: user._id,
      type: TOKEN_TYPES.refresh,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });
    // 5- send response
    return res.status(200).json({
      message: "Login successfully",
      success: true,
      data: { accessToken, refreshToken },
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

  //__________________________________________________________________________________________________

  updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    //get data from req
    const updatePasswordDTO: UpdatePasswordDTO = req.body;
    const userId = req.user._id;

    // Check if user exists
    const user = await this.userRepository.exist({ _id: userId });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    // compare old password
    const isPasswordValid = await compareHash(
      updatePasswordDTO.oldPassword,
      user.password
    );
    if (!isPasswordValid) {
      throw new ForbiddentException("Invalid credentials");
    }
    //prepare data
    const updatedUser = await this.authFactory.updatePassword(
      updatePasswordDTO
    );
    //update user
    await this.userRepository.update({ _id: userId }, updatedUser);
    //send response
    return res.status(200).json({
      message: "Password updated successfully",
      success: true,
    });
  };

  //__________________________________________________________________________________________________
  updateBasicInfoAndEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // get data from req
    const updateBasicInfoDTO: UpdateBasicInfoDTO = req.body;
    const userId = req.user._id;

    // Check if user exists
    const userExist = await this.userRepository.exist({ _id: userId });
    if (!userExist) {
      throw new NotFoundException("User not found");
    }

    // check if email already exists
    if (
      updateBasicInfoDTO.email &&
      updateBasicInfoDTO.email !== userExist.email
    ) {
      const emailExist = await this.userRepository.exist({
        email: updateBasicInfoDTO.email,
      });
      if (emailExist) {
        throw new ConflictException("Email already exists");
      }
    }
    //prepare data
    const updatedUser = await this.authFactory.updateBasicInfoAndEmail(
      updateBasicInfoDTO
    );
    //update user
    await this.userRepository.update({ _id: userId }, updatedUser);
    //send response
    return res.status(200).json({
      message: "Basic info updated successfully",
      success: true,
    });
  };
  
  //__________________________________________________________________________________________________
  loginWithGoogle = async (req: Request, res: Response, next: NextFunction) => {
    // 1- get data from body
    const { idToken } = req.body;
    // 2- verify the id token and get user info from google
    const client = new OAuth2Client(process.env.TOKEN_GOOGLE);
    // 3- verify the id token
    const ticket = await client.verifyIdToken({ idToken });

    const payload = ticket.getPayload(); // {email, name, picture, sub}
    // 4- check if user exists in our db
    let userExist = await this.userRepository.exist({ email: payload.email });
    if (!userExist) {
      // 5- if not, create a new user
      const createdUser = await this.userRepository.create({
        fullName: payload.name,
        email: payload.email,
        userAgent: USER_AGENT.google,
        role: SYS_ROLES.user,
        isVerified: true,
      });
    }
    // 6- generate access token
    const token = generateToken({
      payload: { _id: userExist._id, role: userExist.role },
      options: { expiresIn: "1d" },
    });

    return res
      .status(200)
      .json({
        message: "Login with google successfully",
        success: true,
        data: { accessToken: token },
      });
  };
}

export default new AuthService(); //single ton
