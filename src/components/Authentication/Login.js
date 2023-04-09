import './Authentication.scss';

import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { userLogin } from '../Services/userServices';
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from '../../redux/action/actions';
import { successToast2, errorToast2 } from '../Toast/Toast';

const Login = () => {

    let history = useHistory();
    const dispatch = useDispatch();

    const [loginData, setLoginData] = useState('');
    const [password, setPasssword] = useState('');

    const [validLogin, setValidLogin] = useState(true);
    const [validPassword, setValidPassword] = useState(true);

    const account = useSelector(state => state.user.account);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    const handleNavigateToRegisterPage = () => {
        history.push('/register');
    }

    const resetValidData = () => {
        setValidLogin(true);
        setValidPassword(true);
    }

    const handleLogin = async () => {

        resetValidData();
        if (!loginData) {
            setValidLogin(false);
            errorToast2("Email or phone is empty !");
        }
        if (!password) {
            setValidPassword(false);
            errorToast2("Password is empty !");
        }

        let result = await userLogin(loginData, password);
        if (result) {
            let res = result;
            if (+res.EC === 0) {
                successToast2(res.EM);

                let email = res.DT.email;
                let username = res.DT.username;
                let id = res.DT.id;
                let user_group = res.DT.group;

                let data = {
                    isAuthenticated: true,
                    account: { id, email, username, user_group }
                }

                setTimeout(() => {
                    dispatch(UserLogin(data));
                    history.push('/');
                    window.location.reload();
                }, 1000);

            } else {
                errorToast2(res.EM);
            }
        }

    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    }

    if (account && isAuthenticated === true) {
        history.push('/');
        window.location.reload();
    }

    // useEffect(() => {
    //     window.scroll(0, 0);
    // }, []);

    return (
        <div className='loginPage'>
            <div className="container d-flex flex-row login-container py-5">
                <div className="content-left col-7 d-none d-sm-block  px-5">
                    <div className='brand fs-1'>
                        Megabook
                    </div>
                    <div className='content fs-3'>
                        Megabook where helps you find books and boosts your knowledge
                    </div>
                </div>
                <div className="content-right d-flex flex-column col-12 col-sm-5 p-3 gap-3">
                    <div className='brand text-center fs-1 d-sm-none d-block'>
                        Megabook
                    </div>
                    <input
                        type="text"
                        className={validLogin === true ? "form-control px-3 py-3 " : "form-control px-3 py-3 is-invalid"}
                        placeholder='Email address or phone number'
                        value={loginData}
                        onChange={(event) => setLoginData(event.target.value)}
                        onKeyPress={(event) => handleKeyPress(event)}
                    />
                    <input
                        type="password"
                        className={validPassword === true ? "form-control px-3 py-3 " : "form-control px-3 py-3 is-invalid"}
                        placeholder='Password'
                        value={password}
                        onChange={(event) => setPasssword(event.target.value)}
                        onKeyPress={(event) => handleKeyPress(event)}
                    />
                    <button
                        className='btn btn-primary fs-6 login-btn py-2'
                        onClick={() => handleLogin()}
                    >
                        Log in
                    </button>
                    <span className='text-center forgottenPass'>
                        <a href='#'>Forgotten password?</a>
                    </span>
                    <hr />
                    <div className='text-center pb-3'>
                        <button
                            className='btn fs-6 register-btn px-3'
                            onClick={() => handleNavigateToRegisterPage()}
                        >
                            Create New Account
                        </button>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Login;