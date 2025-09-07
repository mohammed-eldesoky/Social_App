
import { model } from "mongoose";
import { UserSchema } from "./user.schema";
import { IUser } from "../../../utils/common/interface";

const UserModel = model<IUser>("User", UserSchema);
