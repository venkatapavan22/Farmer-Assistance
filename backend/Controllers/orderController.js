import Order from "../Models/Orders.js";


export const createOrder = async (req, res) => {
    try {
        const {items,totalAmount} = req.body;
        const userId = req.body.userId || req.userId;
        if (!userId) {
            throw new Error('User ID is required.');
        }
        const order = new Order({
            user: userId,
            items,
            totalAmount
        });
        await order.save();
        return res.status(201).json({message: 'Order created successfully', order});
    } catch (error) {
        return res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
}


export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find(); 
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch order', error: error.message });
    }
}

export const getOrdersByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const orders = (await Order.find({ user: userId }).populate('user', 'username').populate('items.product', 'name price images'));
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
};


export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(orderId, 
            { 
                status, 
            }, 
            { new: true });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to update order status', error: error.message });
    }
};