import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    image: {
        type: String, // URL or local path
    },
    // AdminJS upload metadata
    imageKey: String,
    imageBucket: String,
    imageMime: String,
    imageSize: Number,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },
    specifications: [{
        name: { type: String, required: true },
        value: { type: String, required: true },
    }],
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
