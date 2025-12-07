import { NextFunction, Request, Response } from "express";
import { PostDTO } from "./post.dto";
import { postFactory } from "./factory/index";
import { PostRepository } from "../../DB/models/post/post.repository";
import {
  BadRequestException,
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

  // ___________________________ get all posts ___________________________________//
  public getAllPosts = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await this.postRepository.getAll(
      {},
      {},
      {
        skip,
        limit,
        sort: { createdAt: -1 },
        populate: [
          { path: "userId", select: "fullName firstName lastName" },
          { path: "reactions.userId", select: "fullName firstName lastName" },
          { path: "comments", match: { parentId: null } },
        ],
      }
    );

    const total = await this.postRepository.countDocuments({});

    return res.status(200).json({
      message: "Posts fetched successfully",
      success: true,
      data: {
        posts,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
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

  // ___________________________ freeze post ___________________________________//

  public freezePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // get data from req
    const { id } = req.params; //post id
    // check if post exists
    const postExist = await this.postRepository.exist({ _id: id });
    //fail case
    if (!postExist) {
      throw new NotFoundException("post not found");
    }

    // check if user is the owner of the post
    if (postExist.userId.toString() != req.user._id.toString()) {
      throw new UnAuthorizedException(
        "you are not allowed to freeze this post"
      );
    }
    // check if post is  frozen  or not
    const isFrozen = !postExist.isFrozen;

    // freeze post
    await this.postRepository.update({ _id: id }, { isFrozen });
    // send response
    res.status(200).json({
      message: `post is ${isFrozen ? "frozen" : "un-frozen"} successfully`,
      success: true,
    });
  };

  //__________________________ update post ___________________________________//
  public updatePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //1-get data from req
    const { id } = req.params; //post id
    const postDTO: PostDTO = req.body;
    //2-check if post exists
    const postExist = await this.postRepository.exist({ _id: id });
    //fail case
    if (!postExist) {
      throw new NotFoundException("post not found");
    }
    //check if user is the owner of the post
    if (postExist.userId.toString() != req.user._id.toString()) {
      throw new UnAuthorizedException(
        "you are not allowed to update this post"
      );
    }
    // check if post is  frozen  or not
    if (postExist.isFrozen) {
      throw new BadRequestException("post is frozen you can't update it");
    }
    //prepare data
    const post = this.postFactory.updatePost(postDTO);

    //3-update post
    const updatedPost = await this.postRepository.update({ _id: id }, post);
    //4- send response
    res.status(200).json({
      message: "post updated successfully",
      success: true,
      data: updatedPost,
    });
  };
}
export default new PostService();
