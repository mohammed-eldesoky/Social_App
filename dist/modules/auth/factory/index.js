"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthFactory = void 0;
const enum_1 = require("../../../utils/common/enum");
const hash_1 = require("../../../utils/hash");
const otp_1 = require("../../../utils/otp");
const entity_1 = require("../entity");
//factory pattern
class AuthFactory {
    register(registterDTO) {
        const user = new entity_1.User;
        user.fullName = registterDTO.fullName;
        user.email = registterDTO.email;
        user.password = (0, hash_1.generateHash)(registterDTO.password);
        user.phoneNumber = registterDTO.phoneNumber; // encrypt [Remember]
        user.gender = enum_1.GENDER_TYPES.male;
        user.role = enum_1.SYS_ROLES.user;
        user.userAgent = enum_1.USER_AGENT.local;
        user.otp = (0, otp_1.generateOtp)();
        user.otpExpiryAt = (0, otp_1.generateOtpExpiryTime)(5 * 60 * 1000); //5 min
        user.credenialUpdatedAt = Date.now();
        return user;
    }
}
exports.AuthFactory = AuthFactory;
