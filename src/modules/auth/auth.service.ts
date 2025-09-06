import { NextFunction,Request,Response } from "express";


class AuthService {
constructor() {}
register (req:Request,res:Response,next:NextFunction){

  return res.status(200).json({message:"Register endpoint"});  

}

}


export default new AuthService(); //single ton