import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    role: { type: String, required: true, enum: ['Student', 'Professor'] },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    bio: { type: String, required: false },
    courses: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Course' }]
})


const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
