"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthService {
    constructor() { }
    register(req, res, next) {
        return res.status(200).json({ message: "Register endpoint" });
    }
}
exports.default = new AuthService(); //single ton
