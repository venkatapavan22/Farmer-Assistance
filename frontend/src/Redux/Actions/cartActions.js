import axios from 'axios';
import * as actionTypes from '../Constants/cartConstants';
const URL = 'https://farmer-assistance.onrender.com';

export const addToCart = (productId,quantity) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${URL}/product/get/${productId}`);
        dispatch({
            type: 'Add_To_Cart_Success',
            payload: { ...data.product, quantity }
        });
    } catch (error) {
        dispatch({
            type: 'Add_To_Cart_Failure',
            payload: error.message
        });
    }
}
export const removeFromCart = (productId) => (dispatch) => {
    dispatch({
        type: actionTypes.Remove_From_Cart_Success,
        payload: productId
    });
};

export const updateCart = (productId, quantity) => (dispatch) => {
    dispatch({
        type: actionTypes.Update_Cart_Success,
        payload: { productId, quantity }
    });
}