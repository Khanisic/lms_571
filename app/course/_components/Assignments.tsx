import { fetchCourseByID } from "@/lib/actions/course.actions";
import AddCategory from "./AddCategory";
import AddAssignment from "./AddAssignment";
import { fetchStudentsWithGrades, insertOrUpdateGrade } from "@/lib/actions/assessment.actions";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AssessmentByProf from "./AssessmentByProf";


const Assignments = ({ user, assessment, role, allAssessments }: any) => {
  const pathname = usePathname()

  const submitAssignment = (assignment) => {
    insertOrUpdateGrade(user.id, assignment.assessmentId, -1, pathname)
  }

  if (role == 'Professor') {
    return (
      <div className='flex flex-col w-full pr-10 py-10 gap-3'>
        <AddAssignment assessment={assessment} />
        {
          allAssessments.map((assignment, index) => {
            return (
              <div key={index} className='bg-dark w-full py-3 px-4 rounded-lg '>
                <AssessmentByProf user={user} assignment={assignment} />
              </div>
            )
          })
        }
      </div>
    )
  }


  return (
    <div className='flex flex-col w-full pr-10 py-10 gap-3'>
      {
        allAssessments.map((assignment, index) => {
          return (
            <div key={index} className='bg-dark w-full py-3 px-4 rounded-lg '>
              <div className='flex text-white font-chill justify-between'>
                <p className="">{assignment.title}</p>
                <p className="mx-auto"> {assignment.grades.filter((grade) => grade.studentId.toString() == user.id)[0]?.grade > -1 ? assignment.grades.filter((grade) => grade.studentId.toString() == user.id)[0]?.grade : ' - '} /{assignment.max_marks}</p>
                {
                  assignment.grades.filter((grade) => grade.studentId.toString() == user.id)[0]?.grade >= -1 ?
                    <p className='bg-darker ml-auto px-4 rounded-md text-white hover:bg-secondary hover:text-dark disabled: duration-150 transition-all ease-in-out cursor-pointer'>Submitted</p>
                    :
                    <p onClick={() => { submitAssignment(assignment) }} className='bg-blood ml-auto px-4 rounded-md text-white hover:bg-secondary hover:text-dark duration-150 transition-all ease-in-out cursor-pointer'>Submit</p>
                }
              </div>

            </div>
          )
        })
      }
    </div>
  )
}

export default Assignments