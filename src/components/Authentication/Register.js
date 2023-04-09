import './Authentication.scss';

import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { userRegister } from '../Services/userServices';
import { successToast2 , errorToast2 } from '../Toast/Toast';

const Register = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');


    const [validEmail, setValidEmail] = useState(true);
    const [validUsername, setValidUsername] = useState(true);
    const [validPhone, setValidPhone] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [validReEnterPassword, setValidReEnterPassword] = useState(true);

    let history = useHistory();

    const handleNavigateToLoginPage = () => {
        history.push('/login');
    }

    const resetValidInput = () => {
        setValidEmail(true);
        setValidUsername(true);
        setValidPhone(true);
        setValidPassword(true);
        setValidReEnterPassword(true);
    }

    const handleRegister = async () => {

        resetValidInput();

        if (!email) {
            setValidEmail(false);
            errorToast2("email is empty !");
            return;
        }

        if (!username) {
            setValidUsername(false);
            errorToast2("username is empty !");
            return;
        }

        if (!phone) {
            setValidPhone(false);
            errorToast2("phone is empty !");
            return;
        }

        if (!password) {
            setValidPassword(false);
            errorToast2("password is empty !");
            return;
        }

        if (!reEnterPassword) {
            setValidReEnterPassword(false);
            errorToast2("confirm password is empty !");
            return;
        }

        if (password !== reEnterPassword) {
            setValidReEnterPassword(false);
            errorToast2("confirm password is not the same !");
            return;
        }

        var re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            setValidEmail(false);
            errorToast2("email is invalid !");
            return;
        }

        let result = await userRegister(email, username, password, phone);
        let res = result;
        if (res) {
            if (+res.EC === 0) {
                successToast2(res.EM);
                history.push('/login');
            } else {
                errorToast2(res.EM);
            }
        }
    }

    return (
        <div className='registerPage'>
            <div className="container d-flex flex-row register-container py-5">
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
                    <div>
                        <label className="form-label">Email:</label>
                        <input
                            type="text"

                            className={validEmail === true ? "form-control p-2 " : "form-control p-2 is-invalid"}
                            placeholder='Email address'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>

                    <div>
                        <label className="form-label">Username:</label>
                        <input
                            type="text"
                            className={validUsername === true ? "form-control p-2 " : "form-control p-2 is-invalid"}
                            placeholder='Username'
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>

                    <div>
                        <label className="form-label">Phone number:</label>
                        <input
                            type="text"
                            className={validPhone === true ? "form-control p-2 " : "form-control p-2 is-invalid"}
                            placeholder='Phone number'
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </div>

                    <div>
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className={validPassword === true ? "form-control p-2 " : "form-control p-2 is-invalid"}
                            placeholder='Password'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>

                    <div>
                        <label className="form-label">Re-enter password</label>
                        <input
                            type="password"
                            className={validReEnterPassword === true ? "form-control p-2 " : "form-control p-2 is-invalid"}
                            placeholder='Re-enter password'
                            value={reEnterPassword}
                            onChange={(event) => setReEnterPassword(event.target.value)}
                        />
                    </div>

                    <button
                        className='btn btn-primary fs-6 register-btn py-2'
                        onClick={() => handleRegister()}
                    >
                        Register
                    </button>
                    <hr />
                    <div className='text-center pb-3'>
                        <button
                            className='btn fs-6 login-btn px-3'
                            onClick={() => handleNavigateToLoginPage()}
                        >
                            Already have account, Log in
                        </button>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Register;