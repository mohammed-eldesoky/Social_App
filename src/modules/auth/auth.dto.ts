//DTO : data transfer object

import { GENDER_TYPES } from "../../utils/common/enum";

export interface RegistterDTO {
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  gender: GENDER_TYPES;
}



