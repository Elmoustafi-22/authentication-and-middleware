'use client'

import CommonFormElement from "@/components/form-element/page";
import { initialLoginFormData, userLoginFormControls } from "../utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { loginUserAction } from "@/actions";
import { useRouter } from "next/navigation";
function SignIn () {
    const [loginFormData, setLoginFormData] = useState(initialLoginFormData)
    const router = useRouter();

    function handleSignUpBtnValid() {
        return Object.keys(loginFormData).every(
            (key) => loginFormData[key].trim() != ''
        )
    }

    async function handleSignIn(){
        const result = await loginUserAction(loginFormData);
        console.log(result)
         if (result?.success) router.push("/")
    }
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-3xl mb-3">Login here</h1>
        <form action={handleSignIn}>
            {
                userLoginFormControls.map(loginItem=>
                    <div key={loginItem.name}>
                        <Label>{loginItem.label}</Label>
                        <CommonFormElement 
                            value={loginFormData[loginItem.name]}
                            currentItem={loginItem}
                            onChange={(e) => setLoginFormData({
                                ...loginFormData,
                                [e.target.name]: e.target.value
                            })}
                        />
                    </div>
                )
            }
            <Button
                disabled={!handleSignUpBtnValid()}
                className="disabled:opacity-65 mt-3 w-full"
                type="submit"
            >
                Sign In
            </Button>
        </form>

      </div>
    );
}

export default SignIn ;