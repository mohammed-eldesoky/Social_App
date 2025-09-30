import { Icomment } from "../../../utils";
import { AbstractRepository } from "../../abstract.repository";
import { Comment } from "./comment.model";



export class CommentRepository extends AbstractRepository <Icomment>{

constructor() {
    super(Comment);
}

}