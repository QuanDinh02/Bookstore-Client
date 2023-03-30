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
const postCreateNewBook = async (data) => {

    const build_data = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        build_data.append(`${key}`, value);
    })

    return await axios.post(`/api/book`, build_data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
const putUpdateBook = async (data) => {
    const build_data = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        build_data.append(`${key}`, value);
    })

    return await axios.put(`/api/book`, build_data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
const deleteBook = async (book_id) => {
    return await axios.delete(`/api/book/${book_id}`);
}
const putUpdateSellingBook = async (data) => {
    return await axios.put('/api/selling-book', data);
}

const getUserWithPagination = async (limit, page) => {
    return await axios.get(`/api/user?limit=${limit}&page=${page}`);
}
const postCreateNewUser = async (data) => {

    const build_data = new FormData();
    build_data.append('fullname', data.fullname);
    build_data.append('username', data.username);
    build_data.append('email', data.email);
    build_data.append('phone', data.phone);
    build_data.append('address', data.address);
    build_data.append('dob', data.dob);
    build_data.append('gender', data.gender);
    build_data.append('facebook_url', data.facebook_url);
    build_data.append('twitter_url', data.twitter_url);
    build_data.append('user_group', data.user_group);
    build_data.append('image', data.image);

    return await axios.post(`/api/user`, build_data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
const putUpdateUser = async (data) => {
    const build_data = new FormData();
    build_data.append('id', data.user_id);
    build_data.append('fullname', data.fullname);
    build_data.append('username', data.username);
    build_data.append('email', data.email);
    build_data.append('phone', data.phone);
    build_data.append('dob', data.dob);
    build_data.append('gender', data.gender);
    build_data.append('facebook_url', data.facebook_url);
    build_data.append('twitter_url', data.twitter_url);
    build_data.append('user_group', data.user_group);
    build_data.append('image', data.image);

    return await axios.put(`/api/user`, build_data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
const deleteUser = async (user_id) => {
    return await axios.delete(`/api/user/${user_id}`);
}
const getUserGroups = async (limit, page) => {
    return await axios.get(`/api/user/group?limit=${limit}&page=${page}`);
}

const getOrderWithPagination = async (limit, page) => {
    return await axios.get(`/api/order?limit=${limit}&page=${page}`);
}
const getOrderDetail = async (customer_id, order_status) => {
    return await axios.get(`/api/order-detail?customer=${customer_id}&status=${order_status}`);
}


export {
    getAllBookCategoryGroup, postCreateNewBookCategoryGroup,
    putUpdateBookCategoryGroup, deleteBookCategoryGroup,

    getAllBookCategory, postCreateNewBookCategory,
    putUpdateBookCategory, deleteBookCategory,

    getAuthorWithPagination, postCreateNewAuthor,
    putUpdateAuthor, deleteAuthor,

    getPublisherWithPagination, postCreateNewPublisher,
    putUpdatePublisher, deletePublisher,

    getBooksWithPagination, postCreateNewBook,
    putUpdateBook, deleteBook, putUpdateSellingBook,

    getUserWithPagination, postCreateNewUser,
    putUpdateUser, deleteUser, getUserGroups,

    getOrderWithPagination, getOrderDetail
}