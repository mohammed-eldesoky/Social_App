import { Router } from "express";
import authService from "./auth.service";

const router = Router();

router.post("/register", authService.register);
router.post("/login", authService.login);
// simulate :
//route >is  {} > from authService is a {} too > inside it a method register

export default router;
