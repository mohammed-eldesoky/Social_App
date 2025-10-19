"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// request model
const mongoose_1 = require("mongoose");
const request_schma_1 = __importDefault(require("./request.schma"));
const Request = (0, mongoose_1.model)("Request", request_schma_1.default);
exports.default = Request;
