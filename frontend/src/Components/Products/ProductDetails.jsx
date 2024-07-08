import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../Redux/Actions/productActions";
import { API_URL } from "../../Services/api";
import { BiSolidOffer } from "react-icons/bi";
import { MdLocalShipping } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToCart } from "../../Redux/Actions/cartActions";
import { LuShoppingCart } from "react-icons/lu";
import { CiMoneyCheck1 } from "react-icons/ci";
const ProductDetails = () => {
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(null);
    const dispatch = useDispatch();
    const product = useSelector((state) => state.getProductDetails.product);

    useEffect(() => {
        dispatch(getProductDetails(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (product && product.images && product.images.length > 0) {
            setSelectedImage(product.images[0]);
        }
    }, [product]);

    if (!product || Object.keys(product).length === 0) {
        return <div>Loading...</div>;
    }

    const date = new Date(new Date().getTime() + (3 * 24 * 60 * 60 * 1000));

    const handleAddToCart = (productId) => {
        console.log('Adding product to cart:', productId);
        dispatch(addToCart(product._id, 1));
        toast.success('Item added to cart!', {
            autoClose: 2000
        });
    };

    return (
        <div className="w-full px-8 py-4 ">
            <ToastContainer />
            <h2 className="text-2xl font-semibold mb-4 px-4 text-primary">Product Details</h2>
            <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="w-full md:w-2/5">
                    <div className="flex flex-col-reverse md:flex-row">
                        <div className="flex flex-row justify-center items-center overflow-x-auto md:flex-col">
                            {product.images.length > 0 ? (
                                product.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={`${API_URL}/uploads/${image}`}
                                        alt={`${product.name} ${index + 1}`}
                                        className={`h-24 object-contain mt-2 cursor-pointer ${selectedImage === image ? 'border-2 border-primary' : ''}`}
                                        onClick={() => setSelectedImage(image)}
                                    />
                                ))
                            ) : (
                                <img src={`${API_URL}/uploads/default-image.png`} alt="default" className="w-full h-24 object-cover mt-2" />
                            )}
                        </div>
                        {selectedImage && (
                            <div className="w-full flex justify-center mb-4 mt-4">
                                <img
                                    src={`${API_URL}/uploads/${selectedImage}`}
                                    alt="Selected"
                                    className="w-full md:w-3/4 h-[32rem] object-contain cursor-move hover:scale-110 transition ease-in-out overflow-hidden"
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                        <button className="flex justify-center items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={handleAddToCart}>
                            <LuShoppingCart /> Add to Cart
                        </button>
                        <button className="flex justify-center items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
                            <CiMoneyCheck1 />Order Now
                        </button>
                    </div>
                </div>
                <div className="w-full md:w-3/5 p-4">
                    <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
                    <p className="text-lg font-bold mb-2">Price: ₹{product.price}</p>
                    <p className="text-lg mb-2">Category: {product.category}</p>
                    <p className="text-lg mb-2">Expiry Date: {new Date(product.expiryDate).toLocaleDateString()}</p>
                    <p className="text-lg mb-2">SKU: {product.sku}</p>
                    <p className="text-md font-medium">Available Offers</p>
                    <div className="py-2 text-sm">
                        {[
                            "Get ₹25* instant discount for the 1st Flipkart Order using Flipkart UPI",
                            "Flat ₹1,250 off on HDFC Bank Credit Card EMI Txns on 6 and 9 months tenure, Min. Txn Value: ₹15,000",
                            "Flat ₹1,500 off on HDFC Bank Credit Card EMI Txns on 12 months tenure, Min. Txn Value: ₹15,000",
                            "Get extra 58% off (price inclusive of cashback/coupon)",
                            "5% Cashback on Flipkart Axis Bank Card",
                            "Buy 2 or more items save ₹80"
                        ].map((offer, index) => (
                            <p key={index} className="pt-2 flex items-center gap-2">
                                <BiSolidOffer className="text-[#388E3c] text-md" /> {offer}
                            </p>
                        ))}
                    </div>
                    <table className="my-2">
                        <tbody className="text-sm my-4">
                            {[
                                { label: "Delivery", value: `Delivery By ${date.toDateString()} | ₹40`, icon: <MdLocalShipping /> },
                                { label: "Warranty", value: "6 months Limited Domestic Warranty" },
                                {
                                    label: "Seller",
                                    value: (
                                        <div className="flex-col gap-4">
                                            <p className="text-[#2874f0] font-semibold py-1">{product.manufacturer}</p>
                                            <p className="py-1">&#x2022; 14 Days Return Policy</p>
                                            <p className="py-1">&#x2022; GST invoice available.</p>
                                            <p className="py-1">&#x2022; View more sellers starting from ₹{product.price}</p>
                                        </div>
                                    )
                                },
                                { label: "Description", value: product.description },
                                { label: "Composition", value: product.composition.join(", ") },
                                { label: "Application Method", value: product.applicationMethod },
                                { label: "Target Pests/Diseases", value: product.targetPestsDiseases.join(", ") },
                                { label: "Nutrients", value: product.nutrients.join(", ") },
                                { label: "Application Frequency", value: product.applicationFrequency },
                                { label: "Application Season", value: product.applicationSeason },
                                { label: "Safety Instructions", value: product.safetyInstructions },
                                { label: "Storage Instructions", value: product.storageInstructions }
                            ].map((item, index) => (
                                <tr key={index}>
                                    <td className="text-[#878787]">{item.label}</td>
                                    <td className="font-semibold pl-10 py-3 flex items-center gap-2">{item.icon || null}{item.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
