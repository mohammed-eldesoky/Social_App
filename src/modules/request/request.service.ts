import { NextFunction, Request, Response } from "express";
import { RequestRepository } from "../../DB/models/requests/request.repository";
import { BadRequestException } from "../../utils";
import { NotFoundException } from "./../../utils/error/index";
import { UserRepository } from "../../DB";

class RequestService {
  private readonly requestRepository = new RequestRepository();
  private userRepo = new UserRepository();

  //_________________________send request__________________________

  public sendRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //get data from req
    const { receiverId } = req.params;
    const senderId = req.user._id;
    // check from user
    if (senderId.toString() === receiverId) {
      throw new BadRequestException("You cannot send request to yourself");
    }
    // check if user exist
    const receiverExist = await this.requestRepository.exist({
      _id: receiverId,
    });
    // fail case
    if (!receiverExist) {
      throw new NotFoundException("receiver not found");
    }

    //check if request exist
    const requestExist = await this.requestRepository.exist({
      senderId,
      receiverId,
      status: "pending",
    });
    // fail case
    if (requestExist) {
      throw new BadRequestException("request already sent");
    }

    //send request
    const request = await this.requestRepository.create({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });
    //send response
    return res.status(201).json({
      message: "request sent successfully",
      success: true,
      data: { request },
    });
  };

  //_________________________get request__________________________

  public getAllRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //get data from req
    const userId = req.user._id;
    //check if user exist
    const userExist = await this.requestRepository.exist({ _id: userId });
    //fail case
    if (!userExist) {
      throw new NotFoundException("user not found");
    }
    //get request
    const requests = await this.requestRepository.getUserRequests(userId);
    //send response
    return res
      .status(200)
      .json({ message: "success", success: true, data: { requests } });
  };

  //_________________________accept request__________________________

  public acceptRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //get data from  req
    const { requestId } = req.params;
    const userId = req.user._id;
    // check if request exist
    const requestExist = await this.requestRepository.exist({ _id: requestId });
    //fail case
    if (!requestExist) {
      throw new NotFoundException("request not found");
    }

    //update status of request

    const request = await this.requestRepository.update(
      { _id: requestId },
      { status: "accepted" }
    );

    // add friend
    await this.userRepo.update(
      { _id: requestExist.sender },
      { $addToSet: { friends: requestExist.receiver } }
    );
    await this.userRepo.update(
      { _id: requestExist.receiver },
      { $addToSet: { friends: requestExist.sender } }
    );

    //send response
    return res
      .status(200)
      .json({ message: "request accepted", success: true, data: { request } });
  };

  //_________________________delete request__________________________

  public deleteRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //get data from req
    const { requestId } = req.params;
    const userId = req.user._id;
    //check if request exist
    const requestExist = await this.requestRepository.exist({ _id: requestId });
    //fail case
    if (!requestExist) {
      throw new NotFoundException("request not found");
    }
    //delete request
    const request = await this.requestRepository.delete({ _id: requestId });
    //send response
    return res
      .status(200)
      .json({ message: "request deleted", success: true, data: { request } });



  };


}

export default new RequestService();
