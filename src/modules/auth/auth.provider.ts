import { UserRepository } from "../../DB";
import { BadRequestException, NotFoundException } from "../../utils";
import { VerifyAccountDTO } from './auth.dto';

export const authProvider={
  async  checkOtp(verifyAccountDTO:VerifyAccountDTO){
const userRepository=new UserRepository();

        //check user existance
const userExist = await userRepository.exist({email:verifyAccountDTO.email});
//fail case
if(!userExist){
    throw new NotFoundException("User not found");
}
//check otp 
if (userExist.otp !== verifyAccountDTO.otp){
    throw new BadRequestException("Invalid otp");
}

//check otp expiry

if (!userExist.otpExpiryAt || userExist.otpExpiryAt.getTime() < Date.now()) {

    throw new BadRequestException("Otp Expired");
}
    },
}