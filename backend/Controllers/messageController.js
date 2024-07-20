import Message from "../Models/Message.js";

export const addConversation = async(req,res) => {
    try {
        const {userId,message} = req.body;
        const newMessage = new Message({user: userId,message});
        if(!newMessage){
            return res.status(400).json({message:"Message Required"});
        }
        await newMessage.save();
        res.status(200).json({message:newMessage,message:"Message Sent Successfully"});
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error",error:error.message});
    }
}

export const getConversations = async(req,res) => {
    try {
        const messages = await Message.find().populate('user').sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error",});
    }
} 

export const deleteConversations = async(req,res) =>{
    try {
        const {id} = req.params;
        await Message.findByIdAndDelete(id);
        res.status(200).json({message:"Message Deleted Successfully"});
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"});
    }
}

export const deleteMessagesWhereUserIsNull = async(req, res) => {
    try {
        const messages = await Message.find({ user: null });
        if (messages.length === 0) {
            return res.status(404).json({ message: "No messages found with user null" });
        }
        const result = await Message.deleteMany({ user: null });
        res.status(200).json({ 
            message: "Messages Deleted Successfully", 
            deletedCount: result.deletedCount, 
            deletedMessages: messages 
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}