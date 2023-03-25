import axios from '../Customization/axios';

const getAllBookCategoryGroup = async (limit, page) => {
    return await axios.get(`/api/book-category-group?limit=${limit}&page=${page}`);
}
const postCreateNewBookCategoryGroup = async (category_group_name) => {
    return await axios.post('/api/book-category-group', { name: category_group_name });
}
const putUpdateBookCategoryGroup = async (group_id, group_name) => {
    return await axios.put('/api/book-category-group', { id: +group_id, name: group_name });
}
const deleteBookCategoryGroup = async (group_id) => {
    return await axios.delete(`/api/book-category-group/${group_id}`);
}


const getAllBookCategory = async (limit, page) => {
    return await axios.get(`/api/book-category?limit=${limit}&page=${page}`);
}
const postCreateNewBookCategory = async (category_name, group) => {
    return await axios.post('/api/book-category', { name: category_name, category_group: +group });
}
const putUpdateBookCategory = async (category_id, category_name, group) => {
    return await axios.put('/api/book-category', { id: +category_id, name: category_name, category_group: +group });
}
const deleteBookCategory = async (category_id) => {
    return await axios.delete(`/api/book-category/${category_id}`);
}

const getAuthorWithPagination = async (limit, page) => {
    return await axios.get(`/api/author?limit=${limit}&page=${page}`);
}
const postCreateNewAuthor = async (data) => {

    const build_data = new FormData();
    build_data.append('name', data.author_name);
    build_data.append('description', data.author_description);
    build_data.append('image', data.author_image);

    return await axios.post(`/api/author`, build_data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
const putUpdateAuthor = async (data) => {
    const build_data = new FormData();
    build_data.append('id', data.author_id);
    build_data.append('name', data.author_name);
    build_data.append('description', data.author_description);
    build_data.append('image', data.author_image);

    return await axios.put(`/api/author`, build_data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
const deleteAuthor = async (author_id) => {
    return await axios.delete(`/api/author/${author_id}`);
}

const getPublisherWithPagination = async (limit, page) => {
    return await axios.get(`/api/publisher?limit=${limit}&page=${page}`);
}
const postCreateNewPublisher = async (data) => {
    return await axios.post('/api/publisher', { 
        name: data.publisher_name, 
        description: data.publisher_description,
        phone: data.publisher_phone 
    });
}
const putUpdatePublisher = async (data) => {
    return await axios.put('/api/publisher', {
        id: data.publisher_id,
        name: data.publisher_name,
        description: data.publisher_description,
        phone: data.publisher_phone
    });
}
const deletePublisher = async (publisher_id) => {
    return await axios.delete(`/api/publisher/${publisher_id}`);
}

const getBooksWithPagination = async (limit, page) => {
    return await axios.get(`/api/book?limit=${limit}&page=${page}`);
}

export {
    getAllBookCategoryGroup, postCreateNewBookCategoryGroup,
    putUpdateBookCategoryGroup, deleteBookCategoryGroup,

    getAllBookCategory, postCreateNewBookCategory,
    putUpdateBookCategory, deleteBookCategory,

    getAuthorWithPagination, postCreateNewAuthor,
    putUpdateAuthor, deleteAuthor,

    getPublisherWithPagination,postCreateNewPublisher,
    putUpdatePublisher, deletePublisher,

    getBooksWithPagination
}