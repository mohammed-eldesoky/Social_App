"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = exports.generateHash = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//hash password
const generateHash = async (planText) => {
    return await bcryptjs_1.default.hash(planText, 10);
};
exports.generateHash = generateHash;
//compare password
const compareHash = async (planText, hash) => {
    return await bcryptjs_1.default.compare(planText, hash);
};
exports.compareHash = compareHash;
