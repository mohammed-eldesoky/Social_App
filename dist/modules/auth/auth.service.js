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
const auth_provider_1 = require("./auth.provider");
const token_model_1 = __importDefault(require("./../../DB/models/token/token.model"));
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
        if (user.userAgent === utils_3.USER_AGENT.local) {
            const isPasswordValid = await (0, utils_2.compareHash)(loginDTO.password, user.password);
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
        const isPasswordValid = await (0, utils_2.compareHash)(updatePasswordDTO.oldPassword, user.password);
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
}
exports.default = new AuthService(); //single ton
