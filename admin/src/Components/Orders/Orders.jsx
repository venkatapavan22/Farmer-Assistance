import { useState, useEffect } from "react";
import { getOrders, updateOrderStatus } from "../../Services/api";
const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [totalOrders, setTotalOrders] = useState(0);
    const [pendingOrders, setPendingOrders] = useState(0);
    const [confirmedOrders, setConfirmedOrders] = useState(0);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getOrders();
                const sortedOrders = response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setOrders(sortedOrders);
                setTotalOrders(sortedOrders.length);
                setPendingOrders(sortedOrders.filter(order => order.status === 'Pending').length);
                setConfirmedOrders(sortedOrders.filter(order => order.status === 'Confirmed').length);
            } catch (error) {
                console.log("Error while fetching orders", error);
            }
        };
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const response = await updateOrderStatus(orderId, newStatus);
            if (response) {
                const updatedOrders = orders.map(order => 
                    order._id === orderId ? { ...order, status: newStatus } : order
                );
                setOrders(updatedOrders);
                setPendingOrders(updatedOrders.filter(order => order.status === 'Pending').length);
                alert("Order status changed successfully");
            }
        } catch (error) {
            console.log("Error while updating order status", error);
        }
    };



    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between">
                <h2 className="text-3xl font-bold mb-6">Orders</h2>
                <div className="flex justify-center gap-2">
                    <p className="text-lg mb-4">Total : <strong>{totalOrders}</strong></p>
                    <p className="text-lg mb-4">Pending : <strong>{pendingOrders}</strong></p>
                    <p className="text-lg mb-4">Confirmed : <strong>{confirmedOrders}</strong></p>
                </div>
            </div>
            <div className="items h-[73vh] overflow-y-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {orders.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
                    {orders.map(order => (
                        <div key={order._id} className="bg-white shadow-lg rounded-lg p-6">
                            <h3 className="font-semibold mb-2">Order Id: {order._id}</h3>
                            <p className="text-gray-700 mb-1"><strong>Customer Name:</strong> {order.user.userName}</p>
                            <div className="flex items-center gap-3">
                                <p className="text-gray-700 mb-1"><strong>Order Status:</strong></p>
                                <select
                                    className="border border-gray-300 rounded p-2"
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                            <p className="text-gray-700 mb-1"><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p className="text-gray-700 mb-1"><strong>Order Time:</strong> {new Date(order.createdAt).toLocaleTimeString()}</p>
                            <div className="h-40 overflow-y-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                                <p className="text-gray-700 mt-2"><strong>Items:</strong> {order.items.reduce((total, item) => total + item.quantity, 0)}</p>
                                {order.items.map(item => (
                                    <div key={item._id} className="border-t border-gray-200 pt-2">
                                        <p className="text-gray-700 mb-1"><strong>Product Name:</strong> {item.product.name}</p>
                                        <p className="text-gray-700 mb-1"><strong>Quantity:</strong> {item.quantity}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-gray-700 mb-2 border-t border-gray-200 pt-2">Payment Status: <strong className="text-green-500">{order.paymentStatus}</strong></p>
                            <p className="text-gray-700 mb-1 border-t border-gray-200 pt-2"><strong>Order Total:</strong> ₹{order.totalAmount}</p>
                            
                        </div>
                    ))}
                </div>
            ) : (
                <h2 className="text-xl font-semibold text-center text-gray-500">No Orders</h2>
            )}
            </div>
        </div>
    );
};

export default Orders;
