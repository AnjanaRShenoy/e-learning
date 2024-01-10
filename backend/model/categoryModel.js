import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
    {
        categoryName: {
            type: String,
            required: true
        },
        number: {
            type: Number,
            default: 0
        }
    }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
