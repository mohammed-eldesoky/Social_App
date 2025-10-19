

import { Schema } from "mongoose";
import { Imessage } from "../../../utils";


// ______________message schema___________//

export const messageSchema =new Schema <Imessage>({
sender:{
type:Schema.Types.ObjectId,
ref:'User',
}
,
content:String,
},{timestamps:true})



