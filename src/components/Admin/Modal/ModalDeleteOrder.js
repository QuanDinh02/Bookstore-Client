import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Modal.scss';
import toast from 'react-hot-toast';

const toast_success = {
    style: {
        padding: '1rem'
    },
    iconTheme: {
        primary: '#087B44'
    }
}

const toast_error = {
    style: {
        padding: '1rem'
    },
    iconTheme: {
        primary: '#dd2222'
    }
}


const ModalDeleteOrder = (props) => {
    const { show, setShow, data, fetchOrders } = props;

    const [modalData, setModalData] = useState('');

    const handleClose = () => {
        setShow(false)
        setModalData('');
    };

    const showToast = (result) => {
        if (result.EC === 0) {
            setShow(false);
            toast.success(result.EM, toast_success);
            fetchOrders();
        }
        if (result.EC === 1) {
            toast.error(result.EM, toast_error);
        }
    }

    const handleButtonOnClick = async () => {
        // let result = await deletePublisher(modalData?.publisher_id)
        // if (result) {
        //     showToast(result);
        // }
    }

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
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>Are you sure to remove this <strong>#{modalData}</strong> order?</span>

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