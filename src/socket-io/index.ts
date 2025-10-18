import { Server as httpServer } from "node:http";
import { Server, Socket } from "socket.io"; //@types/socket.io-clienter}
import { socketAuth } from "./middleware";

export const initSocket = (server: httpServer) => {
  const io = new Server(server, { cors: { origin: "*" } });

  io.use(socketAuth);
  
  io.on("connection", (socket: Socket) => {
    console.log("new user connected");
  }); //emit by frontend
};
