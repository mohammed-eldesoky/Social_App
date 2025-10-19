import { Server as httpServer } from "node:http";
import { Server, Socket } from "socket.io"; //@types/socket.io-clienter}
import { socketAuth } from "./middleware";
import { sendMessage } from "./chat";

const connectedUsers = new Map<string, string>();
export const initSocket = (server: httpServer) => {
  const io = new Server(server, { cors: { origin: "*" } });

  io.use(socketAuth);

  io.on("connection", (socket: Socket) => {
    connectedUsers.set(socket.data.user.id, socket.id);
    console.log("new user connected");
    socket.on("sendMessage",sendMessage(socket,io,connectedUsers)); // callback (data)=>{}
  }); //emit by frontend
};
