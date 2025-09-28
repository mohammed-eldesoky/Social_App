import { NextFunction, Request, Response } from "express";
import { PostDTO } from "./post.dto";
import { postFactory } from "./factory/index";
import { PostRepository } from "../../DB/models/post/post.repository";
import { NotFoundException, USER_REACTIONS } from "../../utils";

class PostService {
  private readonly postRepository = new PostRepository();
  private readonly postFactory = new postFactory();
  //* create post service

  createPost = async (req: Request, res: Response, next: NextFunction) => {
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

  reactPost = async (req: Request, res: Response, next: NextFunction) => {
    //1-get data from req
    const { id } = req.params;
    const userId = req.user._id;
    const { reaction } = req.body;
    //2check if post exists

    const postExist = await this.postRepository.exist({ _id: id });
    //fail case
    if (!postExist) {
      throw new NotFoundException("post not found");
    }
    // find if user reacted before
    let userReactionIndex = postExist.reactions.findIndex((ele) => {
      return ele.userId?.toString() === userId.toString();
    });

    if (userReactionIndex == -1) {
      //3- add new reaction

      await this.postRepository.update(
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
      await this.postRepository.update(
        { _id: id },
        { $pull: { reactions: postExist.reactions[userReactionIndex] } }
      );

      // if user reacted before just update the reaction
    } else {
      await this.postRepository.update(
        {
          _id: id,
          "reactions.userId": userId,
        },
        { $set: { "reactions.$.reaction": reaction } }
      );
    }

    //4- send response
    res.sendStatus(204); // no content
  };

  // ___________________________ get specific post ___________________________________//

  getSpecificPost = async (req: Request, res: Response, next: NextFunction) => {
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
          // don't forget to populate comments userId
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
}

export default new PostService();
