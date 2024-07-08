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