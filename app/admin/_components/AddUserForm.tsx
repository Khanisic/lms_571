"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { fetchCourses } from "@/lib/actions/course.actions";
import Down from "./Down";
import Trash from "./Trash";
import { createUser } from "@/lib/actions/user.action";


const AddUserForm = () => {

    const [userFormValues, setUserFormValues] = useState({
        firstName: "",
        lastName: "",
    })
    const [selectedCourses, setSelectedCourses] = useState<any[]>([]);
    const [role, setRole] = useState(false)

    console.log(selectedCourses)
    const [courses, setCourses] = useState<any[]>([]);
    const [openDropdown, setOpenDropdown] = useState(false)
    useEffect(() => {
        fetchCourses().then((fetchedCourses: any[]) => {
            const plainCourses = fetchedCourses.map(course => ({
                _id: course._id.toString(), // Convert ObjectId to string
                courseTitle: course.courseTitle,
                courseID: course.courseID,
                section: course.section,
                img: course.img,
                people: course.people,
                announcements: course.announcements,
                modules: course.modules,
                assessment: course.assessment,
                __v: course.__v
            }));
            setCourses(plainCourses);
        })
    }, [])
    console.log(courses)
    const onSubmit = async () => {
        await createUser({ ...userFormValues, role, courses: selectedCourses }).then((course) => {
            alert("User created!")
        });
    };
    console.log(role)
    return (
        <div className="flex flex-col">
            <p className="font-chill text-white text-2xl">Add a user</p>
            <div className="flex flex-col gap-2 mt-4">
                <div className="flex gap-3  items-start ">
                    <div className="flex flex-col gap-2">
                        <label className="text-white font-chill">First Name:</label>
                        <input onChange={(e) => { setUserFormValues({ ...userFormValues, firstName: e.target.value }) }} className="outline-none bg-secondary rounded-md px-3 py-2 w-[250px] font-chill text-white" placeholder="Enter first name" type="text" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-white font-chill">Last Name:</label>
                        <input onChange={(e) => { setUserFormValues({ ...userFormValues, lastName: e.target.value }) }} className="outline-none bg-secondary rounded-md px-3 py-2 w-[250px] font-chill text-white" placeholder="Enter last name" type="text" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-white font-chill">Courses Selected:</label>
                        <div className="flex gap-1">
                            {
                                selectedCourses.map((course, index) => {
                                    return (
                                        <div onClick={() => {
                                            setSelectedCourses(currentSelectedCourses =>
                                                currentSelectedCourses.filter(sc => sc !== course)
                                            );
                                        }} key={index} className="relative w-[85px] group transition-all duration-300 ease-in-out ">
                                            <p className="bg-blood rounded-lg font-chill text-white w-full text-center px-2 py-1 cursor-pointer ">{course}</p>
                                            <div className="hidden group-hover:flex h-full rounded-lg bg-opacity-85 transition-all duration-300 ease-in-out cursor-pointer absolute top-0 bg-slate-500 w-full left-0  justify-center items-center"><Trash /></div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-white font-chill ">Role:</label>
                        <div className="flex gap-1">
                            <p onClick={() => { setRole(false) }} className={` ${!role ? 'bg-blood' : 'bg-dark'}  text-white font-chill px-2 py-1 rounded-lg cursor-pointer`}>Faculty</p>
                            <p onClick={() => { setRole(true) }} className={` ${role ? 'bg-blood' : 'bg-dark'}  text-white font-chill px-2 py-1 rounded-lg cursor-pointer`}>Student</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div onClick={() => { setOpenDropdown(!openDropdown) }} className="flex gap-2 items-center mb-2">
                        <p className="text-white font-chill cursor-pointer">Select courses:</p>
                        <Down />
                    </div>
                    {
                        openDropdown &&
                        <div className="bg-dark flex flex-col gap-2 px-4 py-4 rounded-md w-fit">
                            {
                                courses && courses.length > 0 && courses.map((course, index) => {
                                    return (
                                        <div onClick={() => {
                                            setSelectedCourses([...selectedCourses, `${course.courseID} : ${course.section}`]);
                                        }} key={index} className="py-2 px-4 font-chill flex text-white hover:bg-blood rounded-md transition-all duration-200 ease-in-out cursor-pointer">
                                            <p className="overflow-ellipsis">{course.courseID} : {course.section}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
                <div onClick={() => onSubmit()} className=" bg-blood font-funky px-8 py-1 text-white text-xl rounded-md w-fit hover:bg-secondary transition-all duration-300 ease-in-out cursor-pointer">Add</div>
            </div>
        </div>
    );
}

export default AddUserForm;