"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = void 0;
const socket_io_1 = require("socket.io"); //@types/socket.io-clienter}
const middleware_1 = require("./middleware");
const chat_1 = require("./chat");
const connectedUsers = new Map();
const initSocket = (server) => {
    const io = new socket_io_1.Server(server, { cors: { origin: "*" } });
    io.use(middleware_1.socketAuth);
    io.on("connection", (socket) => {
        const userId = socket.data.user.id;
        connectedUsers.set(userId, socket.id);
        // tell all users that a  user connected
        io.emit("userStatus", { userId, status: "online" });
        // disconnect
        socket.on("disconnect", () => {
            connectedUsers.delete(userId);
            io.emit("userStatus", { userId, status: "offline" });
        });
        console.log("new user connected");
        socket.on("sendMessage", (0, chat_1.sendMessage)(socket, io, connectedUsers)); // callback (data)=>{}
        socket.on("typing", (0, chat_1.handleTyping)(socket, io, connectedUsers));
        socket.on("stopTyping", (0, chat_1.handleStopTyping)(socket, io, connectedUsers));
    }); //emit by frontend
};
exports.initSocket = initSocket;
