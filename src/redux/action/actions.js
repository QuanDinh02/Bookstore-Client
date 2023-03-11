import 
{   INCREMENT, DECREMENT, 
    ADD_BOOK_TO_SHOPPING_CART, DELETE_BOOK_FROM_SHOPPING_CART,
    CHANGE_CART_ITEM_AMOUNT 
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

export const ChangeCartItemAmount = (book_id, item_amount) => {
    return {
        type: CHANGE_CART_ITEM_AMOUNT,
        payload: {
            bookId: book_id,
            itemAmount: item_amount
        }
    };
};