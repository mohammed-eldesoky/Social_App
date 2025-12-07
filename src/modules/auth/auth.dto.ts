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

//_____________________update basic info and email ______________________//
export interface UpdateBasicInfoDTO {
  fullName?: string;
  gender?: string;
  email?: string;
  phoneNumber?: string;
}
// _____________________forget password ______________________//
export interface ForgetPasswordDTO {
  email: string;
  otp: string;
  newPassword: string;

}

// _____________________refresh Token ______________________//

export interface RefreshTokenDTO {
  refreshToken: string;
}

//_____________________logout ______________________//
export interface LogoutDTO {
  refreshToken: string;
}