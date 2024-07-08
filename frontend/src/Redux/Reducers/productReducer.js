import * as actionTypes from '../Constants/productConstants';

const initialState = {
    products: [],
    error: null
};
const productIntialState = {
    product:[],
    error:null
}
export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Get_Products_Success:
            return {
                ...state,
                products: action.payload
            };
        case actionTypes.Get_Products_Failure:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}
export const productDetailsReducer = (state = productIntialState, action) => {
    switch (action.type) {
        case actionTypes.Get_Product_Details_Success:
            return {
                product: action.payload
            };
        case actionTypes.Get_Product_Details_Failure:
            return {
                error: action.payload
        };
        default:
            return state;
    }
}