import axios from '../Customization/axios';

const getAllBookCategoryGroup = async (limit, page) => {
    return await axios.get(`/api/book-category-group?limit=${limit}&page=${page}`);
}
const postCreateNewBookCategoryGroup = async (category_group_name) => {
    return await axios.post('/api/book-category-group',{name: category_group_name});
}
const putUpdateBookCategoryGroup = async (group_id,group_name) => {
    return await axios.put('/api/book-category-group',{id: +group_id,name: group_name});
}
const deleteBookCategoryGroup = async (group_id) => {
    return await axios.delete(`/api/book-category-group/${group_id}`);
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
    getAllBookCategoryGroup, postCreateNewBookCategoryGroup,
    putUpdateBookCategoryGroup, deleteBookCategoryGroup,

    getAllBookCategory, postCreateNewBookCategory,
    putUpdateBookCategory, deleteBookCategory
}