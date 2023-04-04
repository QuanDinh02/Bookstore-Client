import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Modal.scss';

const ModalOrderDetail = (props) => {
    const { show, setShow, action, updateStatus, deleteOrderDetailItem } = props;

    const handleClose = () => {
        setShow(false)
    };

    const handleButtonOnClick = () => {
        if(action === 'UPDATE') {
            updateStatus();
        } else {
            deleteOrderDetailItem();
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Body>
                    {action === 'DELETE' ?
                        <span>Are you sure to remove this order <strong>item</strong> ?</span>
                        :
                        <span>Are you sure to update order <strong>status</strong> ?</span>
                    }

                </Modal.Body>
                <Modal.Footer>
                    {action === 'UPDATE' ?
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

export default ModalOrderDetail;