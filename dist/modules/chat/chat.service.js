"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB");
// chat service
class ChatService {
    chatRepository = new DB_1.ChatRepository();
    getChat = async (req, res, next) => {
        //get data from req
        const { userId } = req.params;
        const userLoggedIn = req.user._id;
        // get chat
        const chat = await this.chatRepository.getOne({ users: { $all: [userId, userLoggedIn] } }, {}, { populate: { path: "messages" } });
        // send response
        return res
            .status(200)
            .json({ message: "success", success: true, data: { chat } });
    };
}
exports.default = new ChatService();
