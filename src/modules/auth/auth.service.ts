import { NextFunction,Request,Response } from "express";
import { RegistterDTO } from "./auth.dto";


class AuthService {
constructor() {}
register (req:Request,res:Response,next:NextFunction){
//get data from req
const registterDTO:RegistterDTO =req.body

//check user existance
//prepare data
//create user
//send response




}

}


export default new AuthService(); //single ton