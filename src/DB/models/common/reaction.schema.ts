import { Schema } from "mongoose";
import { Ireaction, USER_REACTIONS } from "../../../utils";

//reaction schema
export const reactionSchema = new Schema <Ireaction>(
  {
    reaction: {
      type: String,
      enum: USER_REACTIONS,
      default: USER_REACTIONS.like,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);