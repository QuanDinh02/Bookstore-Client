import axios from '../Customization/axios';

const postCreateABook = async (image) => {

    const data = new FormData();
    data.append('image', image);
    return await axios.post('/api/book', data);
}

const getAllBookCategoryGroup = async () => {
    return await axios.get('/api/book-category/group');
}

const getABookCategoryGroup = async (group_id) => {
    return await axios.get(`/api/book-category/group/${group_id}`);
}

const getHighlightBook = async (id) => {
    return await axios.get(`/api/book/${id}`);
}

const getBooksByBookCategory = async (id, limit, page) => {
    return await axios.get(`/api/book-category/books?id=${id}&limit=${limit}&page=${page}`);
}

const getBooksByAuthor = async (id, limit, page) => {
    return await axios.get(`/api/author/books?id=${id}&limit=${limit}&page=${page}`);
}

const getBooksByPublisher = async (id, limit, page) => {
    return await axios.get(`/api/publisher/books?id=${id}&limit=${limit}&page=${page}`);
}

const getBooksByCategoryGroup = async (group_id, limit, page) => {
    return await axios.get(`/api/book-category-group/books?id=${group_id}&limit=${limit}&page=${page}`);
}

const getBookDetail = async (book_id) => {
    return await axios.get(`/api/book/book-detail/${book_id}`);
}

const createNewOrder = async (data) => {
    return await axios.post('/api/order', data);
}

const createNewOrderDetails = async (data) => {
    return await axios.post('/api/order-detail', data);
}

const getSearchBooks = async (book_name) => {
    return await axios.get(`/api/search/books?name=${book_name}`);
}

export {
    postCreateABook, getAllBookCategoryGroup, getHighlightBook,
    getBooksByBookCategory, getABookCategoryGroup, getBooksByCategoryGroup,
    getBookDetail, createNewOrder, createNewOrderDetails,
    getBooksByAuthor, getBooksByPublisher, getSearchBooks
}