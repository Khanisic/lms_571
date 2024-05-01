"use client"

import { useState } from "react";
import AddUserForm from "./_components/AddUserForm";
import AddCourseForm from "./_components/AddCourseForm";

const list = ["User", "Course"]

const Admin = () => {

    const [selectedItem, setSelectedItem] = useState("User")
    return (
        <div className="bg-darker h-screen flex justify-items-stretch flex-col px-10">
            <p className="font-funky text-white text-4xl text-center py-4">Admin</p>
            <div className="flex gap-3 flex-wrap mb-10">
                {list.map((item, index) => {
                    return (
                        <div onClick={() => { setSelectedItem(item); }} key={index} className={` ${selectedItem == item && "bg-blood text-dark"} cursor-pointer bg-dark font-funky transition-all ease-in-out duration-200 text-xl px-4 py-2 rounded-md hover:bg-blood group text-white`}>
                            <p className="group-hover:text-dark">{item}</p>
                        </div>
                    )
                })}
            </div>

            {
                selectedItem == "User" && <AddUserForm />
            }
            {
                selectedItem == "Course" && <AddCourseForm />
            }
        </div>
    );
}

export default Admin;