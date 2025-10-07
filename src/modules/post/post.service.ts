import { NextFunction, Request, Response } from "express";
import { PostDTO } from "./post.dto";
import { postFactory } from "./factory/index";
import { PostRepository } from "../../DB/models/post/post.repository";
import {
  NotFoundException,
  UnAuthorizedException,
  USER_REACTIONS,
} from "../../utils";
import { addReactProvider } from "../../utils/common/providers/react.provider";

class PostService {
  private readonly postRepository = new PostRepository();
  private readonly postFactory = new postFactory();
  //* create post service

  public createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // 1-get data from req
    const postDTO: PostDTO = req.body;
    //2- factory>> prepare data>> post entity>> repository
    const post = this.postFactory.createPost(postDTO, req.user);
    //3- repository>> >> post entity>>  save db
    const createdPost = await this.postRepository.create(post);
    //4- send response
    res.status(201).json({
      message: "post created successfully",
      success: true,
      data: { post: createdPost },
    });
  };

  //____________________________ reaction___________________________________//

  public reactPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //1-get data from req
    const { id } = req.params;
    const userId = req.user._id;
    const { reaction } = req.body;

    await addReactProvider(this.postRepository, id, userId, reaction);
    //4- send response
    res.sendStatus(204); // no content
  };

  // ___________________________ get specific post ___________________________________//

  public getSpecificPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //Get data from req
    const { id } = req.params; //post id
    //check if post exists
    const postExist = await this.postRepository.getOne(
      { _id: id },
      {},
      {
        populate: [
          { path: "userId", select: "fullName firstName lastName " },
          { path: "reactions.userId", select: "fullName firstName lastName " },
          { path: "comments", match: { parentId: null } }, //only first layer comments
        ],
      }
    );
    //fail case
    if (!postExist) {
      throw new NotFoundException("post not found");
    }
    //success case
    return res.status(200).json({
      message: "post fetched successfully",
      success: true,
      data: { post: postExist },
    });
  };

  // ___________________________ delete post ___________________________________//

  public deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //1-get data from req
    const { id } = req.params; //post id
    //2-check if post exists
    const postExist = await this.postRepository.exist({ _id: id });
    //fail case
    if (!postExist) {
      throw new NotFoundException("post not found");
    }
    //check if user is the owner of the post
    if (postExist.userId.toString() != req.user._id.toString()) {
      throw new UnAuthorizedException(
        "you are not allowed to delete this post"
      );
    }
    //3-delete post
    await this.postRepository.delete({ _id: id });
    //4- send response
    res.status(204).json({
      message: "post deleted successfully",
      success: true,
    });
  };
}
export default new PostService();
