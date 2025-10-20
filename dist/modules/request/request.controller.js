"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../../middleware");
const request_service_1 = __importDefault(require("./request.service"));
const router = (0, express_1.Router)();
// send request
router.post("/:receiverId", (0, middleware_1.isAuthenticated)(), request_service_1.default.sendRequest);
//get all requests
router.get("/", (0, middleware_1.isAuthenticated)(), request_service_1.default.getAllRequest);
exports.default = router;
