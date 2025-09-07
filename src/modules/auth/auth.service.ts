import { NextFunction,Request,Response } from "express";
import { RegistterDTO } from "./auth.dto";
import User from "../../DB/models/user/user.model";
import { ConflictException } from "../../utils/error";


class AuthService {
constructor() {}
async register  (req:Request,res:Response,next:NextFunction){
//get data from req
const registterDTO:RegistterDTO =req.body
//check user existance
const userExist=await User.findOne({email:registterDTO.email})
//fail case 
if(userExist){
  throw new ConflictException("User already exist");
}

//prepare data
//create user
//send response




}

}


export default new AuthService(); //single ton