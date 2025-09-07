"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = __importDefault(require("./auth.service"));
const router = (0, express_1.Router)();
router.post("/register", auth_service_1.default.register);
router.post("/login", auth_service_1.default.login);
// simulate :
//route >is  {} > from authService is a {} too > inside it a method register
exports.default = router;
