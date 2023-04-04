import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Modal.scss';

const ModalDeleteOrder = (props) => {
    const { show, setShow, handleDeleteOrder } = props;

    const handleClose = () => setShow(false);

    const handleButtonOnClick = async () => {
        handleDeleteOrder();
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
                    <Modal.Title>Delete Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>Are you sure to remove this <strong>order</strong> ?</span>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={handleButtonOnClick}>Confirm</Button>
                    <Button variant="light" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteOrder;