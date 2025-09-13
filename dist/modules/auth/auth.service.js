"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../../utils/error");
const user_repository_1 = require("../../DB/models/user/user.repository");
const factory_1 = require("./factory");
const email_1 = require("../../utils/email");
const hash_1 = require("../../utils/hash");
const enum_1 = require("../../utils/common/enum");
const authValidation = __importStar(require("./auth.validation"));
const console_1 = require("console");
class AuthService {
    // private dbService  = new DBService<IUser>(User);
    userRepository = new user_repository_1.UserRepository();
    authFactory = new factory_1.AuthFactory();
    constructor() { }
    register = async (req, res, next) => {
        //get data from req
        const registterDTO = req.body;
        // validation
        const result = authValidation.registerSchema.safeParse(registterDTO);
        if (result.success == false) {
            let errMessage = result.error.issues.map((issue) => ({
                path: issue.path[0],
                message: issue.message,
            })); //return {}
            (0, console_1.log)(errMessage);
            throw new error_1.BadRequestException("validation failed", errMessage);
        }
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
