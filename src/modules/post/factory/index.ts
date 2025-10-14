
import { IUser } from '../../../utils';
import { Post } from '../entity';
import { PostDTO } from './../post.dto';


export class postFactory{
 // any factory pattern create or update
    createPost(postDTO: PostDTO,user:IUser){
 const newPost = new Post() 
  newPost.userId=user._id
 newPost.reactions=[];
 newPost.attachments=[];
 newPost.content=postDTO.content;

return newPost;
};

  updatePost(postDTO: PostDTO){
     const updatePost = new Post() 
     updatePost.content=postDTO.content;

     return updatePost;
  };


}