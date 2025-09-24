import { GENDER_TYPES, SYS_ROLES, TOKEN_TYPES, USER_AGENT } from "../../common/enum/index";
import { Types } from "mongoose";
 export interface IUser {
    firstName: string;
    lastName: string;
    fullName?: string;
    email: string;
    password: string;
  credenialUpdatedAt?: Date;
  phoneNumber?: string;
  role:SYS_ROLES;
  gender:GENDER_TYPES;
  userAgent:USER_AGENT;
  otp?:string;
  otpExpiryAt?:Date; //otp
  isVerified?:boolean
 }


 // token 
 export interface Itoken {
   token: string;
  user: Types.ObjectId; 
  type: TOKEN_TYPES // enum
  expiresAt: Date;
 }
