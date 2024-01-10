import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
    {
        courseName: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        description: {
            type: String,
            // required: true
        },
        enrollment: {
            type: Number,
            default: 0
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            required: true
        },

    }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
