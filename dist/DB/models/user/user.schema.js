"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("../../../utils/common/enum");
// Define the User schema
exports.UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        minlength: 2,
        maxlength: 20,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        minlength: 2,
        maxlength: 20,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: function () {
            if (this.userAgent === enum_1.USER_AGENT.google) {
                return false;
            }
            return true;
        }, // Password is required if userAgent is not 'google'
    },
    credenialUpdatedAt: Date,
    phoneNumber: String,
    role: {
        type: String,
        enum: enum_1.SYS_ROLES,
        default: enum_1.SYS_ROLES.user,
    },
    gender: {
        type: String,
        enum: enum_1.GENDER_TYPES,
        default: enum_1.GENDER_TYPES.male,
    },
    userAgent: {
        type: String,
        enum: enum_1.USER_AGENT,
        default: enum_1.USER_AGENT.local,
    },
    otp: { type: String },
    otpExpiryAt: { type: Date },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
//virtual fieldS
exports.UserSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
}).set(function (value) {
    const [firstName, lastName] = value.split(" ");
    this.firstName = firstName; //TYPE assertion 
    this.lastName = lastName; //TYPE assertion 
});
