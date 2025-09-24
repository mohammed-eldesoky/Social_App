"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const token_schema_1 = require("./token.schema");
const Token = (0, mongoose_1.model)("Token", token_schema_1.TokenSchema);
exports.default = Token;
