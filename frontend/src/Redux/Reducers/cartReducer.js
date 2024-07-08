import * as actionTypes from '../Constants/cartConstants';

const initialState = {
    cartItems: [],
    error: null
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.Add_To_Cart_Success:
            const item = action.payload;
            const existItem = state.cartItems.find(x => x._id === item._id);
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x._id === existItem._id ? item : x)
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                };
            }
        
        case actionTypes.Add_To_Cart_Failure:
            return {
                ...state,
                error: action.payload
            };

        case actionTypes.Remove_From_Cart_Success:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x._id !== action.payload)
            };

        case actionTypes.Update_Cart_Success:
            return {
                ...state,
                cartItems: state.cartItems.map(x => x._id === action.payload.productId ? { ...x, quantity: action.payload.quantity } : x)
            };

        default:
            return state;
    }
}