"use server"

import { revalidatePath } from "next/cache";
import Course from "../models/course.model";
import User from "../models/user.model";
import dbConnect from "../mongoose";
import Assessment from "../models/assessment.model";



export async function createCourse(values: any) {
    try {
        dbConnect();

        const courseExists = await Course.find(
            { courseID: values.courseID }
        )

        let section_id;
        if (courseExists.length > 0) {
            section_id = courseExists[courseExists.length - 1].section + 1;
        } else {
            section_id = 1;
        }

        const newCourse = await Course.create({
            courseTitle: values.title,
            img: values.img,
            section: section_id,
            courseID: values.courseID
        })

        return ({
            courseTitle: newCourse.title,
            img: newCourse.img,
            section: newCourse,
            courseID: newCourse.courseID
        })

    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
}

export async function fetchCourses() {
    try {
        dbConnect();

        const courses = await Course.find()
        return courses;

    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
}


export async function fetchCourseByID(id: string) {
    try {
        dbConnect();
        let people = []
        let assessments = [];
        const course = await Course.findOne({
            _id: id
        })
        if (course.assessment.length > 0) {

            for (let i = 0; i < course.assessment.length; i++) {
                let assessmentFound = await Assessment.findOne({
                    _id: course.assessment[i]
                })

                assessments.push({
                    category: assessmentFound.assessment[0].category,
                    weightage: assessmentFound.assessment[0].weightage,
                    id: assessmentFound._id,
                })
            }
        }

        for (let i = 0; i < course.people.length; i++) {
            const user = await User.findOne({
                _id: course.people[i]
            })

            people.push({
                firstName: user.firstName,
                lastName: user.lastName
            })
        }

        return {
            courseTitle: course.courseTitle,
            courseID: course.courseID,
            section: course.section,
            id: course._id,
            img: course.img,
            people: people,
            announcements: course.announcements,
            modules: course.modules,
            assessment: assessments
        };

    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
}


