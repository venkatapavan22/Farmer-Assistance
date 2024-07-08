import { useEffect, useState } from "react";
import { API_URL, getConversations } from "../../Services/api";

const CommunityConversations = () => {
    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await getConversations(token);
            setMessages(response);
        } catch (error) {
            console.log("Error while fetching messages", error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">Community Conversations</h2>
            <div className="mb-6">
                {messages.map((msg) => (
                    <div key={msg._id} className="mb-4 p-4 border rounded shadow">
                        <div className="font-bold flex items-center gap-2">
                            <img
                                src={msg.user.image ? `${API_URL}/uploads/${msg.user.image}` : "https://via.placeholder.com/150"}
                                alt="dp"
                                className="w-7 h-7 rounded-full"
                            />
                            {msg.user.username}
                        </div>
                        <div className="text-gray-700">{msg.message}</div>
                        <div className="text-gray-500 text-sm">{new Date(msg.createdAt).toLocaleString()}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommunityConversations;
