import multer from "multer";
import FarmProducts from "../Models/Products.js";
import path from 'path';


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
    try {
        const { 
            name, sku, expiryDate, composition, applicationMethod, category, manufacturer, price, description,
            targetPestsDiseases, nutrients, applicationFrequency, applicationSeason, 
            safetyInstructions, storageInstructions 
        } = req.body;
        let images = [];
        if (req.files) {
            images = req.files.map(file => file.filename);
        }
        const newProduct = new FarmProducts({
            name, sku, expiryDate, composition, applicationMethod, category, manufacturer, price, description,
            targetPestsDiseases, nutrients, applicationFrequency, applicationSeason, 
            safetyInstructions, storageInstructions, images
        });
        await newProduct.save();
        return res.status(200).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await FarmProducts.find(); 
        return res.status(200).json({ products });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await FarmProducts.findById(req.params.id);
        return res.status(200).json({ product });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteProductById = async (req, res) => {
    try {
        await FarmProducts.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export { addProduct, upload, getProducts, getProductById, deleteProductById };
