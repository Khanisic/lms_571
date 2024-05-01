"use client"
import { addCategory } from '@/lib/actions/assessment.actions';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
interface AddCategoryProps {
    courseID: string;
}

function AddCategory({ courseID }: AddCategoryProps) {
    const pathname = usePathname();
    const [courseFormValues, setCourseFormValues] = useState({
        category: "",
        weightage: ""
    })
    
    const submitWeightage = async () => {
        // console.log(courseID.split(" - ")[0])
        // console.log(courseID.split(" - ")[1])
        await addCategory(courseID.split(" - ")[0], courseID.split(" - ")[1], courseFormValues.category, courseFormValues.weightage, pathname)
    }

    return (
        <div className='flex gap-4'>
            <div className="flex flex-col gap-2">
                <label className="text-white font-chill">Category:</label>
                <input onChange={(e) => { setCourseFormValues({ ...courseFormValues, category: e.target.value }) }} className="outline-none bg-secondary rounded-md px-3 py-2 w-[250px] font-chill text-white placeholder:text-gray-300" placeholder="Quizzes" type="text" />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-white font-chill">Weightage:</label>
                <input onChange={(e) => { setCourseFormValues({ ...courseFormValues, weightage: e.target.value }) }} className="outline-none bg-secondary rounded-md px-3 py-2 w-[50px] font-chill text-white placeholder:text-gray-300" placeholder="12%" type="text" />
            </div>
            <p onClick={() => { submitWeightage() }} className="bg-blood w-8 h-8 cursor-pointer text-white font-chill text-center text-xl rounded-xl">+</p>
        </div>
    )
}

export default AddCategory