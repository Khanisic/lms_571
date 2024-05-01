import { fetchStudentsWithGrades, insertOrUpdateGrade, updateGrade } from "@/lib/actions/assessment.actions"
import { usePathname } from "next/navigation"
import { useState } from "react"

function AssessmentByProf({ user, assignment }: any) {
    const [students, setStudents] = useState([])
    console.log(students)
    const viewAssignments = (assignment) => {
        fetchStudentsWithGrades(assignment.assessmentId).then((res) => {
            setStudents(res)
        })
    }
    const pathname = usePathname()
    const [grade, setGrade] = useState("")
    const submitAssignment = (assignment, studentID) => {
        updateGrade(studentID, assignment.assessmentId, grade, pathname)
    }
    return (

        <div className='flex text-white font-chill flex-col gap-3'>
            <div className="flex justify-between">
                <p className="">{assignment.title}</p>
                <p className="mx-auto"> - /{assignment.max_marks}</p>
                <p onClick={() => { viewAssignments(assignment) }} className='bg-blood ml-auto px-4 rounded-md text-white hover:bg-secondary hover:text-dark duration-150 transition-all ease-in-out cursor-pointer'>View Students</p>
            </div>
            {
                students && students.map((stu, index) => {
                    return (
                        <div key={index} className="flex justify-between">
                            <p>{stu.firstName} {stu.lastName}</p>
                            {
                                stu.grade && stu.grade == -1 ?
                                    <div className="flex gap-3">
                                        <input onChange={(e) => { setGrade(e.target.value) }} className="outline-none bg-darker rounded-md px-3 text-center  w-[50px] font-chill text-white placeholder:text-gray-300" placeholder="0" type="text" />
                                        <p onClick={() => { submitAssignment(assignment, stu.studentId) }} className='bg-secondary ml-auto px-4 rounded-md text-white hover:bg-secondary hover:text-dark duration-150 transition-all ease-in-out cursor-pointer'>Submit Grade</p>
                                    </div>
                                    :
                                    <div>
                                        <p>{stu.grade}</p>
                                    </div>
                            }
                        </div>
                    )
                })

            }
        </div>

    )
}

export default AssessmentByProf