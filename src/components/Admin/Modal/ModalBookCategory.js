import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
    getAllBookCategoryGroup, postCreateNewBookCategory,
    putUpdateBookCategory, deleteBookCategory
} from '../../Services/adminServices';
import { useImmer } from 'use-immer';
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

const ModalBookCategory = (props) => {
    const { show, setShow, type, data, fetchBookCategory } = props;

    const [categoryGroup, setCategoryGroup] = useState([]);
    const [modalData, setModalData] = useImmer();

    const handleClose = () => setShow(false);

    const fetchAllCategoryGroup = async () => {
        let result = await getAllBookCategoryGroup(0, 0);
        if (result && result.EC === 0) {
            setCategoryGroup(result.DT);
        }
    }

    const handleOnChange = (type, value) => {
        setModalData(draft => {
            draft[type] = value;
        })
    }

    const checkValidInputs = () => {

        if (!modalData?.category_name || !modalData?.category_group) {
            toast.error('Empty inputs are not allowed !', toast_error);
            return false;
        }

        if (modalData?.category_group === '0') {
            toast.error('Category group has not selected yet !', toast_error);
            return false;
        }

        return true;
    }

    const showToast = (result) => {
        if (result.EC === 0) {
            setShow(false);
            toast.success(result.EM, toast_success);
            fetchBookCategory();
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

            let result = await postCreateNewBookCategory(modalData?.category_name, modalData?.category_group);
            if (result) {
                showToast(result);
            }

        } else if (type === 'UPDATE') {

            if (!checkValidInputs()) {
                return;
            }

            let result = await putUpdateBookCategory(modalData?.category_id, modalData?.category_name, modalData?.category_group)
            if (result) {
                showToast(result);
            }
        } else {

            let result = await deleteBookCategory(modalData?.category_id)
            if (result) {
                showToast(result);
            }
        }
    }

    useEffect(() => {
        fetchAllCategoryGroup();
    }, []);

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
                    <Modal.Title>{type === 'CREATE' ? 'Add New Category' : (type === 'UPDATE' ? 'Update Category' : 'Delete Category')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {type === 'DELETE' ?
                        <span>Are you sure to remove this <strong>{modalData?.category_name}</strong> book category ?</span>
                        :
                        <>
                            <div className='col-12'>
                                <label className='form-label'>Book Category Name:</label>
                                <input
                                    className='form-control'
                                    type='text'
                                    placeholder='Book Category Name'
                                    onChange={(event) => handleOnChange('category_name', event.target.value)}
                                    value={modalData?.category_name}
                                />
                            </div>
                            <div className='my-3 col-12'>
                                <label className='form-label'>Book Category Group:</label>
                                <select
                                    className="form-select"
                                    onChange={(event) => handleOnChange('category_group', event.target.value)}
                                    value={modalData?.category_group}
                                >
                                    <option value={"0"} key={`group-option-0`}>Select...</option>
                                    {categoryGroup && categoryGroup.length > 0 &&
                                        categoryGroup.map(item => {
                                            return (
                                                <option
                                                    key={`group-option-${item.id}`}
                                                    value={item.id}
                                                >
                                                    {item.name}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </>
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

export default ModalBookCategory;