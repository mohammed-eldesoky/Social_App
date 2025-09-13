"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValid = void 0;
const error_1 = require("../utils/error");
const console_1 = require("console");
// check validation
const isValid = (schema) => {
    return (req, res, next) => {
        // validation
        let data = { ...req.body, ...req.params, ...req.query };
        const result = schema.safeParse(data);
        if (result.success == false) {
            let errMessage = result.error.issues.map((issue) => ({
                path: issue.path[0],
                message: issue.message,
            })); //return {}
            (0, console_1.log)(errMessage);
            throw new error_1.BadRequestException("validation failed", errMessage);
        }
    };
};
exports.isValid = isValid;
