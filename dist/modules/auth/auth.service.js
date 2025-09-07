"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../../utils/error");
const user_repository_1 = require("../../DB/models/user/user.repository");
const factory_1 = require("./factory");
class AuthService {
    // private dbService  = new DBService<IUser>(User);
    userRepository = new user_repository_1.UserRepository();
    authFactory = new factory_1.AuthFactory();
    constructor() { }
    async register(req, res, next) {
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
        const createdUser = await this.userRepository.create(user);
        //send response
        return res.status(201).json({
            message: "User created successfully",
            success: true,
        });
    }
}
exports.default = new AuthService(); //single ton
