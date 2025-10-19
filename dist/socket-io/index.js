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
        connectedUsers.set(socket.data.user.id, socket.id);
        console.log("new user connected");
        socket.on("sendMessage", (0, chat_1.sendMessage)(socket, io, connectedUsers)); // callback (data)=>{}
    }); //emit by frontend
};
exports.initSocket = initSocket;
