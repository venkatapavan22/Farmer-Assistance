import axios from "axios";
import * as actionTypes from '../Constants/productConstants';

const URL = "https://farmer-assistance.onrender.com";

export const getProducts = () => async(dispatch) =>{
    try {
        dispatch({ type: actionTypes.Get_Products_Request });
        const { data } = await axios.get(`${URL}/product/get`);
        dispatch({ type: actionTypes.Get_Products_Success, payload: data.products });
    } catch (e) {
        dispatch({ type: actionTypes.Get_Products_Failure, payload: e.message });
    }
}

export const getProductDetails = (id) => async(dispatch) =>{
    try {
        dispatch({ type: actionTypes.Get_Product_Details_Request });
        const { data } = await axios.get(`${URL}/product/get/${id}`);
        dispatch({ type: actionTypes.Get_Product_Details_Success, payload: data.product });
    } catch (e) {
        dispatch({ type: actionTypes.Get_Product_Details_Failure, payload: e.message });
    }
}