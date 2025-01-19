'use server'

import connectToDB from "@/database"
import bcryptjs from 'bcryptjs'
import User from "@/models";

export default async function registerUserAction(formData){
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