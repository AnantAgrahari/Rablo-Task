import authModel from "../models/authModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController{
    static userRegistration=async(req,res)=>{
        const{username,email,password}=req.body;
        try {
            if(username && email && password)
            {
           const isUser=await authModel.findOne({email:email})
           if(!isUser)
            {
            const genSalt=await bcrypt.genSalt(10);                       // higher the value in gensalt, stronger the salt will be genrated//
            const hashedPassword = await bcrypt.hash(password,genSalt); 
            //save a user
            const newUser= await authModel({
                username:username,
                email:email,
                password:hashedPassword,
            });
            const savedUser=await newUser.save();
            if(savedUser){
                return res.status(200).json({message:"user registration successfull"}); 
            }
           }
           else{
            return res.status(400).json({message:"email already registered"}); 
           }
            }
            else{
                return res.status(400).json({message:"all fields are required"});  
            }
        }
         catch (error) {
            return res.status(400).json({message:error.message});
        }
    };
        static userLogin=async(req,res)=>{
           const {email,password}=req.body;
           try {
            if( email && password)
            {
            const isEmail=await authModel.findOne({email:email});
            if(isEmail)
            {
                
             if(isEmail.email==email )
             {
                const sdf = await bcrypt.compare(req.body.password,isEmail.password)
                if(sdf)
                {
                  //generate token
                  const token= jwt.sign({userID: isEmail._id},"pleaseSubscribe",{
                    expiresIn:"2d",
                  });
                  return res.status(200).json({
                    message:"login successfully",token,
                    name:isEmail.name,
                  });
                }
                else{
                    return res.status(200).json({message:"password wrong"});
                }
             }
             else
             {
                return res.status(400).json({message:"wrong email"});
        }
             }
            
            else
            {
                return res.status(400).json({message:"email not registered"});
        }
    
    }
            
            else
            {
                return res.status(400).json({message:"all fields are required"});
            }
           }
             catch (error) {
            return res.status(400).json({message:error.message});
           }
        };
}
 
export default AuthController;