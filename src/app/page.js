import { fetchAuthUserAction } from "@/actions";
import Logout from "@/components/log-out";
import { redirect } from "next/navigation";

export default async function Home() {
  const currentUser = await fetchAuthUserAction();

  console.log(currentUser);

  if (!currentUser?.success) redirect('/sign-in')

  return (
    <div className="bg-gray-100 flex flex-col h-screen justify-center items-center">
      <h1 className="text-2xl font-semibold">Next JS Autentication</h1>

      <div className="bg-white flex gap-4 p-4 justify-between items-center w-[300px] mt-4 border rounded-sm border-blue-300 shadow-md hover:scale-105 hover:skew-x-1 cursor-pointer transition-all">
        <div>
          <h2>{currentUser?.data?.userName}</h2>
          <p>{currentUser?.data?.email}</p>
        </div>
        <Logout/>
      </div>
    </div>
  );
}
