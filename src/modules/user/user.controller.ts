import { Router } from "express";
import userService from "./user.service";
import { isAuthenticated } from "../../middleware";

const router = Router();
// get profile
router.get("/profile",isAuthenticated(),userService.getProfile)
// block user
router.post("/block/:targetId",isAuthenticated(),userService.blockUser)
// unfriend
router.delete("/unfriend/:friendId",isAuthenticated(),userService.unFriend)

export default router;