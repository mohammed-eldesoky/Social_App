"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const DB_1 = require("../../DB");
const factory_1 = require("./factory");
const utils_2 = require("../../utils");
const utils_3 = require("../../utils");
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
    //____________________________________________________________
    login = async (req, res, next) => {
        const loginDTO = req.body;
        // 1- check if user exists
        const user = await this.userRepository.exist({ email: loginDTO.email });
        if (!user) {
            throw new utils_1.NotAuthorizedException("user not found");
        }
        // 2- check password (local accounts only)
        if (user.userAgent === utils_3.USER_AGENT.local) {
            const isPasswordValid = (0, utils_2.compareHash)(loginDTO.password, user.password);
            if (!isPasswordValid) {
                throw new utils_1.NotAuthorizedException("Invalid credentials");
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
