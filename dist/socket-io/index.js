"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = void 0;
const socket_io_1 = require("socket.io"); //@types/socket.io-clienter}
const middleware_1 = require("./middleware");
const initSocket = (server) => {
    const io = new socket_io_1.Server(server, { cors: { origin: "*" } });
    io.use(middleware_1.socketAuth);
    io.on("connection", (socket) => {
        console.log("new user connected");
    }); //emit by frontend
};
exports.initSocket = initSocket;
