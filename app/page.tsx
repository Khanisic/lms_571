import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Bradley Learning Management System",
  description: "CS 571 Project",
};

export default function SignIn() {
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
          <input className="outline-none bg-darker rounded-md px-2 py-2 font-chill text-white" type="text" />
        </div>

        <div className="flex flex-col w-[200px]">
          <label className="text-white font-funky">Password:</label>
          <input className="outline-none bg-darker rounded-md px-2 py-2 font-chill text-white" type="password" />
        </div>

        <Link href={"/dashboard"}>
          <div className=" self-center bg-secondary font-funky px-8 py-1 text-white text-xl rounded-md">Login</div>
        </Link>
        <p className="text-white font-funky cursor-pointer">Forgot your password?</p>
      </div>
    </div>
  );
}
