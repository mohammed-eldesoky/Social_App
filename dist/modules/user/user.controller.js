"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_service_1 = __importDefault(require("./user.service"));
const middleware_1 = require("../../middleware");
const router = (0, express_1.Router)();
router.get("/", (0, middleware_1.isAuthenticated)(), user_service_1.default.getProfile);
exports.default = router;
