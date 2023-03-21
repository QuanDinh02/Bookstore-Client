import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdCloudUpload } from "react-icons/md";
import Onepiece from '../../../assets/image/Onepiece.png';

import './Modal.scss';

const ModalBook = (props) => {
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
                    <Modal.Title>{type === 'CREATE' ? 'Add New Book' : (type === 'UPDATE' ? 'Update Book' : 'Delete Book')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {type === 'DELETE' ?
                        <span>Are you sure to remove this <strong>book</strong> ?</span>
                        :
                        <>
                            <div className='row'>
                                <div className='col-6'>
                                    <label className='form-label'>Book:</label>
                                    <input className='form-control' type='text' placeholder='Book Name' />
                                </div>

                                <div className='col-6'>
                                    <label className='form-label'>Author:</label>
                                    <select className="form-select">
                                        <option defaultValue=''>Select...</option>
                                        <option value="Science">Oda</option>
                                        <option value="Manga">Tomaya</option>
                                        <option value="Novel">Tim Kane</option>
                                    </select>
                                </div>
                            </div>
                            <div className='row my-3'>
                                <div className='col-4'>
                                    <label className='form-label'>Price:</label>
                                    <input className='form-control' type='text' placeholder='Book Price' />
                                </div>
                                <div className='col-4'>
                                    <label className='form-label'>Language:</label>
                                    <input className='form-control' type='text' placeholder='Language' />
                                </div>
                                <div className='col-4'>
                                    <label className='form-label'>Translator:</label>
                                    <input className='form-control' type='text' placeholder='Translator' />
                                </div>
                            </div>
                            <div className='row my-3'>
                                <div className='col-4'>
                                    <label className='form-label'>Publishing Day:</label>
                                    <input className='form-control' type='text' placeholder='Publishing Day' />
                                </div>
                                <div className='col-4'>
                                    <label className='form-label'>Publishing Company:</label>
                                    <input className='form-control' type='text' placeholder='Publishing Company' />
                                </div>
                                <div className='col-4'>
                                    <label className='form-label'>Product Code:</label>
                                    <input className='form-control' type='text' placeholder='Product Code' />
                                </div>
                            </div>
                            <div className='row my-3'>
                                <div className='col-3'>
                                    <label className='form-label'>Size:</label>
                                    <input className='form-control' type='text' placeholder='Book Size' />
                                </div>
                                <div className='col-3'>
                                    <label className='form-label'>Pages:</label>
                                    <input className='form-control' type='text' placeholder='Pages' />
                                </div>
                                <div className='col-3'>
                                    <label className='form-label'>Volume:</label>
                                    <input className='form-control' type='text' placeholder='Volume' />
                                </div>
                                <div className='col-3'>
                                    <label className='form-label'>Format:</label>
                                    <input className='form-control' type='text' placeholder='Format' />
                                </div>
                            </div>
                            <div className='row my-3'>
                                <div className='col-6'>
                                    <label className='form-label'>Publisher:</label>
                                    <select className="form-select">
                                        <option defaultValue=''>Select...</option>
                                        <option value="0">The New York Times</option>
                                        <option value="1">The Japan News</option>
                                    </select>
                                </div>
                                <div className='col-6'>
                                    <label className='form-label'>Book Category:</label>
                                    <select className="form-select">
                                        <option defaultValue=''>Select...</option>
                                        <option value="0">Manga</option>
                                        <option value="1">Science</option>
                                        <option value="2">Technology</option>
                                    </select>
                                </div>
                            </div>
                            <div className='my-4 col-12'>
                                <label className='form-label'>Description:</label>
                                <textarea class="form-control description" placeholder="Description"></textarea>
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

export default ModalBook;