"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagevalidation = void 0;
const zod_1 = require("zod");
exports.messagevalidation = zod_1.z.object({
    message: zod_1.z.string().min(1, "Message cannot be empty"),
    destId: zod_1.z.string().min(1, "Destination ID is required"),
});
