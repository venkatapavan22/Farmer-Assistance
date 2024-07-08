import axios from "axios";

const URL = "https://farmer-assistance.onrender.com";
// const URL = "http://localhost:7000";
export const API_URL = 'https://farmer-assistance.onrender.com';
// export const API_URL = 'http://localhost:7000';
export const authenticateLogin = async (data) => {
    try {
        const response = await axios.post(`${URL}/admin/login`, data);
        return response; 
    } catch (error) {
        console.log("Error while calling Login API", error);
        throw error; 
    }
};

export const getProducts = async (token) => {
    try {
        const config = {headers: {Authorization: `Bearer ${token}`}};
        const response = await axios.get(`${URL}/product/get`,config);
        return response.data;
    } catch (error) {
        console.log("Error while calling getProducts API ", error);
    }
}

export const getProductById = async (productId,token) => {
    try {
        const config = {headers: {Authorization: `Bearer ${token}`}};
        const response = await axios.get(`${URL}/product/get/${productId}`, config);
        return response.data;
    } catch (error) {
        console.log("Error while calling getProductById API ", error);
    }
}

export const addProduct = async (data,token) => {
    try {
        const config = {headers: {Authorization: `Bearer ${token}`}};
        const response = await axios.post(`${URL}/product/add`, data, config);
        return response.data;
    } catch (error) {
        console.log("Error while calling addProduct API ", error);
    }
}

export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${URL}/product/delete/${id}`);
        return response.data;
    } catch (error) {
        console.log("Error while calling deleteProduct API ", error);
    }
}

export const getUsers =async() => {
    try {
        const response = await axios.get(`${URL}/user/getUsers`);
        return response.data;
    } catch (error) {
        console.log("Error while calling getUsers API ", error);
    }
}

export const deleteUserById = async (userId) => {
    try {
        const response = await axios.delete(`${URL}/user/deleteUser/${userId}`);
        return response.data;
    } catch (error) {
        console.log("Error while calling deleteUser API ", error);
    }
}

export const getOrders = async (token) => {
    try {
        const config = {headers : {Authorization: `Bearer ${token}`}};
        const response = await axios.get(`${URL}/order/getOrders`, config);
        return response.data;
    } catch (error) {
        console.log("Error while calling getOrders API ", error);
    }
}

export const updateOrderStatus = async (orderId, status, token) => {
    try {
        const config = {headers : {Authorization: `Bearer ${token}`}};
        const response = await axios.put(`${URL}/order/updateStatus/${orderId}`, {status}, config);
        return response.data;
    } catch (error) {
        console.log("Error while calling updateOrderStatus API ", error);
    }
}