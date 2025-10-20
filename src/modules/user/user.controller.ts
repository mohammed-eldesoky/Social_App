import { Router } from "express";
import userService from "./user.service";
import { isAuthenticated } from "../../middleware";

const router = Router();
// get profile
router.get("/profile",isAuthenticated(),userService.getProfile)
// block user
router.post("/block/:targetId",isAuthenticated(),userService.blockUser)

export default router;