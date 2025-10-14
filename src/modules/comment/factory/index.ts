import { Icomment, Ipost, IUser } from "../../../utils";
import { Commment } from "../entity";
import { CreateCommentDTO, UpdateCommentDTO } from "./../comment.dto";
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
    newComment.postId = post._id || comment.postId; //reply 
    newComment.parentsId = comment?._id;
    newComment.reactions = [];

    return newComment;
  }

// update
update (
  updateCommentDTO:UpdateCommentDTO,
  post:Ipost,
  user:IUser,
  comment?:Icomment

){
    const upateComment = new Commment();
    upateComment.content = updateCommentDTO.content;
    upateComment.userId = user._id;
    upateComment.postId = post._id || comment.postId; //reply

    return upateComment;
}

}
