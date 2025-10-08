import { Router } from "express";
import authService from "./auth.service";
import { isValid } from "../../middleware";
import * as authvalidation from "./auth.validation";
const router = Router();
//____________register route____________________
router.post(
  "/register",
  isValid(authvalidation.registerSchema),
  authService.register
);
//____________login route____________________
router.post("/login", isValid(authvalidation.loginSchema), authService.login);
router.post(
  "/verify-account",
  isValid(authvalidation.verifyAccountSchema),
  authService.verifyAccount
);
//____________update password route____________________
router.post(
  "/update-password",
  isValid(authvalidation.updatePasswordSchema),
  authService.updatePassword
);
//____________login with google route____________________
router.post("/login-google", authService.loginWithGoogle);
// simulate :
//route >is  {} > from authService is a {} too > inside it a method register

export default router;
