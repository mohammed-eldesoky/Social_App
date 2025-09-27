import { NextFunction, Request, Response } from "express";
import { PostDTO } from "./post.dto";
import { postFactory } from "./factory/index";
import { PostRepository } from "../../DB/models/post/post.repository";
import { NotFoundException } from "../../utils";

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
        { $push: { reactions:{ userId ,reaction}} }
      );
    }
    else{
     await this.postRepository.update({
        _id: id,"reactions.userId":userId},
        {$set:{"reactions.$.reaction":reaction}})
        // if user reacted before just update the reaction
    }

    //4- send response
    res.sendStatus(204); // no content
  };





}

export default new PostService();
