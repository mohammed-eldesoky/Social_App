import { Ipost } from "../../../utils";
import { AbstractRepository } from "../../abstract.repository";
import Post from "./post.model";

export class PostRepository extends AbstractRepository<Ipost> {
    
  constructor() {
    super(Post);
  }

}