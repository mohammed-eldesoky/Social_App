"use strict";
//message model
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mesage_schema_1 = require("./mesage.schema");
const Message = (0, mongoose_1.model)("Message", mesage_schema_1.messageSchema);
exports.default = Message;
