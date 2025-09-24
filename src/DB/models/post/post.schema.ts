import { Schema } from "mongoose";
import { Ipost, Ireaction, USER_REACTIONS } from "../../../utils";

//reaction schema
const reactionSchema = new Schema<Ireaction>({
    reaction: {
    type: String,
    enum: USER_REACTIONS ,
    default: USER_REACTIONS.like,
},

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

},{timestamps:true})

// post schema

export const postSchema = new Schema<Ipost>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: function () {
        if (this.attachments && this.attachments.length > 0) {
            return false
        }
        return true;
      },
      trim: true,
    },

   reactions:[reactionSchema ]



   },
  { timestamps: true }
);
