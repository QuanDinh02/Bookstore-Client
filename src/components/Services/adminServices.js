import axios from '../Customization/axios';

const getAllBookCategoryGroup = async (limit, page) => {
    return await axios.get(`/api/book-category-group?limit=${limit}&page=${page}`);
}

const getAllBookCategory = async (limit, page) => {
    return await axios.get(`/api/book-category?limit=${limit}&page=${page}`);
}

const postCreateNewBookCategory = async (category_name, group) => {
    return await axios.post('/api/book-category',{name: category_name, category_group: +group});
}

const putUpdateBookCategory = async (category_id,category_name, group) => {
    return await axios.put('/api/book-category',{id: +category_id,name: category_name, category_group: +group});
}

const deleteBookCategory = async (category_id) => {
    return await axios.delete(`/api/book-category/${category_id}`);
}

export {
    getAllBookCategoryGroup, getAllBookCategory, postCreateNewBookCategory,
    putUpdateBookCategory, deleteBookCategory
}