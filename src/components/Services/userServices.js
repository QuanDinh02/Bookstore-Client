import axios from '../Customization/axios';

const userRegister = async (email, username, password, phone) => {
    return await axios.post("/api/register", {
        email, username, password, phone
    });
}

const userLogin = async (login, password) => {
    return await axios.post("/api/login", {
        login, password
    });
}

const userLogout = async () => {
    return await axios.get('/api/logout');
}

const fetchAccount = async () => {
    return await axios.get("/api/account");
}

const fetchUserAddresses = async (user_id) => {
    return await axios.get(`/api/address/${user_id}`);
}

const createNewUserAddress = async (data) => {
    return await axios.post("/api/address", data);
}

const updateUserAddress = async (data) => {
    return await axios.put("/api/address", data);
}

const setDefaultAddress = async (data) => {
    return await axios.put("/api/address/set-default", data);
}

const getDefaultAddress = async (user_id) => {
    return await axios.get(`/api/address/get-default/${user_id}`);
}

const deleteAddress = async (address_id) => {
    return await axios.delete(`/api/address/${address_id}`);
}

const changePassword = async (data) => {
    return await axios.put('/api/password', data);
}

const getUserProfile = async (user_id) => {
    return await axios.get(`/api/user/profile/${user_id}`);
}

const putUpdateUserProfile = async (data) => {
    const build_data = new FormData();
    build_data.append('id', data.id);
    build_data.append('fullname', data.fullname);
    build_data.append('phone', data.phone);
    build_data.append('dob', data.dob);
    build_data.append('gender', data.gender);
    build_data.append('image', data.image);

    return await axios.put(`/api/user/profile`, build_data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export {
    userRegister, userLogin, userLogout, fetchAccount,
    fetchUserAddresses, createNewUserAddress,
    updateUserAddress, deleteAddress, setDefaultAddress,
    getDefaultAddress, changePassword, getUserProfile,
    putUpdateUserProfile
}