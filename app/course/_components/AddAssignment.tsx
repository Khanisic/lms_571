"use client"
import { addAssess } from '@/lib/actions/assessment.actions'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

function AddAssignment({ assessment }: any) {

    const pathname = usePathname()

    const [courseFormValues, setCourseFormValues] = useState({
        title: "",
        maximum_marks: "",
    })

    const addAssessment = () => {
        addAssess(category, courseFormValues.title, courseFormValues.maximum_marks, pathname)
    }
    const [category, setCategory] = useState("")

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex flex-col gap-2">
                <label className="text-white font-chill">Category:</label>
                <div className='flex gap-2'>
                    {
                        assessment.map((assess : any, index : any) => {
                            return (
                                <p key={index} onClick={() => { setCategory(assess.id) }} className={` ${category == assess.id ? 'bg-blood' : 'bg-dark'}  text-white font-chill px-2 py-1 rounded-lg cursor-pointer`}>{assess.category}</p>

                            )
                        })
                    }
                </div>
            </div>
            <div className='flex gap-4 items-end'>
                <div className="flex flex-col gap-2">
                    <label className="text-white font-chill">Title:</label>
                    <input onChange={(e) => { setCourseFormValues({ ...courseFormValues, title: e.target.value }) }} className="outline-none bg-secondary rounded-md px-3 py-2 w-[250px] font-chill text-white placeholder:text-gray-300" placeholder="Homework - 4" type="text" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-white font-chill">Max marks:</label>
                    <input onChange={(e) => { setCourseFormValues({ ...courseFormValues, maximum_marks: e.target.value }) }} className="outline-none bg-secondary rounded-md px-3 py-2 w-[50px] font-chill text-white placeholder:text-gray-300" placeholder="50" type="text" />
                </div>
            </div>
            <p onClick={() => { addAssessment() }} className="bg-blood w-fit px-4 py-1 cursor-pointer text-white font-chill text-center text-xl rounded-xl">Add assessment</p>
        </div>
    )
}

export default AddAssignment