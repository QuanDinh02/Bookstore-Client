import { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useImmer } from 'use-immer';

import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, userLogout } from '../../Services/userServices';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import ModalPassword from './Modal/ModalPassword';
import { UserLogout } from '../../../redux/action/actions';

const toast_success = {
    style: {
        padding: '1rem'
    },
    iconTheme: {
        primary: '#087B44'
    }
}

const toast_error = {
    style: {
        padding: '1rem'
    },
    iconTheme: {
        primary: '#dd2222'
    }
}

const toast_info = {
    style: {
        padding: '1rem',
        background: '#0095DE',
        color: '#FFFFFF'
    },
}

const ChangePassword = () => {

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);
    const account = useSelector(state => state.user.account);
    const [showModal, setShowModal] = useState(false);

    const [data, setData] = useImmer({
        old_password: '',
        new_password: '',
        confirm_password: ''
    })

    const history = useHistory();

    const handleOnChange = (type, value) => {
        setData(draft => {
            draft[type] = value;
        })
    }

    const handleChangePassword = async () => {

        if (_.isEmpty(account)) {
            history.push('/login');
            return;
        }

        if (!data.old_password) {
            toast.error('Old password is empty !', toast_error);
            return;
        }
        if (!data.new_password) {
            toast.error('New password is empty !', toast_error);
            return;
        }
        if (!data.confirm_password) {
            toast.error('Confirm password is empty !', toast_error);
            return;
        }

        if (data.new_password !== data.confirm_password) {
            toast.error('Confirm password is incorrect !', toast_error);
            return;
        }

        let result = await changePassword({
            user_id: account.id,
            old_password: data.old_password,
            new_password: data.new_password
        })

        if (result && result.EC === 0) {
            setShowModal(false);
            toast.success(result.EM, toast_success);
            setData({
                old_password: '',
                new_password: '',
                confirm_password: ''
            })
            toast("Please login again !", toast_info);

            setTimeout(async () => {
                let res = await userLogout();
                if (res && res.EC === 0) {
                    dispatch(UserLogout());
                    history.push('/login');
                }
            }, 2000);

        } else {
            toast.error(result.EM, toast_error);
        }

    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);

    return (
        <>
            {isLoading === true ?
                <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="#4fa94d"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{ 'justifyContent': 'center', 'alignItems': 'center', "height": '25rem' }}
                    wrapperClassName=""
                    visible={true}
                />
                :
                <>
                    <div className='password-account-container'>
                        <div className="password-header d-flex flex-column">
                            <span className="password-title">Set Password</span>
                            <span className='attention'>For your account's security, do not share your password with anyone else</span>
                        </div>
                        <div className='password-content mt-4'>
                            <div className='password-wrapper'>
                                <div className="d-flex align-items-center col-9 item">
                                    <label className="form-label text-end col-4 pe-4 main-label">Old Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        onChange={(event) => handleOnChange('old_password', event.target.value)}
                                        value={data.old_password}
                                    />
                                </div>
                                <div className="d-flex align-items-center col-9 item">
                                    <label className="form-label text-end col-4 pe-4 main-label">New Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        onChange={(event) => handleOnChange('new_password', event.target.value)}
                                        value={data.password}
                                    />
                                </div>
                                <div className="d-flex align-items-center col-9 item">
                                    <label className="form-label text-end col-4 pe-4 main-label">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        onChange={(event) => handleOnChange('confirm_password', event.target.value)}
                                        value={data.confirm_password}
                                    />
                                </div>
                                <div className='d-flex align-items-center col-9 item'>
                                    <div className='col-4 hidden-text'>Hidden</div>
                                    <button className='btn btn-success px-3' onClick={() => setShowModal(true)}>Change password</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ModalPassword
                        show={showModal}
                        setShow={setShowModal}
                        handleChangePassword={handleChangePassword}
                    />
                </>

            }
        </>
    )
}

export default ChangePassword;