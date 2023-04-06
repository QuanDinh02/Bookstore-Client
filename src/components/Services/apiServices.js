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

const getBooksByBookCategory = async (id) => {
    return await axios.get(`/api/book/book-category/${id}`);
}

const getBooksByAuthor = async (id) => {
    return await axios.get(`/api/book/author/${id}`);
}

const getBooksByPublisher = async (id) => {
    return await axios.get(`/api/book/publisher/${id}`);
}

const getBooksByCategoryGroup = async (group_id) => {
    return await axios.get(`/api/book/book-category-group/${group_id}`);
}

const getBookDetail = async (book_id) => {
    return await axios.get(`/api/book/book-detail/${book_id}`);
}

const createNewOrder = async (data) => {
    return await axios.post('/api/order',data);
}

const createNewOrderDetails = async (data) => {
    return await axios.post('/api/order-detail',data);
}

export { 
    postCreateABook, getAllBookCategoryGroup, getHighlightBook,
    getBooksByBookCategory, getABookCategoryGroup, getBooksByCategoryGroup,
    getBookDetail, createNewOrder, createNewOrderDetails,
    getBooksByAuthor, getBooksByPublisher
}