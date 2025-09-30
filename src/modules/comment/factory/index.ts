import { Icomment, Ipost, IUser } from "../../../utils";
import { Commment } from "../entity";
import { CreateCommentDTO } from "./../comment.dto";
export class CommentFactory {
  // create
  create(
    createCommentDTO: CreateCommentDTO,
    user: IUser,
    post: Ipost,
    comment?: Icomment
  ) {
    const newComment = new Commment();
    newComment.content = createCommentDTO.content;
    newComment.userId = user._id;
    newComment.postId = post._id;
    newComment.parentsIds = [...comment.parentsIds, comment._id];
    newComment.reactions = [];

    return newComment;
  }
}
