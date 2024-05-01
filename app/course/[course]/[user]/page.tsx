
import Image from "next/image";
import { Metadata } from "next";
import LeftBar from "@/app/dashboard/_components/LeftBar";
import PeopleIcon from "../../_components/PeopleIcon";
import Introduction from "../../_components/Introduction";
import Assignments from "../../_components/Assignments";
import Modules from "../../_components/Modules";
import Announcements from "../../_components/Announcements";

import { fetchCourseByID } from "@/lib/actions/course.actions";
import { fetchUserDetails, fetchUserDetailsByID } from "@/lib/actions/user.action";
import RightMain from "../../_components/RightMain";
import AddCategory from "../../_components/AddCategory";
import { fetchAssessmentDetails, fetchAssessments } from "@/lib/actions/assessment.actions";




const Course = async ({ params }: { params: { course: string, user: string } }) => {


  let isProfessor = (false)
  const { course, user } = params;


  const userDetails = await fetchUserDetailsByID(user)
  const courseDetails = await fetchCourseByID(course)
  const allAssessments = await fetchAssessmentDetails(courseDetails.assessment.map((ass) => ass.id))

  return (
    <div className="bg-darker w-full h-full min-h-screen flex justify-items-stretch">
      <title>{courseDetails.courseID}</title>
      <div className="w-1/12 h-full">
        <LeftBar />
      </div>
      <div className="w-5/12 h-full py-10 flex flex-col gap-5">
        <div className="flex gap-3">
          <div className="flex gap-1 justify-center items-center">
            <div className="w-10 h-10 bg-teal-700 rounded-full"></div>
            <div className="font-chill text-white">
              <p>{userDetails.firstName} {userDetails.lastName}</p>
            </div>
          </div>

        </div>


        <p className="text-4xl font-funky text-white">{courseDetails.courseID} {courseDetails.courseTitle} : {courseDetails.section}</p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2  pr-10">
            {
              courseDetails.assessment.map((assessment, index) => {
                return (
                  <div key={index} className="bg-blood w-[150px]  text-white font-chill text-center text-xl px-4 py-2 rounded-xl">
                    <p>{assessment.category}</p>
                    <p>{assessment.weightage}%</p>
                  </div>
                )
              })
            }



          </div>
          {
            userDetails.role == 'Professor' &&
            <div className="flex gap-3 items-center">
              <AddCategory courseID={`${courseDetails.courseID} - ${courseDetails.section}`} />
            </div>
          }
        </div>
        <div className="pr-10 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <p className="font-funky text-white text-2xl">People/Classmates</p>
            <PeopleIcon />
          </div>

          <div className="flex flex-col gap-3">
            {
              courseDetails && courseDetails.people && courseDetails.people.map((user, index) => {
                return (
                  <div key={index} className="flex gap-2 items-center">
                    <div className="w-10 h-10 bg-teal-700 rounded-full"></div>
                    <div className="font-chill text-white">
                      <p>{user.firstName} {user.lastName}</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      <div className="w-6/12 h-full py-10 gap-5">
        <RightMain user={userDetails} img={courseDetails.img} role={userDetails.role} assessment={courseDetails.assessment} allAssessments={allAssessments} />
      </div>
    </div>
  );
}

export default Course;