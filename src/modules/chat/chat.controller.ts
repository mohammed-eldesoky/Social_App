import { Router } from "express";
import { isAuthenticated } from "../../middleware";
import chatService from "./chat.service";


const router =Router();

//get chat
router.get("/:userId",isAuthenticated(),chatService.getChat)

export default router;