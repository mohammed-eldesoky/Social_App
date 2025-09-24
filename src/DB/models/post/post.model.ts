
import { model } from "mongoose";
import { Ipost } from "../../../utils";
import { postSchema } from "./post.schema";
//post model



const Post = model <Ipost> ("Post",postSchema)
export default Post;