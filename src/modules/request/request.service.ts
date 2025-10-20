import { NextFunction, Request, Response } from "express";
import { RequestRepository } from "../../DB/models/requests/request.repository";
import { BadRequestException } from "../../utils";
import { NotFoundException } from "./../../utils/error/index";

class RequestService {
  private readonly requestRepository = new RequestRepository();

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
    return res
      .status(201)
      .json({
        message: "request sent successfully",
        success: true,
        data: { request },
      });
  };

  //_________________________get request__________________________

public getAllRequest = async (req:Request,res:Response,next:NextFunction) =>{
 //get data from req
 const userId = req.user._id;
 //check if user exist
 const userExist = await this.requestRepository.exist({_id:userId});
 //fail case
 if(!userExist){
  throw new NotFoundException("user not found");
 }
 //get request
 const requests = await this.requestRepository.getUserRequests(userId);
 //send response
 return res.status(200).json({message:"success",success:true,data:{requests}});
    

}



}

export default new RequestService();
