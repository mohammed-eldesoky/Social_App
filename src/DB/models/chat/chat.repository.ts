import { Ichat } from "../../../utils";
import { AbstractRepository } from "../../abstract.repository";
import Chat from "./chat.model";



export class MessageRepository extends AbstractRepository <Ichat>{
    
constructor() {
    super(Chat);
  }

}