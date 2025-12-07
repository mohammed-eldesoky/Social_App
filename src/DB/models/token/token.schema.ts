import { Schema } from "mongoose";
import { Itoken, TOKEN_TYPES } from "../../../utils";

export const TokenSchema = new Schema<Itoken>(
  {
    token: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: TOKEN_TYPES,
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);
TokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index to auto-delete expired tokens
