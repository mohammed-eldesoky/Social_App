import { Router } from "express";
import { isAuthenticated } from "../../middleware";
import requestService from "./request.service";

const router = Router();

// send request
router.post("/:receiverId", isAuthenticated(), requestService.sendRequest);
//get all requests
router.get("/", isAuthenticated(), requestService.getAllRequest);
//accept request
router.patch(
  "/:requestId/accept",
  isAuthenticated(),
  requestService.acceptRequest
);
//delete request
router.delete("/:requestId", isAuthenticated(), requestService.deleteRequest);

export default router;
