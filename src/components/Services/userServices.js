import axios from '../Customization/axios';

const userRegister = async (email, username, password, phone) => {
    return await axios.post("/api/register", {
        email, username, password, phone
    });
}

const userLogin = async (login, password) => {
    return await axios.post("/api/login", {
        login,password
    });
}

const fetchAccount = async () => {
    return await axios.get("/api/account");
}

export { 
    userRegister, userLogin, fetchAccount
}