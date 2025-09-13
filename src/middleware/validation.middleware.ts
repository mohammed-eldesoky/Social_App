import { NextFunction, Request, Response } from "express";
import { RegistterDTO } from './../modules/auth/auth.dto';

import { BadRequestException } from "../utils/error";
import { log } from "console";
import { ZodType } from "zod";
// check validation
export const isValid=(schema:ZodType)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
    // validation
    let data={...req.body,...req.params,...req.query};
    const result = schema.safeParse(data);
    if (result.success == false) {
      let errMessage = result.error.issues.map((issue) => ({
        path: issue.path[0],
        message: issue.message,
      })); //return {}
      log(errMessage);
      throw new BadRequestException("validation failed", errMessage);
    
    }
    }
}