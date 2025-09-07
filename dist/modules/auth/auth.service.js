"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../DB/models/user/user.model"));
const error_1 = require("../../utils/error");
class AuthService {
    constructor() { }
    async register(req, res, next) {
        //get data from req
        const registterDTO = req.body;
        //check user existance
        const userExist = await user_model_1.default.findOne({ email: registterDTO.email });
        //fail case 
        if (userExist) {
            throw new error_1.ConflictException("User already exist");
        }
        //prepare data
        //create user
        //send response
    }
}
exports.default = new AuthService(); //single ton
