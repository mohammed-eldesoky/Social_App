import { NextFunction, Request, Response } from "express";
import { CommentRepository } from "./../../DB/models/commmet/comments.repository";
import { NotFoundException } from "../../utils";
import { PostRepository } from "./../../DB/models/post/post.repository";
import { CommentFactory } from "./factory/index";
import { CreateCommentDTO } from "./comment.dto";


class CommentService {
  private readonly postRepository = new PostRepository();
  private readonly commentRepository = new CommentRepository();
  private readonly commentFactory = new CommentFactory();
  //* Implement comment service methods here *//

  //_________________________create comment_________________________//

  createComment = async (req: Request, res: Response, next: NextFunction) => {
    //get data from req
    const { postId, id } = req.params;
    const createCommentDTO: CreateCommentDTO = req.body;
    // check if postId exists
    const postExist = await this.postRepository.exist({ _id: postId });
    // fail case
    if (!postExist) {
      throw new NotFoundException("post not found to add comment");
    }
    // check if this first comment or reply to another comment
    let commentExist: any = undefined;
    if (id) {
      commentExist = await this.commentRepository.exist({ _id: id });
      // fail case
      if (!commentExist) {
        throw new NotFoundException("comment not found to add reply");
      }
    }
    //prepare data to be added > factory
    const comment = this.commentFactory.create(
      createCommentDTO,
      req.user,
      postExist,
      commentExist
    );

    // repository
    const createdComment = await this.commentRepository.create(comment);

    //send res

    return res
      .status(201)
      .json({
        message: "comment created successfully",
        success: true,
        data: { createdComment },
      });
  };
}

export default new CommentService();
