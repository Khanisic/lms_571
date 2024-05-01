"use server"

import Course from "../models/course.model";
import User from "../models/user.model";
import dbConnect from "../mongoose";



export async function createUser(values: any) {
    try {
        dbConnect();
        let courses = [];

        for (let i = 0; i < values.courses.length; i++) {
            let courseToAdd = await Course.findOne(
                {
                    courseID: values.courses[i].split(' : ')[0],
                    section: values.courses[i].split(' : ')[1]
                }
            )
            courses.push(courseToAdd._id)
        }
        
        const currentUsers = await User.find()
        const newUser = await User.create({
            userID: currentUsers.length + 35180,
            firstName: values.firstName,
            lastName: values.lastName,
            role: !values.role ? 'Professor' : 'Student',
            courses: courses
        })

        for (let i = 0; i < values.courses.length; i++) {
            let courseToUpdate = await Course.findOne(
                {
                    courseID: values.courses[i].split(' : ')[0],
                    section: values.courses[i].split(' : ')[1]
                }
            )

            courseToUpdate.people.push(newUser._id)
            await courseToUpdate.save();
        }

    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
}

export async function fetchUserDetails(id: string) {
    try {

        dbConnect();

        const user = await User.findOne({
            userID: id
        });

        return {
            userID: user.userID,
            firstName: user.firstName,
            role: user.role,
            lastName: user.lastName,
            courses: user.courses,
            id: user._id.toString()
        }

    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
}

export async function fetchUserDetailsByID(id: string) {
    try {

        dbConnect();

        const user = await User.findOne({
            _id: id
        });

        return {
            userID: user.userID,
            firstName: user.firstName,
            role: user.role,
            lastName: user.lastName,
            courses: user.courses,
            id: user._id.toString()
        }

    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
}

export async function fetchUserCourses(id: any) {
    try {
        let coursesToSend = [];
        dbConnect();
        console.log(id)
        const usersCourses: any[] = await User.find({
            _id: id
        });

        const fetchedCourses: any[] = usersCourses[0].courses;

        for (let i = 0; i < fetchedCourses.length; i++) {
            const c = await Course.findOne({
                _id: fetchedCourses[i]
            })

            console.log(c)
            coursesToSend.push(c)
        }
        return coursesToSend

    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
}