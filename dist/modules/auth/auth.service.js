"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../../utils/error");
const user_repository_1 = require("../../DB/models/user/user.repository");
const factory_1 = require("./factory");
const email_1 = require("../../utils/email");
const hash_1 = require("../../utils/hash");
const enum_1 = require("../../utils/common/enum");
class AuthService {
    // private dbService  = new DBService<IUser>(User);
    userRepository = new user_repository_1.UserRepository();
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
            throw new error_1.ConflictException("User already exist");
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
        await (0, email_1.sendEmail)({
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
    login = async (req, res, next) => {
        const loginDTO = req.body;
        // 1- check if user exists
        const user = await this.userRepository.exist({ email: loginDTO.email });
        if (!user) {
            throw new error_1.NotAuthorizedException("user not found");
        }
        // 2- check password (local accounts only)
        if (user.userAgent === enum_1.USER_AGENT.local) {
            const isPasswordValid = (0, hash_1.compareHash)(loginDTO.password, user.password);
            if (!isPasswordValid) {
                throw new error_1.NotAuthorizedException("Invalid credentials");
            }
        }
        // 3- send response
        return res.status(200).json({
            message: "Login successfully",
            success: true,
        });
    };
}
exports.default = new AuthService(); //single ton
