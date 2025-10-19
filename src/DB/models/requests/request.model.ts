
// request model
import { model } from "mongoose";
import { Irequest } from "../../../utils";
import requestSchema from "./request.schma";

const Request = model<Irequest>("Request", requestSchema);
export default Request;
