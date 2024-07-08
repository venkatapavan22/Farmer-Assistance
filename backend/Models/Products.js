import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Fertilizer', 'Pesticide','Seeds','Tools','Others']
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: String,
        required: true,
    },
    manufacturer: {
        type: String,
        required: true,
        trim: true
    },
    sku: {
        type: String,
        unique: true,
        trim: true
    },
    expiryDate: {
        type: Date,
        required: true,
    },
    composition: {
        type: [String],
    },
    applicationMethod: {
        type: String,
        required: true,
        trim: true
    },
    targetPestsDiseases: {
        type: [String],
        required: function () { return this.category === 'Pesticide'; }
    },
    nutrients: {
        type: [String],
        required: function () { return this.category === 'Fertilizer'; }
    },
    applicationFrequency: {
        type: String,
        required: true,
        trim: true
    },
    applicationSeason: {
        type: String,
        required: true,
        trim: true
    },
    safetyInstructions: {
        type: String,
        required: true,
        trim: true
    },
    storageInstructions: {
        type: String,
        required: true,
        trim: true
    },
    images: {
        type: [String],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const FarmProducts = mongoose.model('FarmProduct', productSchema);

export default FarmProducts;
