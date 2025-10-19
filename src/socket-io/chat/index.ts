import { Server, Socket } from "socket.io";
import { ChatRepository, MessageRepository } from "../../DB";
import { ObjectId } from "mongoose";


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
    // two => emit
    const destSocketId = connectedUsers.get(data.destId);
    console.log("destId:", data.destId, "→ destSocket:", destSocketId);
    //1- sender
    socket.emit("successMessage", data);
    //2- receiver
    io.to(destSocketId).emit("receiveMessage", data);
    // save in db

    // create message >> id
    const messageRepo = new MessageRepository();
    const sender = socket.data.user.id;
    const createdMessage = await messageRepo.create({
      content: data.message,
      sender,
    });
    const chatRepo = new ChatRepository();
    const chat = await chatRepo.getOne({
      users: { $all: [sender, data.destId] },
    });
    // create new chat if not exist
    if (!chat) {
      await chatRepo.create({
        users: [sender, data.destId],
        messages: [createdMessage._id as unknown as ObjectId],
      });
    } else {
      await chatRepo.update(
        { _id: chat._id },
        { $push: { messages: createdMessage._id } }
      );
    }
  };
};
