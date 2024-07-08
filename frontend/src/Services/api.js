import axios from 'axios';

const URL = 'https://farmer-assistance.onrender.com';
// const URL = 'http://localhost:7000';
export const API_URL = 'https://farmer-assistance.onrender.com';
// export const API_URL = 'http://localhost:7000';

export const authenticateSignUp = async(data,token) => {
    try {
        const config= {headers: {Authorization: `Bearer ${token}`}};
        return await axios.post(`${URL}/user/signup`,data,config);
    } catch (error) {
        console.log("Error while calling Signup api",error);
    }
}

export const authenticateLogin = async(data,token) =>{
    try {
        const config= {headers: {Authorization: `Bearer ${token}`}};
        const response = await axios.post(`${URL}/user/login`,data,config);
        return response.data;
    } catch (error) {
        console.log("Error while calling Login api",error);
    }
}
export const getUserProfile = async(userId,token) =>{
    try {
        const config= {headers: {Authorization: `Bearer ${token}`}};
        const response = await axios.get(`${URL}/user/getUser/${userId}`,config);
        return response.data;
    } catch (error) {
        console.log("Error while calling getUserProfile api",error);
    }
}

export const updateUserProfile = async(userId,data,token) =>{
    try {
        const config = {headers: {Authorization: `Bearer ${token}`}};
        const response = await axios.put(`${URL}/user/updateUser/${userId}`,data,config);
        return response.data;
    } catch (error) {
        console.log("Error while calling updateUserProfile api",error);
    }
}

// export const fetchMarketPlaces = async () => {
//     try {
//         const response = await axios.get('https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&filters%5BState.keyword%5D=Telangana');
//         return response;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }

export const createOrder = async (orderData, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.post(`${URL}/order/create`, orderData, config);
    return response.data;
};


export const addConversation = async(data,token) => {
    try {
        const config= {headers: {Authorization: `Bearer ${token}`}};
        const response = await axios.post(`${URL}/message/createMessage`,data,config);
        return response.data;
    } catch (error) {
        console.log("Error while calling addConversation api",error);
    }
}

export const getConversations = async(token) => {
    try {
        const config= {headers: {Authorization: `Bearer ${token}`}};
        const response = await axios.get(`${URL}/message/getMessages`,config);
        return response.data;
    } catch (error) {
        console.log("Error while calling getConversations api",error);
    }
}