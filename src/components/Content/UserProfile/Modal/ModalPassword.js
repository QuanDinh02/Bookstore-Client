import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalPassword = (props) => {
    const { show, setShow, handleChangePassword } = props;

    const handleClose = () => {
        setShow(false);
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>
                    <span>Are you sure to change the <strong>password</strong> ?</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleChangePassword}>Save</Button>
                    <Button variant="light" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalPassword;