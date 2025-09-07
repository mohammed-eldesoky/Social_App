"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtpExpiryTime = exports.generateOtp = void 0;
const generateOtp = () => {
    return Math.floor(Math.random() * 999999 + 100000);
};
exports.generateOtp = generateOtp;
// create otp and expiry time
const generateOtpExpiryTime = (minutes) => {
    return Date.now() + minutes;
};
exports.generateOtpExpiryTime = generateOtpExpiryTime;
