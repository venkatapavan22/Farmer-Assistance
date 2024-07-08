import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import ProfileDetails from "./ProfileDetails";
import Orders from "../Orders/Orders";
import Settings from "./Settings";

const Profile = () => {
    return (
        <div className="pt-20 w-full h-screen overflow-hidden bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-green-200 to-green-500 px-10 md:px-40  ">
            <div className="flex">
                <Sidebar />
                <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                    <Routes>
                        <Route path="/" element={<ProfileDetails />} />
                        <Route path="orders" element={<Orders/>} />
                        <Route path="settings" element={<Settings />} />
                        {/* 
                        <Route path="support" element={<Contact />} /> */}
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Profile;
