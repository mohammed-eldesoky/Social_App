import { NextFunction, Request, Response } from "express";
import { PostDTO } from "./post.dto";
import { postFactory } from "./factory/index";
import { PostRepository } from "../../DB/models/post/post.repository";

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
    res.status(201).json({message:"post created successfully",success:true,data:{post:createdPost}});
  

  };
}

export default new PostService();