import { Server, Socket } from "socket.io";
import { ChatRepository, MessageRepository } from "../../DB";
import { ObjectId } from "mongoose";
import { messagevalidation } from "../message.validation";
import z from "zod";


interface IsendMessage {
  message: string;
  destId: string;
}
export const sendMessage = (
  socket: Socket,
  io: Server,
  connectedUsers: Map<string, string>
) => {
  return async (data: IsendMessage) => {
   try {
     const validated = messagevalidation.parse(data);

    // two => emit
    const destSocketId = connectedUsers.get(validated.destId);
    console.log("destId:", validated.destId, "→ destSocket:", destSocketId);
    //1- sender
    socket.emit("successMessage", validated);
    //2- receiver
    io.to(destSocketId).emit("receiveMessage", validated);
    // save in db

    // create message >> id
    const messageRepo = new MessageRepository();
    const sender = socket.data.user.id;
    const createdMessage = await messageRepo.create({
      content: validated.message,
      sender,
    });
    const chatRepo = new ChatRepository();
    const chat = await chatRepo.getOne({
      users: { $all: [sender, validated.destId] },
    });
    // create new chat if not exist
    if (!chat) {
      await chatRepo.create({
        users: [sender, validated.destId],
        messages: [createdMessage._id as unknown as ObjectId],
      });
    } else {
      await chatRepo.update(
        { _id: chat._id },
        { $push: { messages: createdMessage._id } }
      );
    }
   } catch (error) {
    if(error instanceof z.ZodError){
       socket.emit("validationError", { message: error.issues[0].message });

    }
    else {
        socket.emit("serverError", { message: "Unexpected error occurred" });
      }
   }
  };
};

// _____________user typing________________
export const handleTyping = (
  socket: Socket,
  io: Server,
  connectedUsers: Map<string, string>
) => {
  return (data: { destId: string }) => {
    const destSocketId = connectedUsers.get(data.destId);
    if (destSocketId) {
      io.to(destSocketId).emit("typing", { from: socket.data.user.id });
    }
  };
};
// _____________user stop typing________________
export const handleStopTyping = (
  socket: Socket,
  io: Server,
  connectedUsers: Map<string, string>
) => {
  return (data: { destId: string }) => {
    const destSocketId = connectedUsers.get(data.destId);
    if (destSocketId) {
      io.to(destSocketId).emit("stopTyping", { from: socket.data.user.id });
    }
  };
};
