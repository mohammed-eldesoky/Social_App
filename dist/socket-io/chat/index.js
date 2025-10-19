"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const DB_1 = require("../../DB");
const sendMessage = (socket, io, connectedUsers) => {
    return async (data) => {
        // two => emit
        const destSocketId = connectedUsers.get(data.destId);
        console.log("destId:", data.destId, "→ destSocket:", destSocketId);
        //1- sender
        socket.emit("successMessage", data);
        //2- receiver
        io.to(destSocketId).emit("receiveMessage", data);
        // save in db
        // create message >> id
        const messageRepo = new DB_1.MessageRepository();
        const sender = socket.data.user.id;
        const createdMessage = await messageRepo.create({
            content: data.message,
            sender,
        });
        const chatRepo = new DB_1.ChatRepository();
        const chat = await chatRepo.getOne({
            users: { $all: [sender, data.destId] },
        });
        // create new chat if not exist
        if (!chat) {
            await chatRepo.create({
                users: [sender, data.destId],
                messages: [createdMessage._id],
            });
        }
        else {
            await chatRepo.update({ _id: chat._id }, { $push: { messages: createdMessage._id } });
        }
    };
};
exports.sendMessage = sendMessage;
