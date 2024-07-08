import * as actionTypes from '../Constants/orderConstants';

const initialState = {
    orders: [],
    error: null
};

export const getOrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ORDERS_SUCCESS:
            return { ...state, orders: action.payload, error: null };
        case actionTypes.GET_ORDERS_FAIL:
            return { ...state, error: action.payload, orders: [] };
        default:
            return state;
    }
};