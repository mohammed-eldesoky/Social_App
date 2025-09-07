"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_schema_1 = require("./user.schema");
const UserModel = (0, mongoose_1.model)("User", user_schema_1.UserSchema);
