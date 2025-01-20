'use server'

import connectToDB from "@/database"
import bcryptjs from 'bcryptjs'
import User from "@/models";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";

export async function registerUserAction(formData){
   await connectToDB();

   try {
        const {userName, email, password} = formData;
        const checkUser = await User.findOne({email});
        if (checkUser){
            return {
                success: false,
                message: 'Another account has registered with this this email'
            }
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newlyCreatedUser = new User({
            userName,
            email,
            password: hashedPassword,
        })

        const savedUser = await newlyCreatedUser.save()

        if (savedUser){
            return {
                success: true,
                data: JSON.parse(JSON.stringify(savedUser))
            }
        } else {
            return {
                success: false,
                message: 'Something went wrong! Please try again'
            }
        }
   } catch(error){
    console.log(error);
    return {
        message: 'Something went wrong',
        success: false
    }
   }
}

export async function loginUserAction(formData){
    await connectToDB();
    try{
        const  {email, password} = formData;

        const checkUser = await User.findOne({ email });
        if (!checkUser){
            return {
                success: false,
                message: "User doesn't exist ! Please check",
            }
        }

        const checkPassword = await bcryptjs.compare(password, checkUser.password);
        if (!checkPassword){
            return {
                message: 'Password is incorrect please check',
                success: false,
            }
        }

        const createdTokenData = {
            id: checkUser._id,
            userName: checkUser.userName,
            email: checkUser.email,
        }

        const token = jwt.sign(createdTokenData, "DEFAULT_KEY", {expiresIn : "1d"})
        const getCookies = cookies();
        getCookies.set('token', token)

        return {
            success: true,
            message: 'Login is succcessful'
        }

    } catch(error) {
        return {
            message: 'Something went wrong, please try again later',
            success: false
        }
    }
}