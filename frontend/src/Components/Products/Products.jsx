import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../Redux/Actions/productActions";
import Slider from "react-slick";
import { API_URL } from "../../Services/api";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.getProducts.products);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [priceFilter, setPriceFilter] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [seasonFilter, setSeasonFilter] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString();
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value) {
            const filteredSuggestions = products
                .filter(product => product.name.toLowerCase().includes(value.toLowerCase()))
                .map(product => product.name);
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion);
        setSuggestions([]);
    };

    const handleCheckboxChange = (e, filterSetter, filterValues) => {
        const { value, checked } = e.target;
        if (checked) {
            filterSetter([...filterValues, value]);
        } else {
            filterSetter(filterValues.filter(item => item !== value));
        }
    };

    const filteredProducts = products
        .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(product => {
            if (priceFilter.length === 0) return true;
            const price = parseInt(product.price, 10);
            return priceFilter.some(range => {
                const [min, max] = range.split('-').map(Number);
                return price >= min && price <= max;
            });
        })
        .filter(product => categoryFilter.length === 0 || categoryFilter.includes(product.category))
        .filter(product => seasonFilter.length === 0 || seasonFilter.includes(product.applicationSeason));

    return (
        <div className="w-full flex pt-20">
            <div className={`w-64 pt-4 px-4 border-r border-gray-200 md:block ${showFilters ? 'block' : 'hidden'} md:w-1/4 lg:w-1/5`}>
                <h2 className="text-xl font-semibold py-4 border-b border-gray-200">Filters</h2>
                <div className="mb-4 border-b border-gray-200 py-4">
                    <h3 className="text-md font-semibold mb-2 md:text-lg">Filter by Price</h3>
                    {['500-1000', '1000-1500', '1500-2000', '2000-3000', '3000-4000', '4000-5000', '5000-6000', '6000-7000', '7000-8000'].map(range => (
                        <div key={range} className="mb-2 text-sm md:text-lg">
                            <label>
                                <input 
                                    type="checkbox" 
                                    value={range} 
                                    onChange={(e) => handleCheckboxChange(e, setPriceFilter, priceFilter)}
                                    className="mr-2 cursor-pointer"
                                />
                                ₹{range.replace('-', ' - ₹')}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="mb-4 border-b border-gray-200">
                    <h3 className="text-md font-semibold mb-2 md:text-lg">Filter by Category</h3>
                    {['Fertilizer', 'Pesticide', 'Seeds', 'Tools', 'others'].map(category => (
                        <div key={category} className="mb-2">
                            <label>
                                <input 
                                    type="checkbox" 
                                    value={category} 
                                    onChange={(e) => handleCheckboxChange(e, setCategoryFilter, categoryFilter)}
                                    className="mr-2 cursor-pointer"
                                />
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="mb-4 border-b border-gray-200">
                    <h3 className="text-md font-semibold mb-2 md:text-lg">Filter by Season</h3>
                    {['Kharif', 'summer', 'fall', 'Monsoon'].map(season => (
                        <div key={season} className="mb-2">
                            <label>
                                <input 
                                    type="checkbox" 
                                    value={season} 
                                    onChange={(e) => handleCheckboxChange(e, setSeasonFilter, seasonFilter)}
                                    className="mr-2 cursor-pointer"
                                />
                                {season.charAt(0).toUpperCase() + season.slice(1)}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full md:w-3/4 lg:w-4/5">
                <div className="flex justify-between items-center px-4">
                    <h2 className="text-xl font-semibold mb-4 px-4">
                        <Link to='/' className="font-medium text-lg">Home <span className="text-lg">/</span></Link> Products
                    </h2>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="md:hidden p-1 border rounded"
                    >
                        {showFilters ? 'Hide' : 'Show Filters'}
                    </button>
                </div>
                <div className="flex justify-center m-auto">
                    <div className="relative w-3/4 mb-4">
                        <input 
                            type="text" 
                            placeholder="Search Products..." 
                            className="w-full p-2 pl-14 bg-[#F5F5F6]  focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent" 
                            value={searchTerm} 
                            onChange={handleSearch}
                        />
                        <div className="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-200">
                            <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.41-1.41l4.12 4.13a1 1 0 01-1.42 1.41l-4.11-4.13zM8 14A6 6 0 108 2a6 6 0 000 12z" clipRule="evenodd" />
                            </svg>
                        </div>
                        {suggestions.length > 0 && (
                            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1">
                                {suggestions.map((suggestion, index) => (
                                    <li 
                                        key={index} 
                                        className="p-2 cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="px-4 py-2">
                    <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6 px-4">
                        {filteredProducts.length === 0 ? (
                            <h3 className="text-center col-span-full text-2xl md:text-sm">No products found.</h3>
                        ) : (
                            filteredProducts.map((product) => (
                                <Link to={`/shop/${product._id}`} key={product._id} className="p-4 hover:shadow-lg transition-shadow duration-300">
                                    {product.images.length > 0 ? (
                                        <Slider {...sliderSettings} className="mt-2 mb-4">
                                            {product.images.map((image, index) => (
                                                <div key={index} className="flex justify-center h-52 w-full">
                                                    <img className="w-full h-full object-contain" src={`${API_URL}/uploads/${image}`} alt={`${product.name} ${index + 1}`} />
                                                </div>
                                            ))}
                                        </Slider>
                                    ) : (
                                        <img className="w-full h-48 object-cover mt-2" src={`${API_URL}/uploads/default-image.png`} alt="default" />
                                    )}
                                    <h3 className="text-gray-600"><span>{product.name}</span></h3>
                                    <p className="text-gray-600"><span>₹{product.price}</span></p>
                                    <p className="text-gray-600">Category: <span>{product.category}</span></p>
                                    <p className="text-gray-600">Expiry Date: <span>{formatDate(product.expiryDate)}</span></p>
                                    <p className="text-gray-600">Season: <span>{product.applicationSeason}</span></p>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
