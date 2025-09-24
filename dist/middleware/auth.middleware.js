"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const utils_1 = require("../utils");
const DB_1 = require("../DB");
// auth middleware
const isAuthenticated = () => {
    return async (req, res, next) => {
        const token = req.headers.authorization;
        const payload = (0, utils_1.verifyToken)(token);
        const userRepository = new DB_1.UserRepository();
        const user = await userRepository.exist({ _id: payload._id });
        if (!user) {
            throw new utils_1.NotFoundException("User not found");
        }
        //logout >>iat
        req.user = user;
        next();
    };
};
exports.isAuthenticated = isAuthenticated;
