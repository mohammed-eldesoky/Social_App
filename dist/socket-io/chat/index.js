"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const sendMessage = (socket, io, connectedUsers) => {
    return (data) => {
        // two => emit
        const destSocketId = connectedUsers.get(data.destId);
        console.log("destId:", data.destId, "→ destSocket:", destSocketId);
        //1- sender
        socket.emit("successMessage", data);
        //2- receiver
        io.to(destSocketId).emit("receiveMessage", data);
        // save in db
        // create message
    };
};
exports.sendMessage = sendMessage;
