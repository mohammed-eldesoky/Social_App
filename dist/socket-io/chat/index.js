"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStopTyping = exports.handleTyping = exports.sendMessage = void 0;
const DB_1 = require("../../DB");
const message_validation_1 = require("../message.validation");
const zod_1 = __importDefault(require("zod"));
const sendMessage = (socket, io, connectedUsers) => {
    return async (data) => {
        try {
            const validated = message_validation_1.messagevalidation.parse(data);
            // two => emit
            const destSocketId = connectedUsers.get(validated.destId);
            console.log("destId:", validated.destId, "→ destSocket:", destSocketId);
            //1- sender
            socket.emit("successMessage", validated);
            //2- receiver
            io.to(destSocketId).emit("receiveMessage", validated);
            // save in db
            // create message >> id
            const messageRepo = new DB_1.MessageRepository();
            const sender = socket.data.user.id;
            const createdMessage = await messageRepo.create({
                content: validated.message,
                sender,
            });
            const chatRepo = new DB_1.ChatRepository();
            const chat = await chatRepo.getOne({
                users: { $all: [sender, validated.destId] },
            });
            // create new chat if not exist
            if (!chat) {
                await chatRepo.create({
                    users: [sender, validated.destId],
                    messages: [createdMessage._id],
                });
            }
            else {
                await chatRepo.update({ _id: chat._id }, { $push: { messages: createdMessage._id } });
            }
        }
        catch (error) {
            if (error instanceof zod_1.default.ZodError) {
                socket.emit("validationError", { message: error.issues[0].message });
            }
            else {
                socket.emit("serverError", { message: "Unexpected error occurred" });
            }
        }
    };
};
exports.sendMessage = sendMessage;
// _____________user typing________________
const handleTyping = (socket, io, connectedUsers) => {
    return (data) => {
        const destSocketId = connectedUsers.get(data.destId);
        if (destSocketId) {
            io.to(destSocketId).emit("typing", { from: socket.data.user.id });
        }
    };
};
exports.handleTyping = handleTyping;
// _____________user stop typing________________
const handleStopTyping = (socket, io, connectedUsers) => {
    return (data) => {
        const destSocketId = connectedUsers.get(data.destId);
        if (destSocketId) {
            io.to(destSocketId).emit("stopTyping", { from: socket.data.user.id });
        }
    };
};
exports.handleStopTyping = handleStopTyping;
