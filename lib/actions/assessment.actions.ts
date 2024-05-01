"use server"
import { revalidatePath } from "next/cache";
import Course from "../models/course.model";
import dbConnect from "../mongoose";
import Assessment from "../models/assessment.model";
import User from "../models/user.model";



export async function addCategory(id: string, section: string, category: string, weightage: string, path: string) {
    try {
        dbConnect();

        const course = await Course.findOne({
            courseID: id,
            section: section
        })
        console.log(course._id, category, parseInt(weightage))
        const newAssessment = await Assessment.create(
            {
                courseID: course._id,
                assessment: {
                    category: category,
                    weightage: parseInt(weightage)
                }
            }
        )

        course.assessment.push(newAssessment._id)
        course.save();

        console.log("Done")

        revalidatePath(path)

    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
}

export async function fetchAssessments(id: string) {
    try {
        dbConnect();

        let assessments = [];

        const course = await Course.findOne({
            _id: id,
        })

        if (course.assessment) {

            for (let i = 0; i < course.assessment.length; i++) {
                let assessmentFound = await Assessment.findOne({
                    _id: course.assessment[i]
                })
                assessments.push(assessmentFound.assessment)
            }
        }

        return assessments


    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
}


export async function addAssess(id: string, title: string, max: string, path: string) {
    try {
        dbConnect();

        const assessment = await Assessment.findOne({
            _id: id,
        })

        console.log(assessment.assessment[0])

        assessment.assessment[0].assessments.push({
            title: title,
            maximum_marks: max,
        })

        assessment.save()

        revalidatePath(path)

    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
}



export async function getInnerAssessments(id: string, title: string, max: string, info: string, path: string) {
    try {
        dbConnect();

        const assessment = await Assessment.findOne({
            _id: id,
        })

        console.log(assessment.assessment[0])

        assessment.assessment[0].assessments.push({
            title: title,
            maximum_marks: max,
        })

        assessment.save()

        revalidatePath(path)

    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
}


export async function fetchAssessmentDetails(assessmentIds: any[]) {
    try {
        const assessments = await Assessment.find({
            '_id': { $in: assessmentIds }
        }, {
            'assessment.assessments.title': 1,
            'assessment.assessments._id': 1,
            'assessment.assessments.grades': 1,
            'assessment.assessments.maximum_marks': 1,
        }).lean();

        let results = [];
        assessments.forEach(assessment => {
            assessment.assessment.forEach(category => {
                category.assessments.forEach(assess => {
                    results.push({
                        assessmentId: assess._id,
                        title: assess.title,
                        max_marks: assess.maximum_marks,
                        grades: assess.grades.map(grade => ({
                            grade: grade.grade,
                            studentId: grade.student,
                            studentFirstName: grade.student.firstName,
                            studentLastName: grade.student.lastName
                        }))
                    });
                });
            });
        });

        return results;
    } catch (error) {
        console.error('Failed to fetch assessment details:', error);
        throw error;
    }
}


export async function insertOrUpdateGrade(studentId: string, assessmentId: string, newGrade: number, path: string) {
    try {

        const result = await Assessment.updateOne(
            { 'assessment.assessments._id': assessmentId },
            {
                $push: {
                    'assessment.$.assessments.$[assess].grades': {
                        student: studentId,
                        grade: newGrade
                    }
                }
            },
            {
                arrayFilters: [{ 'assess._id': assessmentId }]
            }
        );
        if (result.modifiedCount === 0) {
            console.log("No grade added");
            return { success: false, message: "No grade added" };
        }

        console.log("Grade added successfully");
        revalidatePath(path); // Make sure revalidatePath function is correctly 

    } catch (error) {
        console.error('Failed to update grade:', error);
        throw error;
    }
}


export async function fetchStudentsWithGrades(assessmentId) {
    try {

        // Find the assessment and populate the student details for each grade
        const assessment = await Assessment.findOne(
            { 'assessment.assessments._id': assessmentId }
        ).populate({
            path: 'assessment.assessments.grades.student',
            select: 'firstName lastName userID -_id'  // Adjust according to your schema if userID should be included
        }).exec();

        if (!assessment) {
            console.log("Assessment not found");
            return { success: false, message: "Assessment not found" };
        }

        // Extract student details from the grades array
        let students = [];
        assessment.assessment.forEach(cat => {
            cat.assessments.forEach(ass => {
                if (ass._id.equals(assessmentId)) {
                    ass.grades.forEach(grade => {
                        students.push({
                            firstName: grade.student.firstName,
                            lastName: grade.student.lastName,
                            studentId: grade.student.userID,
                            grade: grade.grade
                        });
                    });
                }
            });
        });
        console.log(students)
        return students;
    } catch (error) {
        console.error('Failed to fetch students:', error);
        throw error;
    }
}



export async function updateGrade(studentId: string, assessmentId: string, newGrade: number, path: string) {
    try {



        const student = await User.findOne({
            userID: studentId
        })


        console.log(student._id, newGrade)

        const result = await Assessment.updateOne(
            {
                'assessment.assessments._id': assessmentId,
                'assessment.assessments.grades.student': student._id
            },
            {
                $set: {
                    'assessment.$[].assessments.$[assess].grades.$[grade].grade': newGrade
                }
            },
            {
                arrayFilters: [
                    { 'assess._id': assessmentId },
                    { 'grade.student': student._id }
                ]
            }
        );
        if (result.modifiedCount === 0) {
            console.log("No grade added");
            return { success: false, message: "No grade added" };
        }

        console.log("Grade added successfully");
        revalidatePath(path); // Make sure revalidatePath function is correctly 

    } catch (error) {
        console.error('Failed to update grade:', error);
        throw error;
    }
}


export async function fetchGradesForStudent(studentId: string, assessmentIds: string[]) {
    try {

        const assessments = await Assessment.find({
            'assessment.assessments._id': { $in: assessmentIds }
        });

        // Filter grades for the specified student from the found assessments
        const grades = [];
        assessments.forEach(assessment => {
            assessment.assessment.forEach(cat => {
                cat.assessments.forEach(ass => {
                    const grade = ass.grades.find(g => g.student.toString() === studentId);
                    if (grade) {
                        grades.push({
                            assessmentId: ass._id,
                            grade: grade.grade
                        });
                    }
                });
            });
        });

        console.log(grades);
        return grades;
    } catch (error) {
        console.error('Failed to fetch grades:', error);
        throw error;
    }
}
