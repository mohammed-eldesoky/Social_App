

// request schema
import { Schema } from "mongoose";
import { Irequest } from "../../../utils";

export const requestSchema = new Schema<Irequest>({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  }
}, { timestamps: true });

export default requestSchema;
