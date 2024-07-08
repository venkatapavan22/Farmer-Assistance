import { Route, Routes } from "react-router-dom"
import Sidebar from "../Components/Sidebar/Sidebar"
import Products from "../Components/Products/Products"
import AddProduct from "../Components/Products/AddProduct"
import Users from "../Components/Users/Users"
import Navbar from "../Components/Navbar/Navbar"
import Login from "../Components/Auth/Login"
import { useContext } from "react"
import { DataContext } from "../Context/DataProvider"
import ProtectedRoutes from "../Components/ProtectedRoutes/ProtectedRoutes"
import WelcomePage from "./WelcomePage"
import ProductDetails from "../Components/Products/ProductDetails"
import Orders from "../Components/Orders/Orders"


const Homepage = () => {
    const { account } = useContext(DataContext);
    const isAuthenticated = !!account;
    return (
        <div className="flex">
            <Sidebar/>
            <div className="flex flex-col w-full">
                <Navbar/>
            <Routes>
                <Route path="/onboarding" element={<WelcomePage />} />
                <Route path='/login' element={<Login/>}/>
                <Route path="/users" element={<ProtectedRoutes element={<Users />} isAuthenticated={isAuthenticated} />} />
                <Route path="/products" element={<ProtectedRoutes element={<Products />} isAuthenticated={isAuthenticated} />} />
                <Route path="/product/:productId" element={<ProtectedRoutes element={<ProductDetails />} isAuthenticated={isAuthenticated} />} />
                <Route path="/addProduct" element={<ProtectedRoutes element={<AddProduct />} isAuthenticated={isAuthenticated} />} />
                <Route path="/orders" element={<ProtectedRoutes element={<Orders />} isAuthenticated={isAuthenticated} />} />
                {/* <Route path="/settings" element={<ProtectedRoutes element={<Settings />} isAuthenticated={isAuthenticated} />} /> */}
            </Routes>
            </div>
        </div>
    )
}

export default Homepage
