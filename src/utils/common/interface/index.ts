import { JwtPayload } from "jsonwebtoken";
import {
  GENDER_TYPES,
  SYS_ROLES,
  TOKEN_TYPES,
  USER_AGENT,
  USER_REACTIONS,
} from "../../common/enum/index";
import { ObjectId, Types } from "mongoose";
import { Request } from "express";
export interface IUser {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  password: string;
  credenialUpdatedAt?: Date;
  phoneNumber?: string;
  role: SYS_ROLES;
  gender: GENDER_TYPES;
  userAgent: USER_AGENT;
  otp?: string;
  otpExpiryAt?: Date; //otp
  isVerified?: boolean;
  banUntil?: Date;
  friends: ObjectId[];
}

// token
export interface Itoken {
  token: string;
  user: Types.ObjectId;
  type: TOKEN_TYPES; // enum
  expiresAt: Date;
}

//reopen
//PAYLOAD
declare module "jsonwebtoken" {
  interface JwtPayload {
    _id: string;
    role: string;
  }
}

// authRequest
// CONCEPT REOPEN
declare module "express" {
  interface Request {
    user: IUser;
  }
}

//___________attachments__________
export interface Iattachment {
  url: string;
  id: string;
}

// ___________reactions__________
export interface Ireaction {
  reaction: USER_REACTIONS;
  userId: ObjectId;
}

// ______________post___________
export interface Ipost {
  _id: ObjectId;
  userId: ObjectId;
  content: string;
  reactions: Ireaction[];
  attachments?: Iattachment[];
  isFrozen?: boolean;
}

// ______________comment___________
export interface Icomment {
  _id: ObjectId;
  userId: ObjectId;
  postId: ObjectId;
  parentId: ObjectId | null;
  content: string;
  reactions: Ireaction[];
  attachments: Iattachment[];
  mentions?: ObjectId[];
  isFrozen?: boolean;
}

//_______________message___________

export interface Imessage {
  sender: ObjectId;
  content: string;
  attachments?: ObjectId[];
}

//_______________chat___________
export interface Ichat {
  users: ObjectId[];
  messages: ObjectId[];
}

//___________request__________
export interface Irequest {
  _id?: ObjectId;
  sender:ObjectId ;
  receiver: ObjectId | string;
  status?: "pending" | "accepted" | "rejected";
  createdAt?: Date;
  updatedAt?: Date;
}
