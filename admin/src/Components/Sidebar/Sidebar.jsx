import { Link } from "react-router-dom"
import {  IoSettingsOutline} from "react-icons/io5";
import { BiHomeCircle } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { PiUserSwitch ,PiFarmLight } from "react-icons/pi";
// import image from  '../../assets/image.png'
const Sidebar = () => {
    return (
        <div className="navbar-container w-52 bg-[#FFFFFF] h-[100vh] shadow-lg rounded-tr-2xl rounded-br-2xl pl-[-4rem] overflow-hidden">
            <Link to='/onboarding' className="flex justify-center items-center gap-1 text-[#8EC44C] pt-6">
                <h2 className="text-4xl"><PiFarmLight /></h2>
                <h2 className="text-2xl font-medium pt-1">Farm</h2>
            </Link>
            <div className="block justify-start items-center pt-12">
                <nav className="w-full flex justify-center">
                    <ul className="flex flex-col justify-start items-start">
                        <Link to='/onboarding' className="text-[#AAACA9] text-lg font-normal py-2 px-4 cursor-pointer flex items-center gap-2 hover:text-[#8EC44C]">
                            <BiHomeCircle />Home
                        </Link>
                        <Link to='/users' className="text-[#AAACA9] text-lg font-normal py-2 px-4 cursor-pointer flex items-center gap-2 hover:text-[#8EC44C]">
                            <FiUsers />Users
                        </Link>
                        <Link to='/products' className="text-[#AAACA9] text-lg font-normal py-2 px-4 flex items-center gap-2 hover:text-[#8EC44C]">
                            <PiUserSwitch /> Products
                        </Link>
                        <Link to='/addProduct' className="text-[#AAACA9] text-lg font-normal py-2 px-4 flex items-center gap-2 hover:text-[#8EC44C]">
                            <PiUserSwitch /> Add Products
                        </Link>
                        <Link to='/orders' className="text-[#AAACA9] text-lg font-normal py-2 px-4 flex items-center gap-2 hover:text-[#8EC44C]">
                            <PiUserSwitch /> Orders
                        </Link>
                        <Link to='/settings' className="text-[#AAACA9] text-lg font-normal py-2 px-4 flex items-center gap-2 hover:text-[#8EC44C]">
                            <IoSettingsOutline />Settings
                        </Link>
                    </ul>
                </nav>
            </div> <br /> 
            
            {/* <img src={image} alt="img" className="translate-y-8 "/>
            <div className="text-center bg-[#F49900]  w-40 rounded-tr-2xl rounded-br-2xl h-44 mt-[-2rem] pt-12 pb-6">
                <p className="pt-4">Share Your Own  <br /><span>Product</span></p>
                <button className="bg-[#85BC3A] text-white flex justify-center mx-auto py-2 px-4 rounded-md mb-6 mt-2" >Upload Now </button>
            </div>
             */}
        </div>
    )
}

export default Sidebar
