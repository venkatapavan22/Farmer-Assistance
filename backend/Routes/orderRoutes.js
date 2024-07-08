import express from 'express';
import { createOrder, getOrderById, getOrders, getOrdersByUserId, updateOrderStatus } from '../Controllers/orderController.js';


const router = express.Router();
router.post('/create',createOrder)
router.get('/getOrders',getOrders)
router.get('/getOrderById/:id',getOrderById)
router.get('/getOrdersByUser/:userId',getOrdersByUserId);
router.put('/updateStatus/:orderId',updateOrderStatus);

export default router;