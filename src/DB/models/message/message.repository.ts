import { Imessage } from "../../../utils";
import { AbstractRepository } from "../../abstract.repository";
import Message from "./message.model";



export class MessageRepository extends AbstractRepository <Imessage>{
    
constructor() {
    super(Message);
  }

}