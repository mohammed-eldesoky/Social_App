import { Server as httpServer } from "node:http";
import { Server, Socket } from "socket.io"; //@types/socket.io-clienter}
import { socketAuth } from "./middleware";
import { handleStopTyping, handleTyping, sendMessage } from "./chat";

const connectedUsers = new Map<string, string>();
export const initSocket = (server: httpServer) => {
  const io = new Server(server, { cors: { origin: "*" } });

  io.use(socketAuth);

  io.on("connection", (socket: Socket) => {
    const userId=socket.data.user.id
    connectedUsers.set(userId, socket.id);
    // tell all users that a  user connected
    io.emit("userStatus", {userId,status:"online"});
    // disconnect
    socket.on("disconnect", () => {
      connectedUsers.delete(userId);
      io.emit("userStatus", {userId,status:"offline"});
    });
    
    console.log("new user connected");
    socket.on("sendMessage",sendMessage(socket,io,connectedUsers)); // callback (data)=>{}
    socket.on("typing",handleTyping(socket,io,connectedUsers));
    socket.on("stopTyping",handleStopTyping(socket,io,connectedUsers));

  }); //emit by frontend
};
