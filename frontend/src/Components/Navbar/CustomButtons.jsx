import { IoBagOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../Context/DataProvider";
import { API_URL, getUserProfile } from "../../Services/api";

const CustomButtons = () => {
    const navigate = useNavigate();
    const { account, setAccount } = useContext(DataContext);
    const [profile, setProfile] = useState({});
    const cart = useSelector((state) => state.getCartItems);
    const { cartItems } = cart;
    const handleCart = () => {
        navigate('/cart');
    };
    const handleUser = () => {
        navigate('/login');
    }

    const fetchUser = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem("token");
            if (userId && token) {
                const response = await getUserProfile(userId, token);
                if (response && response.user) {
                    setProfile(response.user);
                    setAccount(response.user); 
                }
            }
        } catch (error) {
            console.log("Error while fetching user profile", error);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [setAccount]);

    return (
        <div className="flex justify-between items-center gap-6 text-2xl relative">
            <button onClick={handleCart} className="hover:text-[#175D00] transition ease-in relative">
                <IoBagOutline />
                {cartItems.length > 0 && (
                    <span className="absolute -top-2.5 -right-2 bg-[#8EC44C] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItems.length}
                    </span>
                )}
            </button>
            {account ? (
                <button onClick={handleUser}>
                    <div className="flex items-center gap-2">
                    {profile.image && (
                        <img src={`${API_URL}/uploads/${profile.image}`} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                    )}
                    <span className="text-lg hidden md:flex">Hi, {profile.username}</span>
                </div>
                </button>
            ) : (
                <button className="hover:text-[#175D00] transition ease-in" onClick={handleUser}>
                    <FaRegCircleUser />
                </button>
            )}
        </div>
    );
};

export default CustomButtons;
