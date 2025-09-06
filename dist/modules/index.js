"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const auth_conroller_1 = __importDefault(require("./auth/auth.conroller"));
exports.authRouter = auth_conroller_1.default;
