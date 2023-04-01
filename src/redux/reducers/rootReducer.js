import { combineReducers } from 'redux';

import counterReducer from './counterReducer';
import shoppingCartReducer from './shoppingCartReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    counter: counterReducer,
    shoppingCart: shoppingCartReducer,
    user: userReducer
});

export default rootReducer;