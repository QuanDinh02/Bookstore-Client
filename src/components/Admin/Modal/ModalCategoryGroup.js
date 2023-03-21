import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalCategoryGroup = (props) => {
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
                    <Modal.Title>{type === 'CREATE' ? 'Add New Group' : (type === 'UPDATE' ? 'Update Category Group' : 'Delete Category Group')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {type === 'DELETE' ?
                        <span>Are you sure to remove this book category group ?</span>
                        :
                        <div className='col-12'>
                            <label className='form-label'>Book Category Group Name:</label>
                            <input className='form-control' type='text' placeholder='Book Category Group Name' />
                        </div>
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

export default ModalCategoryGroup;