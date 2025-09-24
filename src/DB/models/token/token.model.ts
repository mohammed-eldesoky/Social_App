import { model } from "mongoose";
import { TokenSchema } from "./token.schema";
import { Itoken } from "../../../utils";



const Token = model<Itoken>("Token",TokenSchema)

export default Token;