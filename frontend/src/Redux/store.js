import {createStore,combineReducers, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { productDetailsReducer, productReducer } from './Reducers/productReducer';
import { cartReducer } from './Reducers/cartReducer';
import { getOrdersReducer } from './Reducers/orderReducer';


const reducer = combineReducers({
    getProducts: productReducer,
    getProductDetails: productDetailsReducer,
    getCartItems:cartReducer,
    getOrders: getOrdersReducer
})
const middleware= [thunk];
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store;