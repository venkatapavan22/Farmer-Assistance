import { useState } from "react";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { TbRosetteDiscount } from "react-icons/tb";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import { PiFarmLight } from "react-icons/pi";
import CustomButtons from "./CustomButtons";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { FaServicestack } from 'react-icons/fa';
import { CgCommunity } from "react-icons/cg";
const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

    const handleMouseEnter = () => {
        setServicesDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setServicesDropdownOpen(false);
    };

    return (
        <div className="flex justify-between items-center px-4 fixed w-full z-10 md:px-20 py-4 shadow-md bg-gray-100">
            <div className="flex items-center gap-6">
                <Link to="/">
                    <h2 className=" text-[#66BB6A] hover:scale-110 transition ease-in-out flex gap-2 items-center">
                        <PiFarmLight className="text-4xl" />
                        <span className="text-2xl capitalize" style={{ fontFamily: '"Outfit", sans-serif' }}>FarmFresh</span>
                    </h2>
                </Link>
            </div>
            <div className="hidden md:flex items-center gap-8">
                <Link to="/" className="flex items-center gap-2 text-lg font-medium text-gray-700 hover:text-[#66BB6A] transition ease-in-out duration-300">
                    <GoHome />Home
                </Link>
                <Link to="/shop" className="flex items-center gap-2 text-lg font-medium text-gray-700 hover:text-[#66BB6A] transition ease-in-out duration-300">
                    <CiShop />Shop
                </Link>
                <div className="relative flex items-center justify-around" onMouseEnter={handleMouseEnter} >
                    <Link to="/services" className="flex items-center gap-2 text-lg font-medium text-gray-700 hover:text-[#66BB6A] transition ease-in-out duration-300">
                        <FaServicestack />Services {servicesDropdownOpen ? <FaCaretUp /> : <FaCaretDown />}
                    </Link>
                    {servicesDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-md rounded-md py-2" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <Link to="/services/weather" className="block px-4 py-2 text-gray-700 hover:text-[#66BB6A] hover:bg-gray-100 transition ease-in-out duration-300">
                                Weather
                            </Link>
                            <Link to="/services/market-places" className="block px-4 py-2 text-gray-700 hover:text-[#66BB6A] hover:bg-gray-100 transition ease-in-out duration-300">
                                Market Places
                            </Link>
                            <Link to="/services/cold-storages" className="block px-4 py-2 text-gray-700 hover:text-[#66BB6A] hover:bg-gray-100 transition ease-in-out duration-300">
                                Cold Storages
                            </Link>
                        </div>
                    )}
                </div>
                <Link to="/help" className="flex items-center gap-2 text-lg font-medium text-gray-700 hover:text-[#66BB6A] transition ease-in-out duration-300">
                    <BiSupport />Help
                </Link>
                <Link to="/community" className="flex items-center gap-2 text-lg font-medium text-gray-700 hover:text-[#66BB6A] transition ease-in-out duration-300">
                    <CgCommunity className="text-2xl"/>Community
                    </Link>
            </div>
            <div className="hidden md:block">
                <CustomButtons />
            </div>
            <div className="md:hidden flex items-center gap-6">
                <CustomButtons />
                <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl hover:text-[#66BB6A] transition ease-in-out duration-300">
                    {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
                </button>
            </div>
            {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-md rounded-br-2xl rounded-bl-2xl md:hidden flex flex-col items-center gap-6 py-4">
                    <Link to="/" className="flex items-center gap-2 text-lg font-medium text-gray-700 hover:text-[#66BB6A] transition ease-in-out duration-300">
                        <GoHome />Home
                    </Link>
                    <Link to="/shop" className="flex items-center gap-2 text-lg font-medium text-gray-700 hover:text-[#66BB6A] transition ease-in-out duration-300">
                        <IoSearch />Shop
                    </Link>
                    <div className="relative">
                        <button onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)} className="flex items-center gap-2 text-lg font-medium text-gray-700 hover:text-[#8EC44C] transition ease-in-out duration-300">
                            <TbRosetteDiscount />Services {servicesDropdownOpen ? <FaCaretUp /> : <FaCaretDown />}
                        </button>
                        {servicesDropdownOpen && (
                            <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-md rounded-md py-2">
                                <Link to="/services/weather" className="block px-4 py-2 text-gray-700 hover:text-[#66BB6A] hover:bg-gray-100 transition ease-in-out duration-300">
                                    Weather
                                </Link>
                                <Link to="/services/market-places" className="block px-4 py-2 text-gray-700 hover:text-[#66BB6A] hover:bg-gray-100 transition ease-in-out duration-300">
                                    Market Places
                                </Link>
                                <Link to="/services/cold-storages" className="block px-4 py-2 text-gray-700 hover:text-[#8EC44C] hover:bg-gray-100 transition ease-in-out duration-300">
                                    Cold Storages
                                </Link>
                            </div>
                        )}
                    </div>
                    <Link to="/help" className="flex items-center gap-2 text-lg font-medium text-gray-700 hover:text-[#66BB6A] transition ease-in-out duration-300">
                        <BiSupport />Help
                    </Link>
                    <Link to="/community" className="flex items-center gap-2 text-lg font-medium text-gray-700 hover:text-[#66BB6A] transition ease-in-out duration-300">
                        <CgCommunity className="text-2xl"/>Community
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Navbar;
