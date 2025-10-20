"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_repository_1 = require("../../DB/models/requests/request.repository");
const utils_1 = require("../../utils");
const index_1 = require("./../../utils/error/index");
const DB_1 = require("../../DB");
class RequestService {
    requestRepository = new request_repository_1.RequestRepository();
    userRepo = new DB_1.UserRepository();
    //_________________________send request__________________________
    sendRequest = async (req, res, next) => {
        //get data from req
        const { receiverId } = req.params;
        const senderId = req.user._id;
        // check from user
        if (senderId.toString() === receiverId) {
            throw new utils_1.BadRequestException("You cannot send request to yourself");
        }
        // check if user exist
        const receiverExist = await this.requestRepository.exist({
            _id: receiverId,
        });
        // fail case
        if (!receiverExist) {
            throw new index_1.NotFoundException("receiver not found");
        }
        //check if request exist
        const requestExist = await this.requestRepository.exist({
            senderId,
            receiverId,
            status: "pending",
        });
        // fail case
        if (requestExist) {
            throw new utils_1.BadRequestException("request already sent");
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
    getAllRequest = async (req, res, next) => {
        //get data from req
        const userId = req.user._id;
        //check if user exist
        const userExist = await this.requestRepository.exist({ _id: userId });
        //fail case
        if (!userExist) {
            throw new index_1.NotFoundException("user not found");
        }
        //get request
        const requests = await this.requestRepository.getUserRequests(userId);
        //send response
        return res
            .status(200)
            .json({ message: "success", success: true, data: { requests } });
    };
    //_________________________accept request__________________________
    acceptRequest = async (req, res, next) => {
        //get data from  req
        const { requestId } = req.params;
        const userId = req.user._id;
        // check if request exist
        const requestExist = await this.requestRepository.exist({ _id: requestId });
        //fail case
        if (!requestExist) {
            throw new index_1.NotFoundException("request not found");
        }
        //update status of request
        const request = await this.requestRepository.update({ _id: requestId }, { status: "accepted" });
        // add friend
        await this.userRepo.update({ _id: requestExist.sender }, { $addToSet: { friends: requestExist.receiver } });
        await this.userRepo.update({ _id: requestExist.receiver }, { $addToSet: { friends: requestExist.sender } });
        //send response
        return res
            .status(200)
            .json({ message: "request accepted", success: true, data: { request } });
    };
    //_________________________delete request__________________________
    deleteRequest = async (req, res, next) => {
        //get data from req
        const { requestId } = req.params;
        const userId = req.user._id;
        //check if request exist
        const requestExist = await this.requestRepository.exist({ _id: requestId });
        //fail case
        if (!requestExist) {
            throw new index_1.NotFoundException("request not found");
        }
        //delete request
        const request = await this.requestRepository.delete({ _id: requestId });
        //send response
        return res
            .status(200)
            .json({ message: "request deleted", success: true, data: { request } });
    };
}
exports.default = new RequestService();
