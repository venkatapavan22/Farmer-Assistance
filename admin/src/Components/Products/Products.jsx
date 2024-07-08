import { useEffect, useState } from "react";
import { API_URL, deleteProduct, getProducts } from "../../Services/api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineDelete } from "react-icons/ai";
import * as XLSX from 'xlsx';
import { BsUpload } from "react-icons/bs";
import { Link } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response.products);
        } catch (error) {
            console.log("Error while calling getProducts API ", error);
        }
    };
    const handleDelete = async (id) => {
        const confirmed = confirm("Are you sure you want to delete this product?");
        if (!confirmed) return;
        try {
            const response = await deleteProduct(id);
            if (response && response.status === 200) {
                setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
                alert("Product deleted successfully");
                fetchProducts();
            }
        } catch (error) {
            console.log("Error while calling deleteProduct API ", error);
        }
    };
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const exportToExcel = () => {
        const exportData = products.map(product => ({
            Id: product._id,
            Name: product.name,
            Price: product.price,
            Category: product.category,
            ExpiryDate: product.expiryDate,
            SKU: product.sku,
            Composition: product.composition.join(", "),
            ApplicationMethod: product.applicationMethod,
            TargetPestsDiseases: product.targetPestsDiseases.join(", "),
            Nutrients: product.nutrients.join(", "),
            ApplicationFrequency: product.applicationFrequency,
            ApplicationSeason: product.applicationSeason,
            SafetyInstructions: product.safetyInstructions,
            Description: product.description,
            StorageInstructions: product.storageInstructions,
            Images: product.images.join(", "),
        }));
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
        XLSX.writeFile(workbook, "ProductsData.xlsx");
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString();
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center px-4">
                <h2 className="text-2xl font-semibold mb-4 px-4 text-primary">Products Data</h2>
                <button
                    onClick={exportToExcel}
                    className="bg-[#8EC44C] text-white px-4 py-2 rounded-md mb-4 ml-4 flex items-center gap-2"
                >
                    <BsUpload />Excel
                </button>
            </div>
            <div className="flex justify-center py-2">
                <input
                    type="text"
                    placeholder="Search by name, SKU, or category"
                    onChange={handleSearch}
                    className="w-3/4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
            </div>
            <div className="h-[75vh] overflow-y-scroll px-4 py-2" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-6 px-4">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <Link to={`/product/${product._id}`} key={product._id} className="rounded-xl p-4 shadow-md">
                                <h3 className="text-gray-600">Name: <span>{product.name}</span></h3>
                                <p className="text-gray-600">Price: <span>₹{product.price}</span></p>
                                <p className="text-gray-600">Category: <span>{product.category}</span></p>
                                <p className="text-gray-600">Expiry Date: <span>{formatDate(product.expiryDate)}</span></p>
                                <p className="text-gray-600">SKU: <span>{product.sku}</span></p>
                                {product.images.length > 0 ? (
                                    <Slider {...sliderSettings} className="mt-2">
                                        {product.images.map((image, index) => (
                                            <div key={index} className="flex justify-center h-52 w-full">
                                                <img className="w-full h-full object-contain" src={`${API_URL}/uploads/${image}`} alt={`${product.name} ${index + 1}`} />
                                            </div>
                                        ))}
                                    </Slider>
                                ) : (
                                    <img className="w-full h-48 object-cover mt-2" src={`${API_URL}/uploads/default-image.png`} alt="default" />
                                )}
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    <AiOutlineDelete />
                                </button>
                            </Link>
                        ))
                    ) : (
                        <h3 className="text-center col-span-full text-2xl md:text-sm">No Products</h3>
                    )}
                </div>
            </div> 
        </div>
    );
};

export default Products;
