import jwt from "jsonwebtoken";
import User from "../Models/User.js";  
import Admin from "../Models/Admin.js"; 
export const verifyToken = async(req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: "Access Denied" });
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (verified.userId) {
            const user = await User.findById(verified.userId);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            req.userId = user._id;
        } else if (verified.adminId) {
            const admin = await Admin.findById(verified.adminId);
            if (!admin) {
                return res.status(404).json({ error: "Admin not found" });
            }
            req.adminId = admin._id;
        }
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid Token" });
    }
};
