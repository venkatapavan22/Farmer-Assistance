
import Admin from "../Models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const AuthenticateAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid Username' });
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid Password' });
        }
        const token = jwt.sign({ adminId: admin._id }, process.env.jwt_secret, { expiresIn: "2h" });
        const adminId = admin._id;
        const userName = admin.username;
        return res.status(200).json({ message: "admin logged in successfully", token, adminId, username });
    } catch (error) {
        console.error("Error authenticating admin:", error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export const addAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const newAdmin = new Admin({
            username,
            password: hashedPassword
        });
        await newAdmin.save();
        res.status(200).json({ message: "Admin added successfully", username: newAdmin});
    } catch (error) {
        console.error("Error adding admin:", error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}