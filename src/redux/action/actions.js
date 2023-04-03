import 
{   INCREMENT, DECREMENT, 
    ADD_BOOK_TO_SHOPPING_CART, DELETE_BOOK_FROM_SHOPPING_CART,
    CHANGE_CART_ITEM_AMOUNT, DELETE_ALL_FROM_SHOPPING_CART,
    DELETE_MANY_CART_ITEMS,

    USER_LOGIN, USER_LOGOUT
} from './type';

export const increaseCounter = () => {
    return {
        type: INCREMENT,
    };
};

export const decreaseCounter = () => {
    return {
        type: DECREMENT,
    };
};

export const AddShoppingCart = (data) => {
    return {
        type: ADD_BOOK_TO_SHOPPING_CART,
        payload: data
    };
};

export const DeleteShoppingCart = (book_id) => {
    return {
        type: DELETE_BOOK_FROM_SHOPPING_CART,
        payload: {
            bookId: book_id
        }
    };
};

export const DeleteAllInShoppingCart = () => {
    return {
        type: DELETE_ALL_FROM_SHOPPING_CART
    };
};

export const DeleteManyCartItems = (deletedCartItems) => {
    return {
        type: DELETE_MANY_CART_ITEMS,
        payload: deletedCartItems
    };
};

export const ChangeCartItemAmount = (book_id, item_amount) => {
    return {
        type: CHANGE_CART_ITEM_AMOUNT,
        payload: {
            bookId: book_id,
            itemAmount: item_amount
        }
    };
};

export const UserLogin = (data) => {
    return {
        type: USER_LOGIN,
        payload: data
    };
};

export const UserLogout = () => {
    return {
        type: USER_LOGOUT
    };
};