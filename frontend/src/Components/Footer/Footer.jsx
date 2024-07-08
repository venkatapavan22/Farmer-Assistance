
import { FaInstagram, FaYoutube, FaFacebook , } from "react-icons/fa";
import { GooglePlayButton, AppStoreButton } from "react-mobile-app-button";
// import shipping from '../../../assets/fast-delivery.png';
// import wallet from '../../../assets/wallet.png';
import { Link } from "react-router-dom";
import { PiFarmLight } from "react-icons/pi";
import { CiLocationArrow1 } from "react-icons/ci";
const Footer = () => {
    return (
        <footer className="w-full bg-[#F5F5F5] text-black p-4">
            {/* <div className="flex flex-col justify-around items-center gap-4 py-4 px-4 md:flex-row border-b border-gray-200">
                <div className="flex flex-col justify-around items-center gap-12  md:flex-row">
                    <div className="flex  items-center gap-2">
                        <img src={shipping} alt="Free Shipping" className=" w-24 h-24 py-2 px-1 border rounded-full object-contain " />
                        <p className="text-center"><span className="text-green-500 font-medium text-lg">Free Delivery</span> <br /> On Order Above Rs. 399</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src={wallet} alt="COD Available" className=" w-20 h-20 py-2 px-1 border rounded-full " />
                        <p className="text-center"><span className="text-green-500 font-medium text-lg">COD Available</span> <br /> @ Rs.119 Per Order</p>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <p>Have Queries or Concerns?</p>
                    <Link to="/profile/support" className="bg-white border border-green-500 text-black px-4 py-2 rounded-xl">CONTACT US</Link>
                </div>
            </div> */}
            <div className="flex flex-col md:flex-row justify-around items-center gap-4 py-4 border-b border-gray-200">
                <div className="mb-8 md:mb-0">
                <Link to="/">
                    <h2 className="text-4xl text-[#8EC44C] hover:scale-110 transition ease-in-out flex gap-2 items-center">
                        <PiFarmLight />
                        <span className="text-2xl capitalize" style={{ fontFamily: '"Outfit", sans-serif' }}>FarmFresh</span>
                    </h2>
                </Link>
                <h4 className="text-lg py-2 flex gap-1 items-center"><CiLocationArrow1 />Locate us:</h4>
                <p className="text-black font-normal py-1">Head Office: Jubiliee Hills</p>
                <p className="text-black font-normal py-1">Road No 05 Opposite to Metro Station</p>
                <p className="text-black font-normal py-1">Hyderabad,Telangana. 501506</p>
                <div className="flex  items-start gap-4 mt-4 text-2xl text-[#8EC44C]">
                    <a href="/" target="_blank" rel="noopener noreferrer" className="hover:text-green-500"><FaInstagram /></a>
                    <a href="/" target="_blank" rel="noopener noreferrer" className="hover:text-green-500"><FaFacebook /></a>
                    <a href="/" target="_blank" rel="noopener noreferrer" className="hover:text-green-500"><FaYoutube /></a>
                </div>
                </div>
                <div className="grid grid-cols-2 gap-16 md:grid-cols-3">
                    <div>
                        <h4 className="font-bold mb-4">USEFUL LINKS</h4>
                        <ul>
                            <li className="mb-2"><Link to='/' className="hover:text-green-500">Home</Link></li>
                            <li className="mb-2"><Link to='/shop' className="hover:text-green-500">Shop</Link></li>
                            <li className="mb-2"><Link to='/services/weather' className="hover:text-green-500">Weather</Link></li>
                            <li className="mb-2"><Link to='/services/market-places' className="hover:text-green-500">Market Places</Link></li>
                            <li className="mb-2"><Link to='/services/cold-storages' className="hover:text-green-500">Cold Storages</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">CATEGORIES</h4>
                        <ul>
                            <li className="mb-2"><Link to='' className="hover:text-green-500">Fertilizers</Link></li>
                            <li className="mb-2"><Link to='' className="hover:text-green-500">Pesticides</Link></li>
                            <li className="mb-2"><Link to='' className="hover:text-green-500">Seeds</Link></li>
                            <li className="mb-2"><Link to='' className="hover:text-green-500">Tools</Link></li>
                            <li className="mb-2"><Link to='' className="hover:text-green-500">Others</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">MY ACCOUNT</h4>
                        <ul>
                            <li className="mb-2"><Link to='/profile' className="hover:text-green-500">Account</Link></li>
                            <li className="mb-2"><Link to='/profile/orders' className="hover:text-green-500">Orders</Link></li>
                            <li className="mb-2"><Link to='/profile' className="hover:text-green-500">Profile</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="block">
                    <div className="flex flex-col items-center gap-4">
                        <div className="mb-2">
                            <GooglePlayButton className="bg-white text-black text-xs py-5 mb-2" height={60} direction={"row"} width={200} />
                        </div>
                        <div className="mb-2">
                            <AppStoreButton className="bg-white text-black" height={60} direction={"row"} width={200} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-around items-center md:flex-row">
                <div>
                    <p className="font-medium">&copy; {new Date().getFullYear()} FarmFresh. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
