import mongoose from "mongoose";

const EnrolSchema = mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },
        status:{
            type: String,
            
            
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            required: true
        },

    }
);

const Enrol = mongoose.model("Enrol", EnrolSchema);

export default Enrol;
