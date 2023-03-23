import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useImmer } from 'use-immer';
import toast from 'react-hot-toast';
import { 
    postCreateNewBookCategoryGroup,
    putUpdateBookCategoryGroup, deleteBookCategoryGroup
} from '../../Services/adminServices';

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

const ModalCategoryGroup = (props) => {
    const { show, setShow, type, data, fetchBookCategoryGroup } = props;

    const [modalData, setModalData] = useImmer();
    
    const handleClose = () => setShow(false);

    const handleOnChange = (type, value) => {
        setModalData(draft => {
            draft[type] = value;
        })
    }

    const checkValidInput = () => {
        if (!modalData?.category_group_name) {
            toast.error('Empty input is not allowed !', toast_error);
            return false;
        }
        return true;
    }

    const showToast = (result) => {
        if (result.EC === 0) {
            setShow(false);
            toast.success(result.EM, toast_success);
            fetchBookCategoryGroup();
        }
        if (result.EC === 1) {
            toast.error(result.EM, toast_error);
        }
    }

    const handleButtonOnClick = async () => {
        if (type === 'CREATE') {

            if (!checkValidInput()) {
                return;
            }

            let result = await postCreateNewBookCategoryGroup (modalData?.category_group_name);
            if (result) {
                showToast(result);
            }

        } else if (type === 'UPDATE') {

            if (!checkValidInput()) {
                return;
            }

            let result = await putUpdateBookCategoryGroup(modalData?.category_group_id, modalData?.category_group_name);
            if (result) {
                showToast(result);
            }

        } else {

            let result = await deleteBookCategoryGroup(modalData?.category_group_id);
            if (result) {
                showToast(result);
            }
        }
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
                    <Modal.Title>{type === 'CREATE' ? 'Add New Group' : (type === 'UPDATE' ? 'Update Category Group' : 'Delete Category Group')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {type === 'DELETE' ?
                        <span>Are you sure to remove this <strong>{modalData?.category_group_name}</strong> book category group ?</span>
                        :
                        <div className='col-12'>
                            <label className='form-label'>Book Category Group Name:</label>
                            <input
                                className='form-control'
                                type='text'
                                placeholder='Book Category Group Name'
                                onChange={(event) => handleOnChange('category_group_name', event.target.value)}
                                value={modalData?.category_group_name}
                            />
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    {type === 'CREATE' ?
                        <Button variant="success" className='create-btn' onClick={handleButtonOnClick}>Save</Button>
                        :
                        (type === 'UPDATE' ?
                            <Button variant="warning" onClick={handleButtonOnClick}>Save</Button>
                            :
                            <Button variant="outline-danger" onClick={handleButtonOnClick}>Confirm</Button>
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