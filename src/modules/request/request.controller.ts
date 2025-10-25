import { Router } from "express";
import { isAuthenticated, isValid } from "../../middleware";
import requestService from "./request.service";
import {
  acceptRequestVal,
  deleteRequestVal,
  getAllRequestsVal,
  sendRequestVal,
} from "./request.vallidattion";

const router = Router();

// send request
router.post(
  "/:receiverId",
  isAuthenticated(),
  isValid(sendRequestVal),
  requestService.sendRequest
);
//get all requests
router.get(
  "/",
  isAuthenticated(),
  isValid(getAllRequestsVal),
  requestService.getAllRequest
);
//accept request
router.patch(
  "/:requestId/accept",
  isAuthenticated(),
  isValid(acceptRequestVal),
  requestService.acceptRequest
);
//delete request
router.delete(
  "/:requestId",
  isAuthenticated(),
  isValid(deleteRequestVal),
  requestService.deleteRequest
);

export default router;
