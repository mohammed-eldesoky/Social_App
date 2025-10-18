import { Router } from "express";
import userService from "./user.service";
import { isAuthenticated } from "../../middleware";

const router = Router();

router.get("/",isAuthenticated(),userService.getProfile)

export default router;