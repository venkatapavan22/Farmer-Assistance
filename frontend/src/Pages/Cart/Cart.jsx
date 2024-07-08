import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TiDelete } from "react-icons/ti";
import { removeFromCart, updateCart } from '../../Redux/Actions/cartActions';
import { API_URL, createOrder } from "../../Services/api";
import { IoBagHandleSharp } from "react-icons/io5";
import { DataContext } from '../../Context/DataProvider';

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.getCartItems);
    const { cartItems } = cart;
    const navigate = useNavigate();
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);
    const {account} = useContext(DataContext)

    useEffect(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        if (savedCartItems) {
            dispatch({ type: 'GET_CART_SUCCESS', payload: JSON.parse(savedCartItems) });
        } else {
            dispatch({ type: 'GET_CART_SUCCESS', payload: [] });
        }
    }, [dispatch]);

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
        localStorage.removeItem('cartItems');
    };

    const handleQuantityChange = (id, quantity) => {
        if (quantity < 1) return;
        dispatch(updateCart(id, quantity));
    };

    const handleApplyCoupon = () => {
        if (coupon === 'TRYNEW') {
            setDiscount(0.35);
        } else if (coupon === 'Welcome') {
            setDiscount(0.15);
        } else {
            setDiscount(0.01);
        }
    };

    const itemTotal = cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
    const deliveryFee = cartItems.length > 0 ? 49 : 0;
    const platformFee = cartItems.length > 0 ? 19 : 0;
    const discountAmount = itemTotal * discount;
    const totalToPay = itemTotal + deliveryFee + platformFee - discountAmount;

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const handleProceedToPay = async () => {
        if(!account){
            navigate('/login')
            return
        }
        const orderItems = cartItems.map(item => ({
            product: item._id,
            quantity: item.quantity,
            price: parseFloat(item.price) * item.quantity
        }));

        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        if (cartItems.length === 0) {
            console.error('Cart is empty');
            return;
        }
        const orderData = {
            userId,
            items: orderItems,
            totalAmount: totalToPay
        };
        console.log('Order Data:', orderData);
        try {
            const orderResponse = await createOrder(orderData, token);
            console.log('Order created:', orderResponse);
            alert('Order created successfully! Proceed to payment.');
            navigate('/order-success');
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (
        <div className="w-full h-screen px-3 bg-[#F3F4F6] md:px-40">
            <div className='flex flex-col lg:flex-row justify-between gap-8 pt-20 '>
                <div className='w-full lg:w-3/5 bg-white rounded-md shadow-md px-4'>
                    <div className='flex justify-between px-4 py-4 items-center'>
                        <h2 className='text-lg font-semibold flex justify-center items-center gap-2'><IoBagHandleSharp className='text-2xl' />Shopping Cart</h2>
                        <p className='text-md font-medium'> {cartItems.length} <span>{cartItems.length === 1 ? 'Item' : 'Items'} </span></p>
                    </div>
                    <div className='hidden md:flex justify-center gap-20 text-gray-500 py-4 border-t '>
                        <h2></h2>
                        <h2 >Product Details</h2>
                        <h2 className='pl-20'>Price</h2>
                        <h2>Quantity</h2>
                        
                    </div>
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <div key={item._id} className='flex flex-col md:flex-row justify-between items-center border p-4 py-4 rounded-md my-4'>
                                <div className='flex items-center'>
                                    {item.images.length > 0 && (
                                        <img src={`${API_URL}/uploads/${item.images[0]}`} alt={item.name} className='w-20 h-20 object-cover rounded-md bg-none' />
                                    )}
                                    <div className='ml-4'>
                                        <h3 className='text-lg font-semibold'>{item.name}</h3>
                                        <p className='text-sm text-gray-500'>Category - {item.category}</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-8 mt-4 md:mt-0'>
                                    <p className='text-lg font-semibold text-gray-700 mr-4'>₹{parseFloat(item.price).toFixed(2)}</p>
                                    <div className='flex'>
                                    <button onClick={() => handleQuantityChange(item._id, item.quantity - 1)} className='bg-gray-300 text-md px-2'>-</button>
                                    <p className='mx-2'>{item.quantity}</p>
                                    <button onClick={() => handleQuantityChange(item._id, item.quantity + 1)} className='bg-gray-300 text-md px-2'>+</button>
                                    </div>
                                    <button onClick={() => handleRemoveFromCart(item._id)} className='ml-4'>
                                        <TiDelete className='text-2xl text-red-500' />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='flex flex-col justify-center items-center m-auto pt-8'>
                            <p className='text-gray-500 text-center'>Your cart is empty</p>
                            <img src="https://cdni.iconscout.com/illustration/premium/thumb/emptybag-8316260-6632280.png?f=webp" alt="emptycart" className='w-40 h-40' />
                        </div>
                    )}
                </div>
                <div className='w-full lg:w-2/5'>
                    <div className='mb-4 bg-white p-4 shadow-md rounded-lg'>
                        <h3 className='text-md font-semibold mb-4'>Apply Coupons</h3>
                        <div className='flex items-center'>
                            <input
                                type='text'
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                                placeholder='Enter coupon code'
                                className='flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
                            />
                            <button onClick={handleApplyCoupon} className='bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-r-lg'>APPLY</button>
                        </div>
                    </div>
                    {discountAmount > 0 && (
                            <p className='text-green-600 font-semibold my-4 text-center'>
                                Yay! You saved ₹{discountAmount.toFixed(2)} on this Order!
                            </p>
                        )}
                    <div className='bg-white p-4 shadow-md rounded-lg'>
                        <h3 className='text-xl font-semibold mb-4'>Order Summary</h3>
                        <div className='border-b border-gray-300 pb-4 mb-4'>
                            <div className='flex justify-between'>
                                <p className='text-gray-700'>Item Total</p>
                                <p className='text-gray-700'>₹{itemTotal.toFixed(2)}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-gray-700'>Delivery Fee</p>
                                <p className='text-gray-700'>₹{deliveryFee.toFixed(2)}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-gray-700'>Platform Fee</p>
                                <p className='text-gray-700'>₹{platformFee.toFixed(2)}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-gray-700'>Discount</p>
                                <p className='text-gray-700'>- ₹{discountAmount.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className='flex justify-between font-semibold text-lg'>
                            <p>Total Amount</p>
                            <p>₹{totalToPay.toFixed(2)}</p>
                        </div>
                        <button onClick={handleProceedToPay} className='mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg'>PLACE ORDER</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;
