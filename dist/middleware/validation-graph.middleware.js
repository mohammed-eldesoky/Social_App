"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidGraph = void 0;
const error_1 = require("../utils/error");
const console_1 = require("console");
// check validation
const isValidGraph = (schema, args) => {
    const result = schema.safeParse(args);
    if (result.success == false) {
        let errMessage = result.error.issues.map((issue) => ({
            path: issue.path[0],
            message: issue.message,
        })); //return {}
        (0, console_1.log)(errMessage);
        throw new error_1.BadRequestException(JSON.stringify(errMessage), errMessage);
    }
};
exports.isValidGraph = isValidGraph;
