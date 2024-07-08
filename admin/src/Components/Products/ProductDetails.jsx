import { useParams } from "react-router-dom";
import { API_URL, getProductById } from "../../Services/api";
import { useEffect, useState } from "react";

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const fetchProduct = async () => {
        try {
            const response = await getProductById(productId);
            setProduct(response.product);
            setSelectedImage(response.product.images[0]);
        } catch (error) {
            console.log("Error while calling getProductById API ", error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full px-4">
            <h2 className="text-2xl font-semibold mb-4 px-4 text-primary">Products Data</h2>
            <div className="p-4 grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="col-span-3 flex items-center">
                <div className="flex flex-col items-center">
                    {product.images.length > 0 ? (
                        product.images.map((image, index) => (
                            <img
                                key={index}
                                src={`${API_URL}/uploads/${image}`}
                                alt={`${product.name} ${index + 1}`}
                                className={` h-24 object-contain mt-2 cursor-pointer ${selectedImage === image ? 'border-2 border-primary' : ''}`}
                                onClick={() => setSelectedImage(image)}
                            />
                        ))
                    ) : (
                        <img src={`${API_URL}/uploads/default-image.png`} alt="default" className="w-full h-24 object-cover mt-2" />
                    )}
                </div>
                {selectedImage && (
                    <div className="w-full flex justify-center mb-4 mt-4 ">
                        <img src={`${API_URL}/uploads/${selectedImage}`} alt="Selected" className="w-full md:w-3/4 h-96 object-contain cursor-move hover:scale-110 transition ease-in-out overflow-hidden" />
                    </div>
                )}
            </div>
            <div className="col-span-3 p-4 para" >
                <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
                <p className="text-lg">Price: ₹{product.price}</p>
                <p className="text-lg">Category: {product.category}</p>
                <p className="text-lg">Expiry Date: {new Date(product.expiryDate).toLocaleDateString()}</p>
                <p className="text-lg">SKU: {product.sku}</p>
                <p className="text-lg">Composition: {product.composition.join(", ")}</p>
                <p className="text-lg">Application Method: {product.applicationMethod}</p>
                <p className="text-lg">Target Pests/Diseases: {product.targetPestsDiseases.join(", ")}</p>
                <p className="text-lg">Nutrients: {product.nutrients.join(", ")}</p>
                <p className="text-lg">Application Frequency: {product.applicationFrequency}</p>
                <p className="text-lg">Application Season: {product.applicationSeason}</p>
                <p className="text-lg">Safety Instructions: {product.safetyInstructions}</p>
                <p className="text-lg">Description: {product.description}</p>
                <p className="text-lg">Storage Instructions: {product.storageInstructions}</p>
            </div>
            </div>
        </div>
    );
};

export default ProductDetails;
