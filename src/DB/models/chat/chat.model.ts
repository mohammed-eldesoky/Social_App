

//message model

import { model } from "mongoose";
import { Ichat } from "../../../utils";
import { chatSchema } from "./chat.schema";

const Chat = model<Ichat>("Chat", chatSchema);
export default Chat;