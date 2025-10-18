"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = require("../../DB/models/user/user.repository");
class UserService {
    userRepository = new user_repository_1.UserRepository();
    constructor() { }
    getProfile = async (req, res, next) => {
        return res.status(200).json({ message: "success", success: true, data: { user: req.user } });
    };
}
exports.default = new UserService(); //single ton
