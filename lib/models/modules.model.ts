
import mongoose from "mongoose";

const modulesSchema = new mongoose.Schema({
    courseID: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Course' },
    module: {
        name: {
            type: String,
            required: true
        },
        attachments: [{
            type: String, required: true
        }]
    },

})

const Module = mongoose.models.Module || mongoose.model("Module", modulesSchema);

export default Module;