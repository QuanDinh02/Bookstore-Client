import axios from '../Customization/axios';

const postCreateABook = async (image) => {

    const data = new FormData();
    data.append('image', image);
    return await axios.post('/api/book', data);
}

const getAllBookCategoryGroup = async () => {
    return await axios.get('/api/book-category/group');
}

const getHighlightBook = async (id) => {
    return await axios.get(`/api/book/${id}`);
}

export { postCreateABook, getAllBookCategoryGroup, getHighlightBook }