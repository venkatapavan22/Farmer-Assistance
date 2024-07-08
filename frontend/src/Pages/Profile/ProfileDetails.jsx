import { useContext, useEffect, useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import { API_URL, getUserProfile, updateUserProfile } from "../../Services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../Context/DataProvider";

const ProfileDetails = () => {
    const [profile, setProfile] = useState({});
    const {setAccount} = useContext(DataContext)
    const [editMode, setEditMode] = useState({
        profile: false,
        personalInfo: false,
        address: false
    });
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        country: "",
        cityState: "",
        postalCode: ""
    });
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const fetchProfile = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("token");
            
            const response = await getUserProfile(userId, token);
            setProfile(response.user);
            setFormData({
                firstName: response.user.firstName || "",
                lastName: response.user.lastName || "",
                country: response.user.country || "",
                cityState: response.user.cityState || "",
                postalCode: response.user.postalCode || ""
            });
        } catch (error) {
            console.log("Error while fetching profile", error);
        }
    };

    const handleEditToggle = (section) => {
        setEditMode((prevState) => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = async (section) => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        try {
            if (editMode[section]) {
                const formDataWithImage = new FormData();
                formDataWithImage.append("firstName", formData.firstName);
                formDataWithImage.append("lastName", formData.lastName);
                formDataWithImage.append("country", formData.country);
                formDataWithImage.append("cityState", formData.cityState);
                formDataWithImage.append("postalCode", formData.postalCode);
                formDataWithImage.append('image', image); 
                const response = await updateUserProfile(userId, formDataWithImage, token);
                if (response && response.status === 200) {
                    const updatedProfile = response.user; 
                    setProfile(updatedProfile); 
                    toast.success("Profile updated successfully!");
                }
            }
            await fetchProfile();
        } catch (error) {
            console.log("Error while updating profile", error);
            toast.error("Failed to update profile.");
        } finally {
            handleEditToggle(section);
        }
    };
    
    const handleImageUpload = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const logOutHandler = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("user");
        setAccount(null); 
        navigate("/login");
    };

    return (
        <div className="w-full h-[85vh] mx-auto p-6 mt-1 bg-white overflow-y-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            <ToastContainer />
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold mb-6">My Profile</h2>
                <button className="text-lg bg-red-500 p-2 text-white font-bold mb-2" onClick={logOutHandler}>Logout</button>
            </div>
            <div className="mb-6 border p-4 rounded-md relative">
                <h4 className="text-lg font-semibold mb-2">Profile</h4>
                {editMode.profile ? (
                    <>
                        <FaSave onClick={() => handleSave('profile')} className="absolute top-2 right-2 text-gray-500 cursor-pointer" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700">Profile Picture</label>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleImageUpload}
                                    className="block w-full p-2 border rounded"
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <FaEdit onClick={() => handleEditToggle('profile')} className="absolute top-2 right-2 text-gray-500 cursor-pointer" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-4">
                                <img
                                    src={profile.image ? `${API_URL}/uploads/${profile.image}` : "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"}
                                    alt="profile"
                                    className="w-20 h-20 rounded-full"
                                />
                                <h2 className="text-2xl font-bold mb-6">{profile.username}</h2>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="mb-6 border p-4 rounded-md relative">
                <h4 className="text-lg font-semibold mb-2">Personal Information</h4>
                {editMode.personalInfo ? (
                    <>
                        <FaSave onClick={() => handleSave('personalInfo')} className="absolute top-2 right-2 text-gray-500 cursor-pointer" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="block w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="block w-full p-2 border rounded"
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <FaEdit onClick={() => handleEditToggle('personalInfo')} className="absolute top-2 right-2 text-gray-500 cursor-pointer" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700">First Name</label>
                                <p className="text-gray-900">{profile.firstName}</p>
                            </div>
                            <div>
                                <label className="block text-gray-700">Last Name</label>
                                <p className="text-gray-900">{profile.lastName}</p>
                            </div>
                            <div>
                                <label className="block text-gray-700">Email</label>
                                <p className="text-gray-900">{profile.email}</p>
                            </div>
                            <div>
                                <label className="block text-gray-700">PhoneNumber</label>
                                <p className="text-gray-900">{profile.phoneNumber}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="mb-6 border p-4 rounded-md relative">
                <h4 className="text-lg font-semibold mb-2">Address</h4>
                {editMode.address ? (
                    <>
                        <FaSave onClick={() => handleSave('address')} className="absolute top-2 right-2 text-gray-500 cursor-pointer" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="block w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">City/State</label>
                                <input
                                    type="text"
                                    name="cityState"
                                    value={formData.cityState}
                                    onChange={handleChange}
                                    className="block w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Postal Code</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    className="block w-full p-2 border rounded"
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <FaEdit onClick={() => handleEditToggle('address')} className="absolute top-2 right-2 text-gray-500 cursor-pointer" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700">Country</label>
                                <p className="text-gray-900">{profile.country}</p>
                            </div>
                            <div>
                                <label className="block text-gray-700">City/State</label>
                                <p className="text-gray-900">{profile.cityState}</p>
                            </div>
                            <div>
                                <label className="block text-gray-700">Postal Code</label>
                                <p className="text-gray-900">{profile.postalCode}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProfileDetails;
