
import { model } from "mongoose";
import { UserSchema } from "./user.schema";
import { IUser } from "../../../utils/common/interface";

const User = model<IUser>("User", UserSchema);
export default User;