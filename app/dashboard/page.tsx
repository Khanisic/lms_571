import LeftBar from "@/app/dashboard/_components/LeftBar";
import { Metadata } from "next";
import dbms_img from './_images/571.svg'
import cns_img from './_images/cs534.svg'
import spm_img from './_images/591.svg'


import Image from "next/image";
import CapIcon from "./_components/CapIcon";
import BookIcon from "./_components/BookIcon";
import SpeakerIcon from "./_components/SpeakerIcon";
import Todo from "./_components/Todo";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "CS 571 Project",
};
const dummyDataForHW4 = [
    {
        "course": "CS 571 Database Management Systems",
        "img": dbms_img
    },
    {
        "course": "CS 535 Computer Network and Security",
        "img": cns_img
    },
    {
        "course": "CS 591 Software Project Management",
        "img": spm_img
    },
]
const Dashboard = () => {
    return (
        <div className="bg-darker w-screen h-screen flex justify-items-stretch">
            <div className="w-1/12 h-full">
                <LeftBar />
            </div>
            <div className="w-9/12 py-20 flex flex-col gap-20">
                <p className="text-white font-funky text-[40px]">Dashboard</p>
                <div className="flex gap-6 flex-wrap">
                    {
                        dummyDataForHW4.map((course, index) => {
                            return (
                                <Link key={index}  href={"/course"}>
                                    <div className="w-[250px] bg-dark flex flex-col justify-center items-center rounded-2xl gap-4 px-6 py-5">
                                        <p className="text-white font-funky text-xl text-center">{course.course}</p>
                                        <Image alt="cs571" src={course.img} width={200} height={100} />
                                        <div className="flex gap-5 w-full justify-center">
                                            <CapIcon />
                                            <BookIcon />
                                            <SpeakerIcon />
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }



                </div>
            </div>
            <div className="w-2/12 bg-dark h-full">
                <Todo />
            </div>
        </div>
    );
}

export default Dashboard;