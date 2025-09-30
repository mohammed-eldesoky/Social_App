import { model } from "mongoose";
import { commentSchema } from "./comment.schema";
import { Icomment } from "../../../utils";


//  comment model
export const Comment = model <Icomment> ("Comment", commentSchema);