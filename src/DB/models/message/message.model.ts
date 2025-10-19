

//message model

import { model } from "mongoose";
import { Imessage } from "../../../utils";
import { messageSchema } from "./mesage.schema";

const Message = model<Imessage>("Message", messageSchema);
export default Message;