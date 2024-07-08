import { useState } from "react";
import { addProduct } from "../../Services/api";

const AddProduct = () => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState([]);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [sku, setSku] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [composition, setComposition] = useState([]);
    const [applicationMethod, setApplicationMethod] = useState("");
    const [targetPestsDiseases, setTargetPestsDiseases] = useState([]);
    const [nutrients, setNutrients] = useState([]);
    const [applicationFrequency, setApplicationFrequency] = useState("");
    const [applicationSeason, setApplicationSeason] = useState("");
    const [safetyInstructions, setSafetyInstructions] = useState("");
    const [storageInstructions, setStorageInstructions] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    // const handleCategoryChange = (event) => {
    //     const value = event.target.value;
    //     if (category.includes(value)) {
    //         setCategory(category.filter((item) => item !== value));
    //     } else {
    //         setCategory([...category, value]);
    //     }
    // };

    const handleNutrientsChange = (event) => {
        const value = event.target.value;
        if (nutrients.includes(value)) {
            setNutrients(nutrients.filter((item) => item !== value));
        } else {
            setNutrients([...nutrients, value]);
        }
    };

    const handleTargetPestsDiseasesChange = (event) => {
        const value = event.target.value;
        if (targetPestsDiseases.includes(value)) {
            setTargetPestsDiseases(targetPestsDiseases.filter((item) => item !== value));
        } else {
            setTargetPestsDiseases([...targetPestsDiseases, value]);
        }
    };

    const handleImageUpload = (event) => {
        const selectedImages = Array.from(event.target.files);
        setImages([...images, ...selectedImages]);
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('category', category);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('manufacturer', manufacturer);
            formData.append('sku', sku);
            formData.append('expiryDate', expiryDate);
            formData.append('composition', composition);
            formData.append('applicationMethod', applicationMethod);
            targetPestsDiseases.forEach((value) => {
                formData.append('targetPestsDiseases', value);
            });
            nutrients.forEach((value) => {
                formData.append('nutrients', value);
            });
            formData.append('applicationFrequency', applicationFrequency);
            formData.append('applicationSeason', applicationSeason);
            formData.append('safetyInstructions', safetyInstructions);
            formData.append('storageInstructions', storageInstructions);
            images.forEach((image) => {
                formData.append('images', image);
            });

            const data = await addProduct(formData);
            if (data) {
                alert('Product added successfully');
                setName("");
                setCategory([]);
                setDescription("");
                setPrice("");
                setManufacturer("");
                setSku("");
                setExpiryDate("");
                setComposition([]);
                setApplicationMethod("");
                setTargetPestsDiseases([]);
                setNutrients([]);
                setApplicationFrequency("");
                setApplicationSeason("");
                setSafetyInstructions("");
                setStorageInstructions("");
                setImages([]);
            }
        } catch (error) {
            console.error("Error adding product: ", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-full px-4 ">
            <h1 className="text-2xl font-bold text-primary mb-4">Add Product</h1>
            <div className="h-[80vh] overflow-y-scroll px-4 pt-2 bg-gray-100 rounded-md" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            <form onSubmit={handleAddProduct} className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block font-medium text-gray-700">
                        Name:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full py-2 px-1 border-gray-300 rounded-md shadow-sm" />
                    </label>
                </div>
                <div>
                    <label className="block font-medium text-gray-700">
                        Description:
                        <input value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-1" />
                    </label>
                </div>
                <div>
                    <label className="block font-medium text-gray-700">
                        Category:
                        <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-1">
                            <option value="">Select Category</option>
                            <option value="Fertilizer">Fertilizer</option>
                            <option value="Pesticide">Pesticide</option>
                            <option value="Seeds">Seeds</option>
                            <option value="Tools">Tools</option>
                        </select>
                    </label>
                </div>

                <div>
                    <label className="block font-medium text-gray-700">
                        Composition:
                        <input value={composition} onChange={(e) => setComposition(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-1" />
                    </label>
                </div>
                <div>
                    <label className="block font-medium text-gray-700">
                        Price:
                        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-1" />
                    </label>
                </div>
                <div>
                    <label className="block font-medium text-gray-700">
                        Manufacturer:
                        <input type="text" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-1" />
                    </label>
                </div>
                <div>
                    <label className="block font-medium text-gray-700">
                        SKU:
                        <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-1" />
                    </label>
                </div>
                <div>
                    <label className="block font-medium text-gray-700">
                        Expiry Date:
                        <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-1" />
                    </label>
                </div>

                <div>
                    <label className="block font-medium text-gray-700">
                        Application Method:
                        <input type="text" value={applicationMethod} onChange={(e) => setApplicationMethod(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-1" />
                    </label>
                </div>
                <div>
                    <label className="block font-medium text-gray-700">
                        Application Frequency:
                        <input type="text" value={applicationFrequency} onChange={(e) => setApplicationFrequency(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-1" />
                    </label>
                </div>
                <div>
                    <label className="block font-medium text-gray-700">
                        Target Pests/Diseases:
                        <select multiple value={targetPestsDiseases} onChange={handleTargetPestsDiseasesChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-1">
                            <option value="Aphids">Aphids</option>
                            <option value="Whiteflies">Whiteflies</option>
                            <option value="Spider Mites">Spider Mites</option>
                            <option value="Thrips">Thrips</option>
                            <option value="Leafhoppers">Leafhoppers</option>
                            <option value="Caterpillars">Caterpillars</option>
                            <option value="Beetles">Beetles</option>
                            <option value="Fungal Diseases">Fungal Diseases</option>
                            <option value="Bacterial Diseases">Bacterial Diseases</option>
                            <option value="Viral Diseases">Viral Diseases</option>
                            <option value="Nematodes">Nematodes</option>
                            <option value="Weeds">Weeds</option>
                            <option value="Mildew">Mildew</option>
                            <option value="Rust">Rust</option>
                            <option value="Blight">Blight</option>
                            <option value="Anthracnose">Anthracnose</option>
                            <option value="Powdery Mildew">Powdery Mildew</option>
                            <option value="Downy Mildew">Downy Mildew</option>
                            <option value="Blight">Blight</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label className="block font-medium text-gray-700">
                        Nutrients:
                        <select multiple value={nutrients} onChange={handleNutrientsChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-1">
                            <option value="Nitrogen">Nitrogen</option>
                            <option value="Phosphorus">Phosphorus</option>
                            <option value="Potassium">Potassium</option>
                            <option value="Calcium">Calcium</option>
                            <option value="Magnesium">Magnesium</option>
                            <option value="Sulfur">Sulfur</option>
                            <option value="Iron">Iron</option>
                            <option value="Manganese">Manganese</option>
                            <option value="Zinc">Zinc</option>
                            <option value="Copper">Copper</option>
                            <option value="Molybdenum">Molybdenum</option>
                            <option value="Boron">Boron</option>
                            <option value="Chlorine">Chlorine</option>
                        </select>
                    </label>
                </div>

                <div>
                    <label className="block font-medium text-gray-700">
                        Application Season:
                        <input type="text" value={applicationSeason} onChange={(e) => setApplicationSeason(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-1" />
                    </label>
                </div>
                <div>
                    <label className="block font-medium text-gray-700">
                        Safety Instructions:
                        <input value={safetyInstructions} onChange={(e) => setSafetyInstructions(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-1" />
                    </label>
                </div>
                <div>
                    <label className="block font-medium text-gray-700">
                        Storage Instructions:
                        <input value={storageInstructions} onChange={(e) => setStorageInstructions(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-1" />
                    </label>
                </div>
                <div>
                    <label className="block font-medium text-gray-700">
                        Images:
                        <input type="file" onChange={handleImageUpload} multiple className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-1" />
                    </label>
                </div>
                <div className="col-span-2">
                    <button type="submit" disabled={loading} className={`px-4 py-2 rounded-md text-white ${loading ? "bg-gray-400" : "bg-primary"}`}>
                        {loading ? "Adding..." : "Add Product"}
                    </button>
                </div>
            </form>
            </div>
        </div>
    );
}

export default AddProduct;
