import { Ichat } from "../../../utils";
import { AbstractRepository } from "../../abstract.repository";
import Chat from "./chat.model";



export class ChatRepository extends AbstractRepository <Ichat>{
    
constructor() {
    super(Chat);
  }

}