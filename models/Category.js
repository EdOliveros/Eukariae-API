import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
    },
    // AdminJS upload metadata
    imageKey: String,
    imageBucket: String,
    imageMime: String,
    imageSize: Number,
}, {
    timestamps: true,
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
