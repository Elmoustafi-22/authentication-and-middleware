'use client'

import { Button } from "../ui/button"
import { logOutAction } from "@/actions"


function Logout(){
    async function handleLogout(){
        await logOutAction();
    }

    return <Button onClick={handleLogout}>Logout</Button>
}

export default Logout;