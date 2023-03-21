import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Modal.scss';

const ModalPublisher = (props) => {
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
                <Modal.Title>{type === 'CREATE' ? 'Add New Publisher' : (type === 'UPDATE' ? 'Update Publisher' : 'Delete Publisher')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {type === 'DELETE' ?
                        <span>Are you sure to remove this <strong>publisher</strong> ?</span>
                        :
                        <>
                            <div className='row'>
                                <div className='col-6'>
                                    <label className='form-label'>Publisher Name:</label>
                                    <input className='form-control' type='text' placeholder='Publisher Name' />
                                </div>
                                <div className='col-6'>
                                    <label className='form-label'>Contact:</label>
                                    <input className='form-control' type='text' placeholder='Phone number' />
                                </div>
                            </div>
                            <div className='my-4 col-12'>
                                <label className='form-label'>Description:</label>
                                <textarea class="form-control description" placeholder="Description"></textarea>
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

export default ModalPublisher;