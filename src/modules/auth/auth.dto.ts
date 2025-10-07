//DTO : data transfer object

import { GENDER_TYPES } from "../../utils/common/enum";

export interface RegistterDTO {
  fullName?: string;
  email: string;
  password: string;
  phoneNumber?: string;
  gender: GENDER_TYPES;
}

//______________________login______________________//

export interface LoginDTO {

  email: string;
  password: string;
 
}

//______________________verify account______________________//
export interface VerifyAccountDTO {
  email: string;
  otp: string;
}
//_____________________update password ______________________//
export interface UpdatePasswordDTO {
  oldPassword: string;
  newPassword: string;
}
