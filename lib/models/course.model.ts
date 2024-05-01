import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseTitle: { type: String, required: true },
    courseID: { type: String, required: true },
    section: { type: Number, required: true },
    syllabus: { type: String, required: false },
    img: { type: String, required: true },
    people: [{ type: String, required: false }],
    announcements: [{ type: String, required: false }],
    introduction: { type: String, required: false },
    modules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: false }],
    assessment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: false }],
})


const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;