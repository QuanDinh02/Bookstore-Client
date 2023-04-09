import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdCloudUpload } from "react-icons/md";
import './Modal.scss';

import { useImmer } from 'use-immer';
import { useEffect } from 'react';
import { getUserGroups, putUpdateUser, deleteUser } from '../../Services/adminServices';
import { successToast, errorToast } from '../../Toast/Toast';

const ModalUser = (props) => {
    const { show, setShow, type, data, fetchUsers } = props;

    const [modalData, setModalData] = useImmer();
    const [previewImage, setPreviewImage] = useState('');
    const [userGroup, setUserGroup] = useState([]);

    const handleClose = () => {
        setPreviewImage('');
        setShow(false);
    }

    const handleOnChange = (type, value) => {
        if (type === 'image') {
            setPreviewImage(URL.createObjectURL(value));
        }

        setModalData(draft => {
            draft[type] = value;
        })
    }

    const checkValidInputs = () => {

        if (!modalData?.fullname) {
            errorToast('Empty fullname is not allowed !');
            return false;
        }

        if (!modalData?.username) {
            errorToast('Empty username is not allowed !');
            return false;
        }

        if (!modalData?.email) {
            errorToast('Empty email is not allowed !');
            return false;
        }

        return true;
    }

    const showToast = (result) => {
        if (result.EC === 0) {
            handleClose();
            successToast(result.EM);
            fetchUsers();
        }
        if (result.EC === 1) {
            errorToast(result.EM);
        }
    }

    const handleButtonOnClick = async () => {

        if (type === 'UPDATE') {

            if (!checkValidInputs()) {
                return;
            }

            let result = await putUpdateUser(modalData);
            if (result) {
                showToast(result);
            }
        } else {

            let result = await deleteUser(modalData?.user_id)
            if (result) {
                showToast(result);
            }
        }
    }

    const fetchAllUserGroup = async () => {
        let result = await getUserGroups(0, 0);
        if (result && result.EC === 0) {
            setUserGroup(result.DT);
        }
    }

    useEffect(() => {
        fetchAllUserGroup();
    }, []);

    useEffect(() => {
        setModalData(data);
    }, [data]);

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size={type !== 'DELETE' ? 'lg' : ''}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{type === 'UPDATE' ? 'Update User' : 'Delete User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {type === 'DELETE' ?
                        <span>Are you sure to remove this <strong>{modalData?.username}</strong> user?</span>
                        :
                        <>
                            <div className='row'>
                                <div className='mb-3 col-6'>
                                    <label className='form-label'>Full Name:</label>
                                    <input
                                        className='form-control'
                                        type='text'
                                        placeholder='Full Name'
                                        onChange={(event) => handleOnChange('fullname', event.target.value)}
                                        value={modalData?.fullname}
                                    />
                                </div>
                                <div className='mb-3 col-6'>
                                    <label className='form-label'>Date of birth:</label>
                                    <input
                                        className='form-control'
                                        type='text'
                                        placeholder='Birthday'
                                        onChange={(event) => handleOnChange('dob', event.target.value)}
                                        value={modalData?.dob}
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
                                    value={modalData?.address}
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
                                        value={modalData?.phone}
                                    />
                                </div>
                                <div className='mb-3 col-4'>
                                    <label className='form-label'>Gender:</label>
                                    <select
                                        className="form-select"
                                        onChange={(event) => handleOnChange('gender', event.target.value)}
                                        value={modalData?.gender}
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
                                        value={modalData?.user_group}
                                    >
                                        <option value={"0"} key={`user-group-option-0`}>Select...</option>
                                        {userGroup && userGroup.length > 0 &&
                                            userGroup.map(item => {
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
                                    value={modalData?.email}
                                />
                            </div>
                            <div className='row'>
                                <div className='mb-3 col-6'>
                                    <label className='form-label'>Facebook Url:</label>
                                    <input
                                        className='form-control'
                                        type='text'
                                        placeholder='Facebook Url'
                                        onChange={(event) => handleOnChange('facebook_url', event.target.value)}
                                        value={modalData?.facebook_url}
                                    />
                                </div>
                                <div className='mb-3 col-6'>
                                    <label className='form-label'>Twitter Url:</label>
                                    <input
                                        className='form-control'
                                        type='text'
                                        placeholder='Twitter Url'
                                        onChange={(event) => handleOnChange('twitter_url', event.target.value)}
                                        value={modalData?.twitter_url}
                                    />
                                </div>
                            </div>
                            <div className='my-4 ImageUpload'>
                                <label htmlFor="formFile" className="form-label d-flex align-items-center gap-2 file_upload"><MdCloudUpload /> Upload File</label>
                                <input
                                    className="form-control"
                                    type="file"
                                    id="formFile"
                                    hidden
                                    onChange={(event) => handleOnChange('image', event.target.files[0])}
                                />
                            </div>
                            <div className='image-preview my-4'>
                                {previewImage ?
                                    <img src={previewImage} alt='' />
                                    :
                                    (type === 'UPDATE' && data?.image ?
                                        <img src={`data:image/jpeg;base64,${data.image}`} alt='' />
                                        :
                                        <span>Preview Image</span>
                                    )
                                }
                            </div>
                        </>
                    }

                </Modal.Body>
                <Modal.Footer>
                    {type === 'UPDATE' ?
                        <Button variant="warning" onClick={handleButtonOnClick}>Save</Button>
                        :
                        <Button variant="outline-danger" onClick={handleButtonOnClick}>Confirm</Button>
                    }
                    <Button variant="light" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUser;