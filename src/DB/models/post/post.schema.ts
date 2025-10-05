import { Schema } from "mongoose";
import { Ipost, Ireaction, USER_REACTIONS } from "../../../utils";
import { Comment } from "../commmet/comment.model";

//reaction schema
export const reactionSchema = new Schema<Ireaction>(
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
          return false;
        }
        return true;
      },
      trim: true,
    },

    reactions: [reactionSchema],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

postSchema.virtual("comments", {
  localField: "_id", //post id
  foreignField: "postId", //comment postId
  ref: "Comment", // model name
});

// use hooks to delete comments and replies when delete main post
postSchema.pre("deleteOne", async function (next) {
  //filter
  const filter = typeof this.getFilter() == "function" ? this.getFilter() : {};
  await Comment.deleteMany({ postId: filter._id }); //any coment and reply have this postId will be deleted

  next();
});
