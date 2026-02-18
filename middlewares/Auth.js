import express from "express";
import jwt from "jsonwebtoken";
import { User } from "./../model/user.js";   // added missing import


export const isAuthenticate = async (req, res, next) => {

    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.json({
            message: "not Authorized , please login first",
            status: false
        });
    } 
    else {

        // Remove Bearer from header
        const token = authHeader.replace("Bearer ", "");

        try {

            const decoded = jwt.verify(token, "abcd1234");   // fixed verify + secret key

            let userid = decoded.userId;

            let finduser = await User.findById(userid);   // fixed query

            if (!finduser) {
                return res.json({
                    message: "User not found",
                    status: false
                });
            }

            req.userdata = finduser;

            next();

        } catch (error) {

            return res.json({
                message: "Invalid Token",
                status: false
            });
        }
    }

};
