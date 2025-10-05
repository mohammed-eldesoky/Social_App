import { Schema } from "mongoose";
import { Icomment } from "../../../utils";
import { reactionSchema } from "../post/post.schema";

// ___________comments__________
export const commentSchema = new Schema<Icomment>(
  {
    content: {
      type: String,
      //   required: function () {
      //     if (this.attachments.length) {
      //       return false;
      //     }
      //     return true;
      //   },
    },
    // attachments: {
    //   type: [],
    // }, // todo attachments
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },

    reactions: [reactionSchema],
    mentions: {
      type: [Schema.Types.ObjectId],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

commentSchema.virtual("replies", {
  ref: "Comment",
  localField: "_id",
  foreignField: "parentId",
});
