import mongoose from "mongoose";

const CategoriesSchema = new mongoose.Schema(
    {
        name: {
            required: true,
            default: ''
        },
    },
    {
        collection: 'Categories',
        versionKey: false,
        timestamp: true
    }
);

export default mongoose.model("Categories", CategoriesSchema);