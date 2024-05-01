import LeftBar from "@/app/dashboard/_components/LeftBar";
import Image from "next/image";
import CapIcon from "../_components/CapIcon";
import BookIcon from "../_components/BookIcon";
import SpeakerIcon from "../_components/SpeakerIcon";
import Todo from "../_components/Todo";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchUserCourses } from "@/lib/actions/user.action";

const Dashboard = async ({ params }: { params: { dashboard: string } }) => {
    console.log(params.dashboard)
    const courses = await fetchUserCourses(params.dashboard)

    return (
        <div className="bg-darker w-screen h-screen flex justify-items-stretch">
            <div className="w-1/12 h-full">
                <LeftBar />
            </div>
            <div className="w-9/12 py-20 flex flex-col gap-20">
                <p className="text-white font-funky text-[40px]">Dashboard</p>
                <div className="flex gap-6 flex-wrap">
                    {
                        courses && courses.map((course, index) => {
                            return (
                                <Link key={index} href={`/course/${(course._id)}/${params.dashboard}/`}>
                                    <div className="w-[250px] bg-dark flex flex-col justify-center items-center rounded-2xl gap-4 px-6 py-5">
                                        <p className="text-white font-funky text-xl text-center">{course.courseID} {course.courseTitle} : {course.section}</p>
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