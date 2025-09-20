import { GENDER_TYPES, SYS_ROLES, USER_AGENT } from "../../../utils/common/enum";
import { generateHash } from "../../../utils/hash";
import { generateOtp, generateOtpExpiryTime } from "../../../utils/otp";
import { RegistterDTO } from "../auth.dto";
import { User } from "../entity";

//factory pattern
export class AuthFactory {

async register(registterDTO:RegistterDTO){
const user = new User;
user.fullName = registterDTO.fullName as string;
user.email = registterDTO.email;
user.password = await generateHash(registterDTO.password);
user.phoneNumber = registterDTO.phoneNumber as string; // encrypt [Remember]
user.gender = GENDER_TYPES.male;
user.role = SYS_ROLES.user;
user.userAgent = USER_AGENT.local;    
user.otp = generateOtp();
user.otpExpiryAt = generateOtpExpiryTime(5*60*1000) as unknown as Date ; //5 min
user.credenialUpdatedAt = Date.now() as unknown as Date ;
user.isVerified = false;
return user;

}


}