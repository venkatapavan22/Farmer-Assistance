import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import dbConnection from './Database/db.js';
import UserRoutes from './Routes/userRoutes.js';
import ProductRoutes from './Routes/productRoutes.js';
import AdminRoutes from './Routes/adminRoutes.js';
import OrderRoutes from './Routes/orderRoutes.js';
import MessageRoutes from './Routes/messageRoutes.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/user', UserRoutes);
app.use('/product', ProductRoutes);
app.use('/admin', AdminRoutes);
app.use('/order', OrderRoutes);
app.use('/message', MessageRoutes);
app.use('/uploads', express.static('uploads'));
const port = process.env.PORT || 7000;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const URL = process.env.MONGODB_URI || `mongodb+srv://${USERNAME}:${PASSWORD}@farmer.zzcfzdo.mongodb.net/?retryWrites=true&w=majority&appName=farmer`;

dbConnection(URL);

app.get('/', (req, res) => {
    res.send("Hi, server running fine");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});