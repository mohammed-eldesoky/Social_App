import { NextFunction, Request, Response } from "express";
import { ChatRepository } from "../../DB";

// chat service
class ChatService {
  private readonly chatRepository = new ChatRepository();

  public getChat = async (req: Request, res: Response, next: NextFunction) => {
    //get data from req
    const { userId } = req.params;
    const userLoggedIn = req.user._id;
    // get chat
    const chat = await this.chatRepository.getOne(
      { users: { $all: [userId, userLoggedIn] } },
      {},
      {populate:{path:"messages"}}
    );
    // send response
    return res
      .status(200)
      .json({ message: "success", success: true, data: {chat} });
  };
}
export default new ChatService();
