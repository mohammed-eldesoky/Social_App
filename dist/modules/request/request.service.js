"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_repository_1 = require("../../DB/models/requests/request.repository");
const utils_1 = require("../../utils");
const index_1 = require("./../../utils/error/index");
class RequestService {
    requestRepository = new request_repository_1.RequestRepository();
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
        return res
            .status(201)
            .json({
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
        return res.status(200).json({ message: "success", success: true, data: { requests } });
    };
}
exports.default = new RequestService();
