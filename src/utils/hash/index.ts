import bcrypt from 'bcryptjs';


//hash password
export const generateHash= (planText:string)=>{
return bcrypt.hashSync(planText,10)
}

//compare password
export const compareHash= (planText:string,hash:string)=>{
return bcrypt.compareSync(planText,hash)
}