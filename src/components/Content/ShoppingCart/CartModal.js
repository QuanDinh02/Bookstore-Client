import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Cart.scss';

const CartModal = (props) => {
    const { show, setShow, confirmCart } = props;

    const handleClose = () => setShow(false);

    const handleOrder = () => {
        handleClose();
        confirmCart();
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
                {/* <Modal.Header closeButton>
                    <Modal.Title>{type === 'UPDATE' ? 'Order Detail' : 'Delete Order'}</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    <span className='cart-confirm-modal'>Are you sure to order ?</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={handleOrder}>Confirm</Button>
                    <Button variant="light" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CartModal;