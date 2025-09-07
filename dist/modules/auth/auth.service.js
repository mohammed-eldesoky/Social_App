"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthService {
    constructor() { }
    register(req, res, next) {
        //get data from req
        const registterDTO = req.body;
        //check user existance
        //prepare data
        //create user
        //send response
    }
}
exports.default = new AuthService(); //single ton
