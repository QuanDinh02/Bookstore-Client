import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalProfile = (props) => {
    const { show, setShow, handleEditProfile } = props;

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
                    <span>Are you sure to edit <strong>profile</strong> ?</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleEditProfile}>Save</Button>
                    <Button variant="light" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalProfile;