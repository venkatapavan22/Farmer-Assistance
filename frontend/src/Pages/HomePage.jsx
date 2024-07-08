import { Route, Routes } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Weather from "../Components/Wether/Wether";
import MarketPlaces from "../Components/MarketPlaces/MarketPlaces";
import Products from "../Components/Products/Products";
import ProductDetails from "../Components/Products/ProductDetails";
import Home from "./Home/Home";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Profile from "./Profile/Profile";
import Cart from "./Cart/Cart";
import OrderSuccess from "./Orders/OrderSuccess";
import Help from "./Help/Help";
import Footer from "../Components/Footer/Footer";
import ColdStorages from "../Components/ColdStorages/ColdStorages";
import { DataContext } from "../Context/DataProvider";
import { useContext } from "react";
import ProtectedRoutes from "../Components/ProtectedRoutes/ProtectedRoutes";
import Community from "../Components/Messages/Community";

const HomePage = () => {
    const { account } = useContext(DataContext);
    const isAuthenticated = !!account;
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/shop" element={<Products />} />
                    <Route path="/shop/:id" element={<ProductDetails />} />
                    <Route path="/services/weather" element={<Weather />} />
                    <Route path="/services/market-places" element={<MarketPlaces />} />
                    <Route path='/profile/*' element={<ProtectedRoutes element={<Profile />} isAuthenticated={isAuthenticated}/> } />
                    <Route path='/cart' element={<ProtectedRoutes element={<Cart />} isAuthenticated={isAuthenticated} />} />
                    <Route path='/order-success' element={<ProtectedRoutes element={<OrderSuccess />} isAuthenticated={isAuthenticated} />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/services/cold-storages" element={<ColdStorages />} />
                    <Route path="/community" element={<Community/>} />
                    {/* <Route path="/services" element={<Services />} /> */}
                    {/*  */}
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;
