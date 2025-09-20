import { GENDER_TYPES, SYS_ROLES, USER_AGENT } from "../../common/enum/index";

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

