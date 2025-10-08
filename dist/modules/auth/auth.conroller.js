"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = __importDefault(require("./auth.service"));
const middleware_1 = require("../../middleware");
const authvalidation = __importStar(require("./auth.validation"));
const router = (0, express_1.Router)();
//____________register route____________________
router.post("/register", (0, middleware_1.isValid)(authvalidation.registerSchema), auth_service_1.default.register);
//____________login route____________________
router.post("/login", (0, middleware_1.isValid)(authvalidation.loginSchema), auth_service_1.default.login);
router.post("/verify-account", (0, middleware_1.isValid)(authvalidation.verifyAccountSchema), auth_service_1.default.verifyAccount);
//____________update password route____________________
router.post("/update-password", (0, middleware_1.isAuthenticated)(), (0, middleware_1.isValid)(authvalidation.updatePasswordSchema), auth_service_1.default.updatePassword);
//____________login with google route____________________
router.post("/login-google", auth_service_1.default.loginWithGoogle);
//______________  send otp route__________________________
router.post("/send-otp", (0, middleware_1.isValid)(authvalidation.sendOtpSchema), auth_service_1.default.sendOtp);
//______________  forget password route__________________________
router.put("/forget-password", (0, middleware_1.isValid)(authvalidation.forgetPasswordSchema), auth_service_1.default.forgetPassword);
//________________________________________________________________
// simulate : problem (this)
//route >is  {} > from authService is a {} too > inside it a method register
exports.default = router;
