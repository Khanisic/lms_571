"use client"
import { useState } from "react";
import Introduction from "./Introduction";
import Modules from "./Modules";
import Announcements from "./Announcements";
import Assignments from "./Assignments";

const list = ["Introduction", "Assessments", "Modules", "Announcements"]

function RightMain({ user, img, role, assessment, allAssessments }: any) {

    const [selectedItem, setSelectedItem] = useState("Introduction")

    return (
        <div className="w-full">
            <div className="flex gap-3 flex-wrap">
                {list.map((item, index) => {
                    return (
                        <div onClick={() => { setSelectedItem(item); }} key={index} className={` ${selectedItem == item && "bg-blood text-dark"} cursor-pointer bg-dark font-funky transition-all ease-in-out duration-200 text-xl px-4 py-2 rounded-md hover:bg-blood group text-white`}>
                            <p className="group-hover:text-dark">{item}</p>
                        </div>
                    )
                })}
            </div>
            {
                selectedItem == "Introduction" && <Introduction img={img} />
            }
            {
                selectedItem == "Assessments" && <Assignments user={user} role={role} allAssessments={allAssessments} assessment={assessment}  isProfessor />
            }
            {
                selectedItem == "Modules" && <Modules />
            }
            {
                selectedItem == "Announcements" && <Announcements />
            }
        </div>
    )
}

export default RightMain