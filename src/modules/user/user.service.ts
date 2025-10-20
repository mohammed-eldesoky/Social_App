import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../../DB/models/user/user.repository";
import { BadRequestException, NotFoundException } from "../../utils";
class UserService {
  private readonly userRepository = new UserRepository();
  constructor() {}

  getProfile = async (req: Request, res: Response, next: NextFunction) => {
    return res
      .status(200)
      .json({ message: "success", success: true, data: { user: req.user } });
  };

  //_________________block user____________________

  blockUser = async (req: Request, res: Response, next: NextFunction) => {
    //get data from req
    const userId = req.user._id;
    const { targetId } = req.params;
    //check if user not self
    if (userId.toString() === targetId) {
      throw new BadRequestException("You cannot block yourself");
    }

    //check if target user exist
    const targetUserExist = await this.userRepository.exist({ _id: targetId });
    if (!targetUserExist) {
      throw new NotFoundException("Target user not found");
    }

    //block user
    await this.userRepository.blockUser(userId.toString(), targetId);
    return res
      .status(200)
      .json({ message: "User blocked successfully", success: true });
  };
}

export default new UserService(); //single ton
