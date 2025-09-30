import { z } from "zod";
import { GENDER_TYPES, USER_AGENT } from "../../utils";
import { LoginDTO, RegistterDTO, VerifyAccountDTO } from "./auth.dto";

// register validaton  schema
// all fields by default are required
export const registerSchema = z.object<RegistterDTO>({
  fullName: z.string().min(3).max(20) as unknown as string, //TYPE assertion
  email: z.email().optional() as unknown as string,
  password:z.string() as unknown as string,
  phoneNumber: z.string().min(11).max(11).optional() as unknown as string,
  gender:z.enum(GENDER_TYPES) as unknown as GENDER_TYPES,

}).refine((data)=> data.email || data.phoneNumber, {
  message:"Email or phone number is required",
  path:["email"]

 });

 // login validation schema

 export const loginSchema = z.object<LoginDTO>({
  
  email: z.email() as unknown as string,
  password:z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) as unknown as string,

})

// verify account validation schema


 export const verifyAccountSchema = z.object<VerifyAccountDTO>({
  otp: z.string().min(6).max(6) as unknown as string,
  email: z.email() as unknown as string


})