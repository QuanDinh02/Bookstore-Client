import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useImmer } from 'use-immer';
import toast from 'react-hot-toast';
import {
    createNewUserAddress, deleteAddress,
    updateUserAddress, setDefaultAddress
} from '../../../Services/userServices';

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

const Modal_Button_Bg_Color = {
    'UPDATE': 'warning',
    'DELETE': 'outline-danger',
    'SET_DEFAULT': 'warning'
}

const Modal_Button_Content = {
    'UPDATE': 'Save',
    'DELETE': 'Confirm',
    'SET_DEFAULT': 'Save'
}

const ModalAddress = (props) => {
    const { show, setShow, type, data, fetchAddress } = props;

    const [modalData, setModalData] = useImmer();

    const handleClose = () => {
        setShow(false);
    }

    const handleOnChange = (type, value) => {
        setModalData(draft => {
            draft[type] = value;
        })
    }

    const checkValidInputs = () => {

        if (!modalData?.name) {
            toast.error('Empty name is not allowed !', toast_error);
            return false;
        }

        if (!modalData?.phone) {
            toast.error('Empty phone is not allowed !', toast_error);
            return false;
        }

        if (!modalData?.address) {
            toast.error('Empty address is not allowed !', toast_error);
            return false;
        }

        return true;
    }

    const showToast = (result) => {
        if (result.EC === 0) {
            handleClose();
            toast.success(result.EM, toast_success);
            fetchAddress();
        }
        if (result.EC === 1) {
            toast.error(result.EM, toast_error);
        }
    }

    const handleButtonOnClick = async () => {
        if (type === 'CREATE') {

            if (!checkValidInputs()) {
                return;
            }

            let result = await createNewUserAddress(modalData);
            if (result) {
                showToast(result);
            }

        } else if (type === 'UPDATE') {

            if (!checkValidInputs()) {
                return;
            }

            let result = await updateUserAddress(modalData);
            if (result) {
                showToast(result);
            }
        } else if (type === 'SET_DEFAULT') {

            let result = await setDefaultAddress(modalData);
            if (result) {
                showToast(result);
            }

        } else {

            let result = await deleteAddress(modalData?.address_id)
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

                </Modal.Header>
                <Modal.Body>
                    {type === 'DELETE' || type === 'SET_DEFAULT' ?
                        (type === 'DELETE' ?
                            <span>Are you sure to remove this address?</span>
                            :
                            <span>Do you want to set this address <strong>DEFAULT</strong> ?</span>
                        )

                        :
                        <>
                            <div className='row'>
                                <div className='col-6'>
                                    <input
                                        className='form-control'
                                        type='text'
                                        placeholder='Full Name'
                                        onChange={(event) => handleOnChange('name', event.target.value)}
                                        value={modalData?.name}
                                    />
                                </div>

                                <div className='col-6'>
                                    <input
                                        className='form-control'
                                        type='text'
                                        placeholder='Phone Number'
                                        onChange={(event) => handleOnChange('phone', event.target.value)}
                                        value={modalData?.phone}
                                    />
                                </div>
                            </div>
                            <div className='my-4 col-12'>
                                <textarea
                                    class="form-control address"
                                    placeholder="Streen Name, Building, House No"
                                    onChange={(event) => handleOnChange('address', event.target.value)}
                                    value={modalData?.address}
                                />
                            </div>
                        </>
                    }
                </Modal.Body>
                <Modal.Footer>
                    {type === 'CREATE' ?
                        <Button variant="success" className='create-btn' onClick={handleButtonOnClick}>Submit</Button>
                        :
                        <Button variant={`${Modal_Button_Bg_Color[type]}`} onClick={handleButtonOnClick}>{Modal_Button_Content[type]}</Button>
                    }
                    <Button variant="light" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAddress;