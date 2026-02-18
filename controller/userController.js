import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "./../model/user.js";
import jwt from "jsonwebtoken";


// SIGNUP
export const signup = async (req, res) => {

    const { name, email, password } = req.body;

    let checkuser = await User.findOne({ email });

    if (!checkuser) {

        let hashPassword = await bcrypt.hash(password, 10);

        let user = await User.create({
            name,
            email,
            password: hashPassword,   // fixed here
        });

        return res.json({
            message: "user registration successful",
            status: true
        });

    }
    else {
        return res.json({
            message: "user already exist",
            status: false,   // fixed here
        });
    }

};


// LOGIN
export const login = async (req, res) => {

    const { email, password } = req.body;

    let checkuser = await User.findOne({ email });

    if (!checkuser) {

        return res.json({
            message: "user not found",
            status: false,
        });

    }
    else {

        let validUser = await bcrypt.compare(password, checkuser.password);

        if (validUser) {

            let token = await jwt.sign(
                { userId: checkuser._id },
                "abcd1234"   // fixed secret key format
            );

            return res.json({
                message: "login Successfully",
                status: true,
                token
            });

        }
        else {

            return res.json({
                message: "password is wrong",
                status: false,
            });
        }
    }

};
