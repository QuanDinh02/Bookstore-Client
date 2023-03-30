import User from '../../../assets/image/user.png';
import { FiUpload } from 'react-icons/fi';
import { useState } from 'react';
import { getUserGroups, postCreateNewUser } from '../../Services/adminServices';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useImmer } from 'use-immer';
import { useHistory } from 'react-router-dom';

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

const UserAddNew = () => {

    const history = useHistory();

    const [userGroups, setUserGroups] = useState([]);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    const [data, setData] = useImmer({
        fullname: '',
        username: '',
        email: '',
        phone: '',
        address: '',
        dob: '',
        gender: '',
        facebook_url: '',
        twitter_url: '',
        user_group: '0',
        image: ''
    });

    const handleOnChange = (type, value) => {
        if (type === 'image') {
            setPreviewImage(URL.createObjectURL(value));
        }

        setData(draft => {
            draft[type] = value;
        })
    }

    const checkValidInputs = () => {

        if (!data?.fullname) {
            toast.error('Empty fullname is not allowed !', toast_error);
            return false;
        }

        if (!data?.username) {
            toast.error('Empty username is not allowed !', toast_error);
            return false;
        }

        if (!data?.email) {
            toast.error('Empty email is not allowed !', toast_error);
            return false;
        }

        if (data?.user_group === '0') {
            toast.error('Empty user role is not allowed !', toast_error);
            return false;
        }

        if (!password) {
            toast.error('Empty password is not allowed !', toast_error);
            return false;
        }

        if (password !== confirmPassword) {
            toast.error('Confirm password is incorrect !', toast_error);
            return false;
        }

        return true;
    }

    const showToast = (result) => {
        if (result.EC === 0) {
            toast.success(result.EM, toast_success);
            setTimeout(()=> {
                history.push('/admin/manager/user-list');
            },1000);
        }
        if (result.EC === 1) {
            toast.error(result.EM, toast_error);
        }
    }

    const fetchAllUserGroups = async () => {
        let result = await getUserGroups(0, 0);
        if (result && result.EC === 0) {
            setUserGroups(result.DT);
        }
    }

    const handleAddNew = async () => {
        if (!checkValidInputs()) {
            return;
        }

        let result = await postCreateNewUser({ ...data, password: password });
        if (result) {
            showToast(result);
        }
    }

    useEffect(() => {
        fetchAllUserGroups();
    }, []);

    return (
        <div className="user-add-new-container d-flex justify-content-between">
            <div className="left-content">
                <div className="content-title px-4 py-3">
                    <span className="table-title">Add New User</span>
                </div>
                <div className="main-content px-4 py-3">
                    <div className='w-100 d-flex justify-content-center'>
                        <div className="image">
                            {previewImage ?
                                <img src={previewImage} alt='' />
                                :
                                (data?.image ?
                                    <img src={`data:image/jpeg;base64,${data.image}`} alt='' />
                                    :
                                    <img src={User} alt='' />
                                )
                            }
                        </div>
                    </div>
                    <div className='image-upload my-3 pt-1 px-2'>
                        <label htmlFor="formFile" class="form-label d-flex align-items-center gap-2 fileUpload"><FiUpload /> Image</label>
                        <input
                            className="form-control"
                            type="file"
                            id="formFile"
                            hidden
                            onChange={(event) => handleOnChange('image', event.target.files[0])}
                        />
                    </div>
                    <div className='file-upload-allow my-3'>
                        <span>Only .jpg .png .jpeg allowed</span>
                    </div>
                    <div>
                        <div className='mb-3'>
                            <label className='form-label'>Facebook Url:</label>
                            <input
                                className='form-control'
                                type='text'
                                placeholder='Facebook Url'
                                onChange={(event) => handleOnChange('facebook_url', event.target.value)}
                                value={data?.facebook_url}
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Twitter Url:</label>
                            <input
                                className='form-control'
                                type='text'
                                placeholder='Twitter Url'
                                onChange={(event) => handleOnChange('twitter_url', event.target.value)}
                                value={data?.twitter_url}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="right-content">
                <div className="content-title px-4 py-3">
                    <span className="table-title">New User Information</span>
                </div>
                <div className="main-content px-4 py-3">
                    <div className='user-info mb-4'>
                        <div className='row'>
                            <div className='mb-3 col-6'>
                                <label className='form-label'>Full Name:</label>
                                <input
                                    className='form-control'
                                    type='text'
                                    placeholder='Full Name'
                                    onChange={(event) => handleOnChange('fullname', event.target.value)}
                                    value={data?.fullname}
                                />
                            </div>
                            <div className='mb-3 col-6'>
                                <label className='form-label'>Date of birth:</label>
                                <input
                                    className='form-control'
                                    type='text'
                                    placeholder='Birthday'
                                    onChange={(event) => handleOnChange('dob', event.target.value)}
                                    value={data?.dob}
                                />
                            </div>
                        </div>
                        <div className='mb-3 col-12'>
                            <label className='form-label'>Address:</label>
                            <input
                                className='form-control'
                                type='text'
                                placeholder='Address'
                                onChange={(event) => handleOnChange('address', event.target.value)}
                                value={data?.address}
                            />
                        </div>
                        <div className='row'>
                            <div className='mb-3 col-4'>
                                <label className='form-label'>Phone:</label>
                                <input
                                    className='form-control'
                                    type='text'
                                    placeholder='Phone number'
                                    onChange={(event) => handleOnChange('phone', event.target.value)}
                                    value={data?.phone}
                                />
                            </div>
                            <div className='mb-3 col-4'>
                                <label className='form-label'>Gender:</label>
                                <select
                                    className="form-select"
                                    onChange={(event) => handleOnChange('gender', event.target.value)}
                                    value={data?.gender}
                                >
                                    <option defaultValue=''>Select...</option>
                                    <option value="Man">Man</option>
                                    <option value="Woman">Woman</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className='mb-3 col-4'>
                                <label className='form-label'>User role:</label>
                                <select
                                    className="form-select"
                                    onChange={(event) => handleOnChange('user_group', event.target.value)}
                                    value={data?.user_group}
                                >
                                    <option value={"0"} key={`user-group-option-0`}>Select...</option>
                                    {userGroups && userGroups.length > 0 &&
                                        userGroups.map(item => {
                                            return (
                                                <option
                                                    key={`user-group-option-${item.id}`}
                                                    value={item.id}
                                                >
                                                    {item.name}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='pb-4 col-6'>
                            <label className='form-label'>Email:</label>
                            <input
                                className='form-control'
                                type='text'
                                placeholder='Email'
                                onChange={(event) => handleOnChange('email', event.target.value)}
                                value={data?.email}
                            />
                        </div>
                    </div>
                    <div className='user-account-info'>
                        <div className="section-title mb-3">
                            <span>Account</span>
                        </div>
                        <div className='mb-3 col-12'>
                            <label className='form-label'>Username:</label>
                            <input
                                className='form-control'
                                type='text'
                                placeholder='Username'
                                onChange={(event) => handleOnChange('username', event.target.value)}
                                value={data?.username}
                            />
                        </div>
                        <div className='row'>
                            <div className='mb-3 col-6'>
                                <label className='form-label'>Password:</label>
                                <input
                                    className='form-control'
                                    type='password'
                                    placeholder='Password'
                                    onChange={(event) => setPassword(event.target.value)}
                                    value={password}
                                />
                            </div>
                            <div className='mb-3 col-6'>
                                <label className='form-label'>Confirm Password:</label>
                                <input
                                    className='form-control'
                                    type='password'
                                    placeholder='Confirm Password'
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                    value={confirmPassword}
                                />
                            </div>
                            <div>
                                <button className='btn btn-warning' onClick={handleAddNew}>Add New User</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAddNew;
