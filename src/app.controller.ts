import {type Express } from "express";
import { authRouter } from "./modules";

export function bootstrap(app:Express,express:any){
//parsing data
app.use(express.json());

//auth
app.use("/auth",authRouter)
//users
//posts

//comments  
//messages

app.use("/{*dummy}",(req,res,next)=>{
    return  res.status(404).json({ message: "invalid roueter",success:false });
})
}