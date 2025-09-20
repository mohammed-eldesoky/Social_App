"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const zod_1 = require("zod");
const utils_1 = require("../../utils");
// register validaton  schema
// all fields by default are required
exports.registerSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(3).max(20), //TYPE assertion
    email: zod_1.z.email().optional(),
    password: zod_1.z.string(),
    phoneNumber: zod_1.z.string().min(11).max(11).optional(),
    gender: zod_1.z.enum(utils_1.GENDER_TYPES),
}).refine((data) => data.email || data.phoneNumber, {
    message: "Email or phone number is required",
    path: ["email"]
});
