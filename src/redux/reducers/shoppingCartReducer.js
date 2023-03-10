import { ADD_BOOK_TO_SHOPPING_CART, DELETE_BOOK_FROM_SHOPPING_CART } from '../action/type';


const INITIAL_STATE = {
    bookList: [],
    booksCount: 0
};

const shoppingCartReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case ADD_BOOK_TO_SHOPPING_CART:

            state.booksCount += 1;

            if (state.bookList.length > 0) {
                let idx = state.bookList.findIndex(item => item.id === action?.payload?.id);
                if (idx !== -1) {
                    state.bookList[idx].amount += 1;
                    return {
                        ...state, bookList: [...state.bookList]
                    };
                } else {
                    return {
                        ...state, bookList: [...state.bookList, action?.payload]
                    };
                }
            } else {
                return {
                    ...state, bookList: [...state.bookList, action?.payload]
                };
            }

        case DELETE_BOOK_FROM_SHOPPING_CART:

            if (state.bookList.length > 0) {
                
                let deleteBook = state.bookList.find(item => item.id === action?.payload?.bookId);
                state.booksCount -= deleteBook.amount;

                let _bookList = state.bookList.filter(item => item.id !== action?.payload?.bookId);

                return {
                    ...state, bookList: [..._bookList]
                };

            } else {
                return {
                    ...state
                };
            }

        default: return state;

    }

};

export default shoppingCartReducer;