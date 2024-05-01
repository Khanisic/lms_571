"use client"
import { fetchUserDetails } from "@/lib/actions/user.action";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function SignIn() {
  const [userID, setuserID] = useState("")
  const router = useRouter()
  console.log(userID)
  const login = () => {

    fetchUserDetails(userID).then((res: any) => {
      console.log(userID)
      console.log(res)
      router.push(`/dashboard/${res.id}`)
    })


  }

  return (
    <div className="bg-darker w-screen h-screen flex gap-20 items-center justify-center">
      <div>
        <Image
          alt="Bradley Logo"
          src="/braves_logo.png"
          width={500}
          height={630} />
      </div>
      <div className="bg-dark p-10 rounded-lg flex flex-col gap-6">
        <p className="font-funky text-white text-3xl self-center">Login</p>
        <div className="flex flex-col w-[200px]">
          <label className="text-white font-funky">ID:</label>
          <input onChange={(e) => { setuserID(e.target.value) }} className="outline-none bg-darker rounded-md px-2 py-2 font-chill text-white" type="text" />
        </div>

        <div className="flex flex-col w-[200px]">
          <label className="text-white font-funky">Password:</label>
          <input className="outline-none bg-darker rounded-md px-2 py-2 font-chill text-white" type="password" />
        </div>


        <div onClick={() => login()} className=" self-center cursor-pointer bg-secondary font-funky px-8 py-1 text-center text-white text-xl rounded-md hover:bg-blood transition-all duration-300 ease-in-out">Login</div>

        <p className="text-white font-funky cursor-pointer">Forgot your password?</p>
      </div>
    </div>
  );
}
