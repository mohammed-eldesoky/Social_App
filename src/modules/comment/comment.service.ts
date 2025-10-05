import { NextFunction, Request, Response } from "express";
import { CommentRepository } from "./../../DB/models/commmet/comments.repository";
import { NotFoundException } from "../../utils";
import { PostRepository } from "./../../DB/models/post/post.repository";
import { CommentFactory } from "./factory/index";
import { CreateCommentDTO } from "./comment.dto";
import th from "zod/v4/locales/th.js";
import path from "path";

class CommentService {
  private readonly postRepository = new PostRepository();
  private readonly commentRepository = new CommentRepository();
  private readonly commentFactory = new CommentFactory();
  //* Implement comment service methods here *//

  //_________________________create comment_________________________//

  public createComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
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

    return res.status(201).json({
      message: "comment created successfully",
      success: true,
      data: { createdComment },
    });
  };

  // _________________________ get specific comment_________________________//

  public getSpecificComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //get data from req
    const { id } = req.params;
    // check if comment exists
    const commentExist = await this.commentRepository.exist(
      { _id: id },
      {},
      {
        populate: [{ path: "replies" }],
      }
    );

    // fail case
    if (!commentExist) {
      throw new NotFoundException("comment not found");
    }

    //send res
    return res.status(200).json({
      message: "comment found successfully",
      success: true,
      data: { commentExist },
    });
  };

  // _________________________ delete  comments_________________________//

  public deleteComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //get data from req
    const { id } = req.params;
    // check if comment exists
    const commentExist = await this.commentRepository.exist({ _id: id });
    // fail case
    if (!commentExist) {
      throw new NotFoundException("comment not found to be deleted");
    }
    // delete comment from db
    const deletedComment = await this.commentRepository.delete({_id:id});
    //send res
    return res.status(200).json({
      message: "comment deleted successfully",
      success: true,
      data: { deletedComment },
    });
  };
}

export default new CommentService();
