"use client"

import Image from "next/image";
import LeftBar from "../dashboard/_components/LeftBar";
import PeopleIcon from "./_components/PeopleIcon";
import { useState } from "react";
import Introduction from "./_components/Introduction";
import Assignments from "./_components/Assignments";
import Quizzes from "./_components/Quizzes";
import Modules from "./_components/Modules";
import Announcements from "./_components/Announcements";
import { Metadata } from "next";

const list = ["Introduction", "Assignments", "Quizzes", "Modules", "Announcements"]

const Course = () => {
    const [selectedItem, setSelectedItem] = useState("Introduction")
    return (
        <div className="bg-darker w-screen h-screen flex justify-items-stretch">
            <title>CS 571 DBMS</title>
            <div className="w-1/12 h-full">
                <LeftBar />
            </div>
            <div className="w-5/12 h-full py-10 flex flex-col gap-5">
                <div className="flex gap-3">
                    <div className="flex gap-1 justify-center items-center">
                        <div className="w-10 h-10 bg-teal-700 rounded-full"></div>
                        <div className="font-chill text-white">
                            <p>Abdul Moid Khan Mohammed</p>
                            <p>Msc in Computer Science</p>
                        </div>
                    </div>

                    <div className="font-chill px-6 text-center text-dark bg-white rounded-lg py-2 flex flex-col justify-center ">
                        <p className="text-3xl font-semibold">A</p>
                        <p className="font-chill">90.23%</p>
                    </div>
                </div>


                <p className="text-4xl font-funky text-white">CS 571 Database Management Systems</p>
                <div className="flex flex-wrap gap-2  pr-10">
                    <div className="bg-blood w-[150px]  text-white font-chill text-center text-xl px-4 py-2 rounded-xl">
                        <p>Assignments</p>
                        <p>25%</p>
                    </div>
                    <div className="bg-blood w-[150px]  text-white font-chill text-center text-xl px-4 py-2 rounded-xl">
                        <p>Attendance</p>
                        <p>5%</p>
                    </div>
                    <div className="bg-blood w-[150px]  text-white font-chill text-center text-xl px-4 py-2 rounded-xl">
                        <p>Midterm</p>
                        <p>20%</p>
                    </div>
                    <div className="bg-blood w-[150px]  text-white font-chill text-center text-xl px-4 py-2 rounded-xl">
                        <p>Finals</p>
                        <p>25%</p>
                    </div>
                    <div className="bg-blood w-[150px]  text-white font-chill text-center text-xl px-4 py-2 rounded-xl">
                        <p>Quizzes</p>
                        <p>20%</p>
                    </div>
                    <div className="bg-blood w-[150px]  text-white font-chill text-center text-xl px-4 py-2 rounded-xl">
                        <p>In Class</p>
                        <p>5%</p>
                    </div>
                </div>
                <div className="pr-10 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <p className="font-funky text-white text-2xl">People/Classmates</p>
                        <PeopleIcon />
                    </div>

                    <div className="flex flex-col gap-3">

                        <div className="flex gap-2 items-center">
                            <div className="w-10 h-10 bg-teal-700 rounded-full"></div>
                            <div className="font-chill text-white">
                                <p>Abdul Moid Khan Mohammed</p>
                            </div>
                        </div>

                        <div className="flex gap-2 items-center">
                            <div className="w-10 h-10 bg-teal-700 rounded-full"></div>
                            <div className="font-chill text-white">
                                <p>Abdul Moid Khan Mohammed</p>
                            </div>
                        </div>

                        <div className="flex gap-2 items-center">
                            <div className="w-10 h-10 bg-teal-700 rounded-full"></div>
                            <div className="font-chill text-white">
                                <p>Abdul Moid Khan Mohammed</p>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="w-10 h-10 bg-teal-700 rounded-full"></div>
                            <div className="font-chill text-white">
                                <p>Abdul Moid Khan Mohammed</p>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="w-10 h-10 bg-teal-700 rounded-full"></div>
                            <div className="font-chill text-white">
                                <p>Abdul Moid Khan Mohammed</p>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="w-10 h-10 bg-teal-700 rounded-full"></div>
                            <div className="font-chill text-white">
                                <p>Abdul Moid Khan Mohammed</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="w-6/12 h-full py-10 gap-5">
                <div className="flex gap-3 flex-wrap">
                    {list.map((item, index) => {
                        return (
                            <div onClick={() => { setSelectedItem(item) }} key={index} className={` ${selectedItem == item && "bg-blood text-dark"} cursor-pointer bg-dark font-funky transition-all ease-in-out duration-200 text-xl px-4 py-2 rounded-md hover:bg-blood group text-white`}>
                                <p className="group-hover:text-dark">{item}</p>
                            </div>
                        )
                    })}
                </div>
                {
                    selectedItem == "Introduction" && <Introduction />
                }
                {
                    selectedItem == "Assignments" && <Assignments />
                }
                {
                    selectedItem == "Quizzes" && <Quizzes />
                }
                {
                    selectedItem == "Modules" && <Modules />
                }
                {
                    selectedItem == "Announcements" && <Announcements />
                }
            </div>
        </div>
    );
}

export default Course;