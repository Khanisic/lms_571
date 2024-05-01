import mongoose from "mongoose";


const assessmentSchema = new mongoose.Schema({
    courseID: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Course' },
    assessment: [{
        category: { type: String, required: true },
        weightage: { type: Number, required: true },
        assessments: [{
            title: { type: String },
            maximum_marks: { type: Number },
            info: { type: String },
            grades: [{
                student: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'User' },
                grade: { type: Number },
            }],
        }],
    }],
})

const Assessment = mongoose.models.Assessment || mongoose.model("Assessment", assessmentSchema);

export default Assessment;