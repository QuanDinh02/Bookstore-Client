import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdCloudUpload } from "react-icons/md";
import Onepiece from '../../../assets/image/Onepiece.png';

import './Modal.scss';

const ModalUser = (props) => {
    const { show, setShow, type } = props;

    const handleClose = () => setShow(false);

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
                        <span>Are you sure to remove this <strong>user</strong> ?</span>
                        :
                        <>
                            <div className='row'>
                                <div className='mb-3 col-6'>
                                    <label className='form-label'>Full Name:</label>
                                    <input className='form-control' type='text' placeholder='Full Name' />
                                </div>
                                <div className='mb-3 col-6'>
                                    <label className='form-label'>Date of birth:</label>
                                    <input className='form-control' type='text' placeholder='Birthday' />
                                </div>
                            </div>
                            <div className='mb-3 col-12'>
                                <label className='form-label'>Address:</label>
                                <input className='form-control' type='text' placeholder='Address' />
                            </div>
                            <div className='row'>
                                <div className='mb-3 col-4'>
                                    <label className='form-label'>Phone:</label>
                                    <input className='form-control' type='text' placeholder='Phone number' />
                                </div>
                                <div className='mb-3 col-4'>
                                    <label className='form-label'>Gender:</label>
                                    <select className="form-select">
                                        <option defaultValue=''>Select...</option>
                                        <option value="Man">Man</option>
                                        <option value="Woman">Woman</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className='mb-3 col-4'>
                                    <label className='form-label'>User role:</label>
                                    <select className="form-select">
                                        <option defaultValue=''>Select...</option>
                                        <option value="0">Manager</option>
                                        <option value="1">Staff</option>
                                        <option value="2">Customer</option>
                                    </select>
                                </div>
                            </div>
                            <div className='pb-4 col-6'>
                                <label className='form-label'>Email:</label>
                                <input className='form-control' type='text' placeholder='Email' />
                            </div>
                            <div className='row'>
                                <div className='mb-3 col-6'>
                                    <label className='form-label'>Facebook Url:</label>
                                    <input className='form-control' type='text' placeholder='Facebook Url' />
                                </div>
                                <div className='mb-3 col-6'>
                                    <label className='form-label'>Twitter Url:</label>
                                    <input className='form-control' type='text' placeholder='Twitter Url' />
                                </div>
                            </div>
                            <div className='my-4 ImageUpload'>
                                <label for="formFile" class="form-label d-flex align-items-center gap-2 file_upload"><MdCloudUpload /> Upload File</label>
                                <input class="form-control" type="file" id="formFile" hidden />
                            </div>
                            <div className='image-preview my-4'>
                                <img src={Onepiece} alt='' />
                                {/* <span>Preview Image</span> */}
                            </div>
                        </>
                    }

                </Modal.Body>
                <Modal.Footer>
                    {type === 'UPDATE' ?
                        <Button variant="warning">Save</Button>
                        :
                        <Button variant="outline-danger">Confirm</Button>
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