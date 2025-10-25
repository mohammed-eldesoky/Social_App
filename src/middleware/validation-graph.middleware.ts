import { NextFunction, Request, Response } from "express";
import { RegistterDTO } from '../modules/auth/auth.dto';

import { BadRequestException } from "../utils/error";
import { log } from "console";
import { ZodType } from "zod";
// check validation
export const isValidGraph=(schema:ZodType,args:any)=>{
    const result = schema.safeParse(args);
    if (result.success == false) {
      let errMessage = result.error.issues.map((issue) => ({
        path: issue.path[0],
        message: issue.message,
      })); //return {}
      log(errMessage);
      throw new BadRequestException(JSON.stringify(errMessage),errMessage);
    
    }

    }
