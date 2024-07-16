import { useEffect, useState, useRef } from "react";
import { API_URL, addConversation, deleteMessageById, getConversations } from "../../Services/api";
import { useNavigate } from "react-router-dom";
import { IoIosSend } from "react-icons/io";

const Community = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const messagesEndRef = useRef(null);

    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await getConversations(token);
            setMessages(response.reverse());
        } catch (error) {
            console.log("Error while fetching messages", error);
        }
    };

    const deleteMessage = async() => {
        const id = filteredMessages._id;
        if(filteredMessages.user._id == null){
            try {
                await deleteMessageById(id)
            } catch (error) {
                console.log("error while deleting message id")
            }
        }
    }

    const addMessage = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (!token || !userId) {
            alert("Please login to post a message");
            navigate('/login');
            return;
        }
        try {
            const data = {
                userId,
                message: newMessage
            };
            await addConversation(data, token);
            setNewMessage("");
            fetchMessages(); 
        } catch (error) {
            console.log("Error while adding message", error);
        }
    };

    useEffect(() => {
        fetchMessages();
        deleteMessage()
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const filteredMessages = messages.filter((msg) =>
        msg.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="items mx-auto px-2 flex flex-col h-screen border">
            <h2 className="text-3xl font-bold mb-6 pt-16 text-center">Community Forum</h2>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border rounded mb-4"
                placeholder="Search messages in community..."
            />
            <div className="flex-grow overflow-y-auto mb-4 chat" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                {filteredMessages.map((msg) => (
                    <div
                        key={msg._id}
                        className={`mb-4 rounded ${
                            localStorage.getItem("userId") === msg.user._id
                                ? "ml-auto text-right"
                                : "mr-auto text-left"
                        }`}
                        style={{ maxWidth: "60%" }}
                    >
                        <div className={`flex gap-2 ${
                            localStorage.getItem("userId") === msg.user._id
                                ? "flex-row-reverse"
                                : "flex-row"
                        }`}>
                            <div className="font-bold flex items-center gap-2">
                                <img
                                    src={msg.user.image ? `${API_URL}/uploads/${msg.user.image}` : "https://via.placeholder.com/150"}
                                    alt="dp"
                                    className="w-5 h-5 rounded-full md:h-7 w-7"
                                />
                            </div>
                            <div className={`text-gray-700 p-2 w-full rounded-md md:w-auto ${localStorage.getItem("userId") === msg.user._id ? "bg-green-100" : "bg-gray-100"}`}>
                                <p className="font-semibold">{localStorage.getItem("userId") === msg.user._id ? "You" : msg.user.username}</p>
                                <p>{msg.message}</p>
                                <p className="text-gray-500 pt-2 text-sm">{new Date(msg.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={addMessage} className="flex items-center gap-4 mt-auto">
                <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="p-2 border rounded flex-grow"
                    placeholder="Type your message here..."
                ></input>
                <button type="submit" className="bg-green-500 text-white p-2 rounded-lg flex items-center gap-2">
                    <IoIosSend className="text-lg md:text-2xl"/><span className="hidden md:flex">Post Message</span>
                </button>
            </form>
        </div>
    );
};

export default Community;
