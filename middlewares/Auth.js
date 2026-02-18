import express from "express";
import jwt from "jsonwebtoken";
 


export const isAuthenticate = async(req ,res , next)=>{

    const token = req.header('Auth');

    if(!token){
        res.json({
            message:"not Authorized , please login first ", status :false
        });
    } else{

        const decoded = JsonWebTokenError.verify(token,"$/@abcd");
        let userid = decoded.userId;
        let finduser = await User.findOne({userid});

        if(!finduser){
            res.json({ message: "User not found", status:false})
        }
        req.userdata = finduser;

        next();
        
    }

};
