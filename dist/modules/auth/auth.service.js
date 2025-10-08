"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const DB_1 = require("../../DB");
const factory_1 = require("./factory");
const utils_2 = require("../../utils");
const utils_3 = require("../../utils");
const utils_4 = require("../../utils");
const auth_provider_1 = require("./auth.provider");
const token_model_1 = __importDefault(require("./../../DB/models/token/token.model"));
const google_auth_library_1 = require("google-auth-library");
class AuthService {
    // private dbService  = new DBService<IUser>(User);
    userRepository = new DB_1.UserRepository();
    authFactory = new factory_1.AuthFactory();
    constructor() { }
    register = async (req, res, next) => {
        //get data from req
        const registterDTO = req.body;
        //check user existance
        const userExist = await this.userRepository.exist({
            email: registterDTO.email,
        });
        //fail case
        if (userExist) {
            throw new utils_1.ConflictException("User already exist");
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
    login = async (req, res, next) => {
        // 1- get data from body
        const loginDTO = req.body;
        // 2- check if user exists
        const user = await this.userRepository.exist({ email: loginDTO.email });
        if (!user) {
            throw new utils_1.ForbiddentException("user not found");
        }
        // 3- check password (local accounts only)
        if (user.userAgent === utils_4.USER_AGENT.local) {
            const isPasswordValid = await (0, utils_3.compareHash)(loginDTO.password, user.password);
            if (!isPasswordValid) {
                throw new utils_1.ForbiddentException("Invalid credentials");
            }
        }
        //4-generate access token
        const accessToken = (0, utils_1.generateToken)({
            payload: { _id: user._id, role: user.role },
            options: { expiresIn: "1d" },
        });
        //generate refresh token
        const refreshToken = (0, utils_1.generateToken)({
            payload: { _id: user._id, role: user.role },
            options: { expiresIn: "7d" },
        });
        //token in db
        token_model_1.default.create({
            token: refreshToken,
            user: user._id,
            type: utils_1.TOKEN_TYPES.refresh,
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
    verifyAccount = async (req, res, next) => {
        //get data from req
        const verifyAccountDTO = req.body;
        //provider
        await auth_provider_1.authProvider.checkOtp(verifyAccountDTO);
        //updete user
        await this.userRepository.update({ email: verifyAccountDTO.email }, { isVerified: true, $unset: { otp: "", otpExpiryAt: "" } });
        // send response
        return res.status(200).json({
            message: "Account verified successfully",
            success: true,
        });
    };
    //__________________________________________________________________________________________________
    updatePassword = async (req, res, next) => {
        //get data from req
        const updatePasswordDTO = req.body;
        const userId = req.user._id;
        // Check if user exists
        const user = await this.userRepository.exist({ _id: userId });
        if (!user) {
            throw new utils_1.NotFoundException("User not found");
        }
        // compare old password
        const isPasswordValid = await (0, utils_3.compareHash)(updatePasswordDTO.oldPassword, user.password);
        if (!isPasswordValid) {
            throw new utils_1.ForbiddentException("Invalid credentials");
        }
        //prepare data
        const updatedUser = await this.authFactory.updatePassword(updatePasswordDTO);
        //update user
        await this.userRepository.update({ _id: userId }, updatedUser);
        //send response
        return res.status(200).json({
            message: "Password updated successfully",
            success: true,
        });
    };
    //__________________________________________________________________________________________________
    updateBasicInfoAndEmail = async (req, res, next) => {
        // get data from req
        const updateBasicInfoDTO = req.body;
        const userId = req.user._id;
        // Check if user exists
        const userExist = await this.userRepository.exist({ _id: userId });
        if (!userExist) {
            throw new utils_1.NotFoundException("User not found");
        }
        // check if email already exists
        if (updateBasicInfoDTO.email &&
            updateBasicInfoDTO.email !== userExist.email) {
            const emailExist = await this.userRepository.exist({
                email: updateBasicInfoDTO.email,
            });
            if (emailExist) {
                throw new utils_1.ConflictException("Email already exists");
            }
        }
        //prepare data
        const updatedUser = await this.authFactory.updateBasicInfoAndEmail(updateBasicInfoDTO);
        //update user
        await this.userRepository.update({ _id: userId }, updatedUser);
        //send response
        return res.status(200).json({
            message: "Basic info updated successfully",
            success: true,
        });
    };
    //__________________________________________________________________________________________________
    loginWithGoogle = async (req, res, next) => {
        // 1- get data from body
        const { idToken } = req.body;
        // 2- verify the id token and get user info from google
        const client = new google_auth_library_1.OAuth2Client(process.env.TOKEN_GOOGLE);
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
                userAgent: utils_4.USER_AGENT.google,
                role: utils_1.SYS_ROLES.user,
                isVerified: true,
            });
        }
        // 6- generate access token
        const token = (0, utils_1.generateToken)({
            payload: { _id: userExist._id, role: userExist.role },
            options: { expiresIn: "1d" },
        });
        return res.status(200).json({
            message: "Login with google successfully",
            success: true,
            data: { accessToken: token },
        });
    };
    //__________________________________________________________________________________________________
    sendOtp = async (req, res, next) => {
        //get data from req
        const { email } = req.body;
        //check user existance
        const userExist = await this.userRepository.exist({ email: email });
        //fail case
        if (!userExist) {
            throw new utils_1.NotFoundException("User not found");
        }
        // prevent resend if user is banned
        if (userExist.banUntil && userExist.banUntil > new Date()) {
            const remaining = Math.ceil((userExist.banUntil.getTime() - Date.now()) / 1000);
            throw new utils_1.BadRequestException(`You are temporarily banned. Try again after ${remaining} seconds.`);
        }
        //generate otp
        const otp = (0, utils_1.generateOtp)();
        const otpExpiryAt = (0, utils_1.generateOtpExpiryTime)(10); // 10 minutes from now
        //update user
        await this.userRepository.update({ email: email }, { otp: otp, otpExpiryAt: otpExpiryAt });
        //send email
        await (0, utils_2.sendEmail)({
            from: `"Social App" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: " Confirm Your Account",
            html: `<h1>Your OTP :${otp} </h1>
      <p>OTP is valid for 10 minutes</p>
      `,
        });
        //send response
        return res.status(200).json({
            message: "OTP sent successfully",
            success: true,
        });
    };
    //__________________________________________________________________________________________________
    forgetPassword = async (req, res, next) => {
        //get data from req
        const forgetPasswordDTO = req.body;
        //check user existance
        const userExist = await this.userRepository.exist({ email: forgetPasswordDTO.email });
        //fail case
        if (!userExist) {
            throw new utils_1.NotFoundException("User not found");
        }
        // check if otp is valid
        if (userExist.otp !== forgetPasswordDTO.otp) {
            throw new utils_1.BadRequestException("Invalid otp");
        }
        // check if otp is expired
        if (userExist.otpExpiryAt < new Date()) {
            throw new utils_1.BadRequestException("Otp is expired");
        }
        // update  password
        userExist.password = await (0, utils_1.generateHash)(forgetPasswordDTO.newPassword);
        userExist.otp = undefined;
        userExist.credenialUpdatedAt = new Date();
        userExist.otpExpiryAt = undefined;
        await userExist.save();
        // destroy all refresh tokens
        await token_model_1.default.deleteMany({ user: userExist._id, type: utils_1.TOKEN_TYPES.refresh });
        // send response
        return res.status(200).json({
            message: "Password updated successfully",
            success: true,
        });
    };
}
exports.default = new AuthService(); //single ton
