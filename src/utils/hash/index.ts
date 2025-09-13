import bcrypt from 'bcryptjs';


//hash password
export const generateHash=async  (planText:string)=>{
return await bcrypt.hash(planText,10)
}

//compare password
export const compareHash= async (planText:string,hash:string)=>{
return await bcrypt.compare(planText,hash)
}