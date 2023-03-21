import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdCloudUpload } from "react-icons/md";
import User from '../../../assets/image/user.png';

import './Modal.scss';

const ModalAuthor = (props) => {
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
                    <Modal.Title>{type === 'CREATE' ? 'Add New Author' : (type === 'UPDATE' ? 'Update Author' : 'Delete Author')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {type === 'DELETE' ?
                        <span>Are you sure to remove this <strong>author</strong> ?</span>
                        :
                        <>
                            <div className='col-12'>
                                <label className='form-label'>Author Name:</label>
                                <input className='form-control' type='text' placeholder='Author Name' />
                            </div>
                            <div className='my-4 col-12 '>
                                <label className='form-label'>Description:</label>
                                <textarea class="form-control description" placeholder="Description"></textarea>
                            </div>
                            <div className='my-4 ImageUpload'>
                                <label for="formFile" class="form-label d-flex align-items-center gap-2 file_upload"><MdCloudUpload /> Upload File</label>
                                <input class="form-control" type="file" id="formFile" hidden />
                            </div>
                            <div className='image-preview my-4'>
                                <img src={User} alt='' />
                                {/* <span>Preview Image</span> */}
                            </div>
                        </>
                    }
                </Modal.Body>
                <Modal.Footer>
                    {type === 'CREATE' ?
                        <Button variant="success" className='create-btn'>Save</Button>
                        :
                        (type === 'UPDATE' ?
                            <Button variant="warning">Save</Button>
                            :
                            <Button variant="outline-danger">Confirm</Button>
                        )
                    }
                    <Button variant="light" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAuthor;