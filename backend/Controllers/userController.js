import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

export const upload = multer({ storage: storage });
export const userRegister = async(req,res) => {
    const {username,email,password,phoneNumber} = req.body;
    try {
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message: "User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            phoneNumber
        })
        await newUser.save();
        res.status(200).json({message: "User registered successfully",username:newUser.username})
    } catch (error) {
        res.status(500).json({message: "Something went wrong",message:error.message})
    }
}

export const userLogin = async(req,res) => {
    const {username,password} = req.body;
    try {
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({message: "Invalid Username"})
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({message: "Invalid Password"})
        }
        const token = jwt.sign({userId: user._id},process.env.jwt_secret,{expiresIn: "1hr"});
        const userId = user._id;
        const userName = user.username;
        return res.status(200).json({message: "User logged in successfully",token,userId,userName});
    } catch (error) {
        return res.status(500).json({message: "Something went wrong",error:error.message})
    }
}

export const getUser = async(req,res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({message: "Something went wrong",error:error.message})
    }
}

export const getUsers = async(req,res) =>{
    try {
        const users = await User.find();
        res.status(200).json({users})
    }
    catch(error){
        res.status(500).json({message: "Something went wrong",error:error.message})
    }
}

export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { firstName, lastName, country, cityState, postalCode } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (country) user.country = country;
        if (cityState) user.cityState = cityState;
        if (postalCode) user.postalCode = postalCode;
        const image = req.file ? req.file.filename : undefined;
        if(image){
            user.image = image;
        }
        await user.save();
        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

export const deleteUser = async(req,res) =>{
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        await user.deleteOne();
        res.status(200).json({message: "User deleted successfully"})
    } catch (error) {
        return res.status(500).json({message: "Something went wrong",error:error.message})
    }
}