import type { Express, NextFunction , Response,Request} from "express";
import { authRouter, userRouter } from "./modules";
import { connectDB } from "./DB";
import { AppError } from "./utils";

export function bootstrap(app:Express,express:any){
//parsing data
app.use(express.json());

//auth
app.use("/auth",authRouter)
//users
app.use("/user",userRouter)
//posts

//comments  
//messages

app.use("/{*dummy}",(req,res,next)=>{
    return  res.status(404).json({ message: "invalid roueter",success:false });
})

connectDB(); //operation buffering

 // GLOBAL ERROR HANDLER
app.use((error:AppError , req:Request , res:Response , next:NextFunction)=>{
return res.status(error.statusCode| 500).json({
    message:error.message,
    success:false,
    errorDettails:error.errorDettails

})

})


}