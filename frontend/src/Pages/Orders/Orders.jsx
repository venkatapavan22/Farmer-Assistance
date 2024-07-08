import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../Redux/Actions/orderActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCheck } from "@fortawesome/free-solid-svg-icons";
import { CgShoppingBag } from "react-icons/cg";
import { SiStagetimer } from "react-icons/si";
import { FcCancel } from "react-icons/fc";
import { Link } from "react-router-dom";
import { API_URL } from "../../Services/api";
const Orders = () => {
    const userId = localStorage.getItem('userId');
    const dispatch = useDispatch();
    const orderData = useSelector((state) => state.getOrders);
    const { orders, error } = orderData;
    
    useEffect(() => {
        dispatch(getOrders(userId));
    }, [dispatch, userId]);
    return (
        <div className="w-full h-[85vh] mx-auto p-6 mt-1 bg-white overflow-y-scroll" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {error && <h1 className="pt-2">{error}</h1>}
            <h2 className="text-2xl font-bold mb-6 flex  items-center gap-2"><CgShoppingBag />Orders</h2>
            <div className="items h-[80vh] overflow-y-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                {orders && orders.length > 0 ? (
                    <div className="grid gap-6 grid-cols-1 ">
                        {orders.map(order => (
                            <div key={order._id} className="bg-white border rounded-lg p-6 text-md">
                                <div className="flex items-center mb-2">
                                    <span className="text-gray-700 mr-2"><strong>Order Status:</strong></span>
                                    <div className={`flex items-center text-sm font-semibold ${order.status === 'Pending' ? 'text-[#F7CB73]' : order.status === 'Confirmed' ? 'text-yellow-500' :order.status === 'Cancelled' ? 'text-red-500': 'text-green-500'}`}>
                                        {order.status === 'Pending' && <SiStagetimer className="mr-1" />}
                                        {order.status === 'Confirmed' && <FontAwesomeIcon icon={faClock} className="mr-1" />}
                                        {order.status === 'Completed' && <FontAwesomeIcon icon={faCheck} className="mr-1" />}
                                        {order.status === 'Cancelled' && <FcCancel  />}
                                        <span>{order.status}</span>
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-2"><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                                <p className="text-gray-700 mb-2"><strong>Order Time:</strong> {new Date(order.createdAt).toLocaleTimeString()}</p>
                                <div className="h-40 overflow-y-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                                    <p className="text-gray-700 mt-2"><strong>Items:</strong> {order.items.reduce((total, item) => total + item.quantity, 0)}</p>
                                    {order.items.map(item => (
                                        <Link to={`/shop/${item.product._id}`} key={item._id} className="flex items-center gap-4 border-t border-gray-200 pt-2 ">
                                            <div>
                                                <img src={`${API_URL}/uploads/${item.product.images[0]}`} alt="" className="w-10 h-10"/>
                                            </div>
                                            <div>
                                            <p className="text-gray-700 mb-1"><strong>Product Name:</strong> {item.product.name}</p>
                                            <p className="text-gray-700 mb-1"><strong>Quantity:</strong> {item.quantity}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                {/* <p className="text-gray-700 mb-2 border-t border-gray-200 pt-2">Payment Status: <strong className="text-green-500">{order.paymentStatus}</strong></p> */}
                                <p className="text-gray-700 mb-2 border-t border-gray-200 pt-2"><strong>Order Total:</strong> ₹{order.totalAmount}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center gap-4 m-auto">
                        <img src="https://media.istockphoto.com/id/861576608/vector/empty-shopping-bag-icon-online-business-vector-icon-template.jpg?s=612x612&w=0&k=20&c=I7MbHHcjhRH4Dy0NVpf4ZN4gn8FVDnwn99YdRW2x5k0=" alt="img" className="w-80 h-80" />
                        <h2 className="text-xl font-semibold text-center text-gray-500">No Orders Yet </h2>
                        <Link to='/shop' className="py-1 px-2 bg-orange-500 rounded-md text-white">Shop Now</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Orders
