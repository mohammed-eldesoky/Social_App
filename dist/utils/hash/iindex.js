"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = exports.generateHash = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//hash password
const generateHash = (planText) => {
    return bcryptjs_1.default.hashSync(planText, 10);
};
exports.generateHash = generateHash;
//compare password
const compareHash = (planText, hash) => {
    return bcryptjs_1.default.compareSync(planText, hash);
};
exports.compareHash = compareHash;
