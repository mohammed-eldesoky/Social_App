import { ObjectId } from "mongoose";
import { Iattachment, Ireaction } from "../../../utils";

export class Commment {
  userId: ObjectId;
  postId: ObjectId;
  parentsId: ObjectId;
  content: string;
  reactions: Ireaction[];
  attachments?: Iattachment[];
  mentions?: ObjectId[];
}
