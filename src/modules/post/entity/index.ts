import { ObjectId } from "mongoose";
import { Iattachment, Ireaction } from "../../../utils";

export class Post {
  reactions!: Ireaction[];
  content!: string;
  userId!: ObjectId;
  attachments?: Iattachment[];
}
