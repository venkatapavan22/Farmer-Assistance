import express from 'express';
import path from 'path';
import { addProduct, deleteProductById, getProductById, getProducts, upload } from '../Controllers/productController.js';
// import { authenticateToken } from '../Middlewares/verifyToken.js';

const router = express.Router();

router.post('/add', upload.array('images', 5), addProduct);
router.get('/get', getProducts);
router.get('/get/:id', getProductById);
router.delete('/delete/:id', deleteProductById);
router.get('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
})

export default router;
