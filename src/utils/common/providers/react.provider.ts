import { ObjectId } from "mongoose";
import { CommentRepository } from "../../../DB";
import { NotFoundException } from "../../error";
import { USER_REACTIONS } from "../enum";
import { PostRepository } from "./../../../DB/models/post/post.repository";
/**
 * @param repo = comment | pos
 * @param id = postId | commentId
 * @param userId = logged in user id
 * @param reaction = like | love | haha | wow | sad | angry
 */

export const addReactProvider = async (
  repo: PostRepository | CommentRepository,
    id: string,
    userId: ObjectId,
     reaction: string,

) => {
  //check if post exists

  const postExist = await repo.exist({ _id: id });
  //fail case
  if (!postExist) {
    throw new NotFoundException("post not found");
  }
  // find if user reacted before
  let userReactionIndex = postExist.reactions.findIndex((ele) => {
    return ele.userId?.toString() === userId.toString();
  });

  if (userReactionIndex == -1) {
    //- add new reaction

    await repo.update(
      { _id: id },
      {
        $push: {
          reactions: {
            userId,
            reaction: [null, undefined, ""].includes(reaction)
              ? USER_REACTIONS.like
              : reaction,
          },
        },
      }
    );
  }
  // delete reaction
  else if ([undefined, null, ""].includes(reaction)) {
    await repo.update(
      { _id: id },
      { $pull: { reactions: postExist.reactions[userReactionIndex] } }
    );

    // if user reacted before just update the reaction
  } else {
    await repo.update(
      {
        _id: id,
        "reactions.userId": userId,
      },
      { $set: { "reactions.$.reaction": reaction } }
    );
  }


};
