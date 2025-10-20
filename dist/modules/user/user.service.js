"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = require("../../DB/models/user/user.repository");
const utils_1 = require("../../utils");
class UserService {
    userRepository = new user_repository_1.UserRepository();
    constructor() { }
    getProfile = async (req, res, next) => {
        return res
            .status(200)
            .json({ message: "success", success: true, data: { user: req.user } });
    };
    //_________________block user____________________
    blockUser = async (req, res, next) => {
        //get data from req
        const userId = req.user._id;
        const { targetId } = req.params;
        //check if user not self
        if (userId.toString() === targetId) {
            throw new utils_1.BadRequestException("You cannot block yourself");
        }
        //check if target user exist
        const targetUserExist = await this.userRepository.exist({ _id: targetId });
        if (!targetUserExist) {
            throw new utils_1.NotFoundException("Target user not found");
        }
        //block user
        await this.userRepository.blockUser(userId.toString(), targetId);
        return res
            .status(200)
            .json({ message: "User blocked successfully", success: true });
    };
}
exports.default = new UserService(); //single ton
