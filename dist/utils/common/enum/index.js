"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_AGENT = exports.GENDER_TYPES = exports.SYS_ROLES = void 0;
var SYS_ROLES;
(function (SYS_ROLES) {
    SYS_ROLES["admin"] = "admin";
    SYS_ROLES["user"] = "user";
    SYS_ROLES["superAdmin"] = "super-admin";
})(SYS_ROLES || (exports.SYS_ROLES = SYS_ROLES = {}));
var GENDER_TYPES;
(function (GENDER_TYPES) {
    GENDER_TYPES["male"] = "male";
    GENDER_TYPES["female"] = "female";
})(GENDER_TYPES || (exports.GENDER_TYPES = GENDER_TYPES = {}));
var USER_AGENT;
(function (USER_AGENT) {
    USER_AGENT["local"] = "local";
    USER_AGENT["google"] = "google";
    USER_AGENT["facebook"] = "facebook";
})(USER_AGENT || (exports.USER_AGENT = USER_AGENT = {}));
