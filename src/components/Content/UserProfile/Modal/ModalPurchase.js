import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteOrder } from '../../../Services/adminServices';
import { successToast, errorToast } from '../../../Toast/Toast';
import { useHistory } from 'react-router-dom';

const ModalPurchase = (props) => {
    const { show, setShow, order_id } = props;
    const history = useHistory();

    const handleClose = () => {
        setShow(false);
    }

    const handleDeleteOrder = async () => {
        let result = await deleteOrder(order_id);
        if (result && result.EC === 0) {
            setShow(false);
            successToast(result.EM);
            setTimeout(() => {
                history.push('/user/purchase');
            }, 1000);
        } else {
            setShow(false);
            errorToast(result.EM);
        }
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
                    <span>Are you sure to delete this <strong>order (#{order_id})</strong> ?</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={handleDeleteOrder}>Confirm</Button>
                    <Button variant="light" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalPurchase;