import { Router } from "express";
import authService from "./auth.service";
import { isValid } from "../../middleware";
import * as authvalidation from "./auth.validation"
const router = Router();

router.post("/register",isValid(authvalidation.registerSchema), authService.register);
router.post("/login", authService.login);
// simulate :
//route >is  {} > from authService is a {} too > inside it a method register

export default router;
