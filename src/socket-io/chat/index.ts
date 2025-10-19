import { Server, Socket } from "socket.io";

interface IsendMessage {
    message:string,
    destId:string
}
export const sendMessage = (socket:Socket,io:Server,connectedUsers:Map<string,string>)=>{
return (data:IsendMessage) => {
    // two => emit
    const destSocketId = connectedUsers.get(data.destId);
    console.log("destId:",data.destId, "→ destSocket:", destSocketId);
    //1- sender
    socket.emit("successMessage", data);
    //2- receiver
    io.to(destSocketId).emit("receiveMessage", data);
    // save in db
    
    // create message
    }
}