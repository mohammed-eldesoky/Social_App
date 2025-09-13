import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../../DB/models/user/user.repository";
class UserService {
    private readonly userRepository = new UserRepository();
constructor(){}

 getProfile= async(req:Request,res:Response,next:NextFunction)=>{

let user = await this.userRepository.getOne({_id:req.params.id})

return res.status(200).json({message:"success",success:true,data:{user}})
}


}

export default new UserService(); //single ton