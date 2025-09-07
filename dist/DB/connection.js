"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// connect to MongoDB
const connectDB = async () => {
    await mongoose_1.default.connect(process.env.DB_URL)
        .then(() => {
        console.log("Connected successfully");
    }).catch(() => {
        console.log("Connection failed");
    });
    //type assertion
};
exports.connectDB = connectDB;
