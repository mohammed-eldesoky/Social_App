"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authProvider = void 0;
const DB_1 = require("../../DB");
const utils_1 = require("../../utils");
exports.authProvider = {
    async checkOtp(verifyAccountDTO) {
        const userRepository = new DB_1.UserRepository();
        //check user existance
        const userExist = await userRepository.exist({ email: verifyAccountDTO.email });
        //fail case
        if (!userExist) {
            throw new utils_1.NotFoundException("User not found");
        }
        //check otp 
        if (userExist.otp !== verifyAccountDTO.otp) {
            throw new utils_1.BadRequestException("Invalid otp");
        }
        //check otp expiry
        if (!userExist.otpExpiryAt || userExist.otpExpiryAt.getTime() < Date.now()) {
            throw new utils_1.BadRequestException("Otp Expired");
        }
    },
};
