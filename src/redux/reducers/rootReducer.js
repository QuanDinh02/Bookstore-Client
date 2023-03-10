import { combineReducers } from 'redux';

import counterReducer from './counterReducer';
import shoppingCartReducer from './shoppingCartReducer';


const rootReducer = combineReducers({
    counter: counterReducer,
    shoppingCart: shoppingCartReducer
});

export default rootReducer;