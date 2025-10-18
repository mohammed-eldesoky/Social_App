"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketAuth = void 0;
const DB_1 = require("../../DB");
const utils_1 = require("../../utils");
const socketAuth = async (socket, next) => {
    try {
        const { authorization } = socket.handshake.auth;
        const payload = (0, utils_1.verifyToken)(authorization); //throw error
        const userRepository = new DB_1.UserRepository();
        const user = userRepository.getOne({ _id: payload._id });
        if (!user) {
            throw new utils_1.NotFoundException("User not found");
        }
        socket.data.user = user;
        next();
    }
    catch (error) {
        next(error); ///frontend >>emit >> to catch error
    }
};
exports.socketAuth = socketAuth;
