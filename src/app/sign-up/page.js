'use client'

import { Label } from "@/components/ui/label";
import { initialSignUpFormData, userRegistrationFormControls } from "../utils";
import CommonFormElement from "@/components/form-element/page";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { registerUserAction }from "@/actions";

function SignUp() {
    const [formData, setFormData] = useState(initialSignUpFormData)
    const router = useRouter()

    function handleSignUpBtnValid() {
        return Object.keys(formData).every(
            (key) => formData[key].trim() !== ''
        )
    }

    async function handleSignUp(){
        const result = await registerUserAction(formData);
        console.log(result)

        if (result?.data) router.push('/sign-in')
    }

    return ( 
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-3xl mb-3">Registration Page</h1>
            <form action={handleSignUp}>
                {
                    userRegistrationFormControls.map(formItem => 
                        <div key={formItem.name}>
                            <Label>{formItem.label}</Label>
                            <CommonFormElement
                                value={formData[formItem.name]}
                                currentItem={formItem}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        [e.target.name]: e.target.value
                                    })
                                }}
                            />
                        </div>
                    )
                }
                <Button
                    disabled={!handleSignUpBtnValid()}
                    className="disabled:opacity-65 mt-3 w-full"
                    type="submit"
                >
                    Sign Up
                </Button>
            </form>
        </div>
     );
}

export default SignUp;