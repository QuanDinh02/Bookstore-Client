import {
    ADD_BOOK_TO_SHOPPING_CART, DELETE_BOOK_FROM_SHOPPING_CART,
    CHANGE_CART_ITEM_AMOUNT
} from '../action/type';


const INITIAL_STATE = {
    bookList: [],
    booksCount: 0
};

const shoppingCartReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case ADD_BOOK_TO_SHOPPING_CART:

            if (state.bookList.length > 0) {
                let idx = state.bookList.findIndex(item => item.id === action?.payload?.id);
                if (idx !== -1) {
                    state.bookList[idx].amount += 1;
                    return {
                        ...state, bookList: [...state.bookList]
                    };
                } else {
                    return {
                        ...state, bookList: [...state.bookList, action?.payload], booksCount: state.booksCount + 1
                    };
                }
            } else {
                return {
                    ...state, bookList: [...state.bookList, action?.payload], booksCount: state.booksCount + 1
                };
            }

        case DELETE_BOOK_FROM_SHOPPING_CART:

            if (state.bookList.length > 0) {

                let _bookList = state.bookList.filter(item => item.id !== action?.payload?.bookId);

                return {
                    ...state, bookList: [..._bookList], booksCount: state.booksCount - 1
                };

            } else {
                return {
                    ...state
                };
            }

        case CHANGE_CART_ITEM_AMOUNT:

            if (action?.payload?.itemAmount === 0) {
                let _bookList = state.bookList.filter(item => item.id !== action?.payload?.bookId);

                return {
                    ...state, bookList: [..._bookList], booksCount: state.booksCount - 1
                };

            } else {
                let _bookList = state.bookList.map((item) => {
                    if (item.id === action?.payload?.bookId) {
                        item.amount = action?.payload?.itemAmount;
                    }
                    return item;
                })

                return {
                    ...state, bookList: [..._bookList]
                };

            }

        default: return state;

    }

};

export default shoppingCartReducer;