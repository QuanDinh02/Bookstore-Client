import { INCREMENT, DECREMENT, ADD_BOOK_TO_SHOPPING_CART, DELETE_BOOK_FROM_SHOPPING_CART } from './type';

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