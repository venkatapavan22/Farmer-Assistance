import { Link } from "react-router-dom";
import { FaArrowRight, FaSeedling, FaCloudSunRain, FaWarehouse } from "react-icons/fa6";
import img1 from '../../assets/main/img1.png';
import Services from "../Home/services/Services";
import Contact from "../../Components/Contact/Contact";

const Home = () => {
    return (
        <div className="w-full pt-20 bg-gradient-to-br from-green-200 to-green-500">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center h-full overflow-hidden">
                <div className="flex justify-center h-auto w-3/4 ml-4">
                    <img src={img1} alt="Farmer and Products" className="w-full h-full pt-10" />
                </div>
                <div className="text-center p-4 text-gray-800 md:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold py-8">One Stop Solution for Farmers</h2>
                    <ul className="list-none space-y-4 text-left">
                        <li className="flex items-start gap-4">
                            <FaSeedling className="text-green-500 text-5xl mt-1" />
                            <span className="text-md ">
                                Discover a wide range of products tailored to meet the needs of modern farmers. From high-quality seeds and fertilizers to advanced farming tools, we have everything you need to enhance your agricultural productivity.
                            </span>
                        </li>
                        <li className="flex items-start gap-4">
                            <FaCloudSunRain className="text-blue-500 text-5xl mt-1" />
                            <span className="text-md ">
                                Stay informed with accurate weather forecasts to make better farming decisions. Our state-of-the-art weather tools help you plan your activities efficiently and minimize risks.
                            </span>
                        </li>
                        <li className="flex items-start gap-4">
                            <FaWarehouse className="text-yellow-500 text-5xl mt-1" />
                            <span className="text-md ">
                                Connect with nearby marketplaces and cold storage facilities to ensure your produce reaches the market in the best condition. Maximize your profits and reduce post-harvest losses with our comprehensive directory.
                            </span>
                        </li>
                    </ul>
                    <Link to="/products" className="flex justify-center m-auto py-8">
                        <button className="flex items-center gap-3 mt-4 px-6 py-3 bg-green-500 hover:bg-green-700 text-white rounded-lg text-lg">
                            <FaArrowRight />
                            Shop Now
                        </button>
                    </Link>
                </div>
            </div>
            <Services />
            <Contact />
        </div>
    );
};

export default Home;
