import { GENDER_TYPES, SYS_ROLES, USER_AGENT } from "../../../utils/common/enum";

export class User {
public  firstName!: string;
public  lastName !: string;
public  fullName!: string;
public  email!: string;
public  password !: string;
public  credenialUpdatedAt!: Date;
public  phoneNumber!: string;
public  role !: SYS_ROLES;
public  gender !: GENDER_TYPES;
public  userAgent !: USER_AGENT;
public otp!: string;
public  otpExpiryAt!: Date; //otp
}
