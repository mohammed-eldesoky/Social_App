import { IUser } from "../../../utils/common/interface";
import { AbstractRepository } from "../../abstract.repository";
import User from "./user.model";

export class UserRepository extends AbstractRepository<IUser> {
  constructor() {
    super(User);
  }

  async getAllUsers() {
    return await this.model.find();
  }

  async blockUser(userId: string, targetId: string) {
  // 1-add targetId to blockedUsers
  await this.model.updateOne(
    { _id: userId },
    { $addToSet: { blockedUsers: targetId } } // addToSet 
  );

  // delete targetId from friends
  await this.model.updateOne(
    { _id: userId },
    { $pull: { friends: targetId } }
  );

  await this.model.updateOne(
    { _id: targetId },
    { $pull: { friends: userId } }
  );

  return { message: "User blocked successfully" };
}

}
