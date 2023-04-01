import {
    USER_LOGIN
} from '../action/type';

const INITIAL_STATE = {
    isAuthenticated: false,
    account: {}
};

const userReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case USER_LOGIN:

            return {
                ...state,
                isAuthenticated: action?.payload?.isAuthenticated,
                account: action?.payload?.account,
            };


        default: return state;

    }

};

export default userReducer;