"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpSchema = exports.updateBasicInfoSchema = exports.updatePasswordSchema = exports.verifyAccountSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
const utils_1 = require("../../utils");
// register validaton  schema
// all fields by default are required
exports.registerSchema = zod_1.z
    .object({
    fullName: zod_1.z.string().min(3).max(20), //TYPE assertion
    email: zod_1.z.email().optional(),
    password: zod_1.z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/),
    phoneNumber: zod_1.z.string().min(11).max(11).optional(),
    gender: zod_1.z.enum(utils_1.GENDER_TYPES),
})
    .refine((data) => data.email || data.phoneNumber, {
    message: "Email or phone number is required",
    path: ["email"],
});
// login validation schema
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.email(),
    password: zod_1.z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/),
});
// verify account validation schema
exports.verifyAccountSchema = zod_1.z.object({
    otp: zod_1.z.string().min(6).max(6),
    email: zod_1.z.email(),
});
// update password validation schema
exports.updatePasswordSchema = zod_1.z.object({
    oldPassword: zod_1.z.string().min(6),
    newPassword: zod_1.z
        .string()
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "Password must be at least 6 characters long and contain both letters and numbers"),
});
// update basic info and email validation schema
exports.updateBasicInfoSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(3).max(20).optional(),
    gender: zod_1.z.enum(utils_1.GENDER_TYPES).optional(),
    email: zod_1.z.string().email().optional(),
    phoneNumber: zod_1.z.string().min(11).max(11).optional(),
});
// send otp validation schema
exports.sendOtpSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
});
