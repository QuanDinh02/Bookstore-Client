import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Cart.scss';
import { useSelector } from 'react-redux';

const CartModal = (props) => {
    const { show, setShow, confirmCart, login } = props;

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    const handleClose = () => setShow(false);

    const handleOrder = () => {
        handleClose();
        if (!isAuthenticated) {
            login();
        } else {
            confirmCart();
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
                    {isAuthenticated === false ?
                        <span className='cart-confirm-modal'>Please login to order</span>
                        :
                        <span className='cart-confirm-modal'>Are you sure to order ?</span>
                    }
                </Modal.Body>
                <Modal.Footer>
                    {isAuthenticated === false ?
                        <Button variant="btn btn-success" onClick={handleOrder}>Login</Button>
                        :
                        <Button variant="outline-danger" onClick={handleOrder}>Confirm</Button>
                    }
                    <Button variant="light" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CartModal;