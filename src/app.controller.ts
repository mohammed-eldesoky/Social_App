import type { Express, NextFunction , Response,Request, ErrorRequestHandler} from "express";
import { authRouter, commentRouter, postRouter, userRouter } from "./modules";
import { connectDB } from "./DB";
import { AppError } from "./utils";
import cors from "cors";

export function bootstrap(app:Express,express:any){
//parsing data
app.use(express.json());


app.use(cors({origin:"*"}))
//auth
app.use("/auth",authRouter)
//users
app.use("/user",userRouter)
//posts
app.use("/post",postRouter)
//comments  
app.use("/comment",commentRouter)
//messages

app.use("/{*dummy}",(req,res,next)=>{
    return  res.status(404).json({ message: "invalid roueter",success:false });
})

connectDB(); //operation buffering

 // GLOBAL ERROR HANDLER

const globalErrorHandler: ErrorRequestHandler = (
  error: AppError,
  req: Express.Request ,
  res: Response,
  next: NextFunction
) => {
  return res.status(error.statusCode || 500).json({
    message: error.message,
    success: false,
    errorDettails: error.errorDettails,
  });
};

app.use(globalErrorHandler);


}