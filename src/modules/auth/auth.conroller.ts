import { Router } from "express";
import authService from "./auth.service";
import { isAuthenticated, isValid } from "../../middleware";
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
  isAuthenticated(),
  isValid(authvalidation.updatePasswordSchema),
  authService.updatePassword
);
//____________login with google route____________________
router.post("/login-google", authService.loginWithGoogle);

//______________  send otp route__________________________

router.post(
  "/send-otp",
  isValid(authvalidation.sendOtpSchema),
  authService.sendOtp
);

//______________  forget password route__________________________

router.put(
  "/forget-password",
  isValid(authvalidation.forgetPasswordSchema),
  authService.forgetPassword
);

//_______________ refresh token route ______________________//
router.post(
  "/refresh-token",
  isValid(authvalidation.refreshTokenSchema),
  authService.refreshToken
);

//_______________ logout route ______________________//
router.post(
  "/logout",
  isAuthenticated(),
  isValid(authvalidation.logoutSchema),
  authService.logout
);
//________________________________________________________________
// simulate : problem (this)
//route >is  {} > from authService is a {} too > inside it a method register

export default router;
