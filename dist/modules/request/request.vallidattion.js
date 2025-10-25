"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRequestsVal = exports.deleteRequestVal = exports.acceptRequestVal = exports.sendRequestVal = void 0;
const zod_1 = require("zod");
const objectId = zod_1.z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format");
//endpoint schema 
exports.sendRequestVal = zod_1.z.object({
    receiverId: objectId,
});
exports.acceptRequestVal = zod_1.z.object({
    requestId: objectId,
});
exports.deleteRequestVal = zod_1.z.object({
    requestId: objectId,
});
exports.getAllRequestsVal = zod_1.z.object({});
