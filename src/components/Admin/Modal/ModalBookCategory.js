import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalAddNewBookCategory = (props) => {
    const { show, setShow, type } = props;

    const handleClose = () => setShow(false);

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{type === 'CREATE' ? 'Add New Category' : (type === 'UPDATE' ? 'Update Category' : 'Delete Category')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {type === 'DELETE' ?
                        <span>Are you sure to remove this book category ?</span>
                        :
                        <>
                            <div className='col-12'>
                                <label className='form-label'>Book Category Name:</label>
                                <input className='form-control' type='text' placeholder='Book Category Name' />
                            </div>
                            <div className='my-3 col-12'>
                                <label className='form-label'>Book Category Group:</label>
                                <select className="form-select">
                                    <option defaultValue=''>Select...</option>
                                    <option value="Science">Science</option>
                                    <option value="Manga">Manga</option>
                                    <option value="Novel">Novel</option>
                                </select>
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

export default ModalAddNewBookCategory;