import React, { useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Modal.scss';

import { useImmer } from 'use-immer';
import { postCreateNewPublisher, putUpdatePublisher, deletePublisher } from '../../Services/adminServices';
import { successToast, errorToast } from '../../Toast/Toast';

const ModalPublisher = (props) => {
    const { show, setShow, type, data, fetchPublisher } = props;

    const [modalData, setModalData] = useImmer();

    const handleClose = () => {
        setShow(false)
        setModalData({});
    };

    const handleOnChange = (type, value) => {
        setModalData(draft => {
            draft[type] = value;
        })
    }

    const checkValidName = () => {

        if (!modalData?.publisher_name) {
            errorToast('Empty name is not allowed !');
            return false;
        }

        return true;
    }

    const showToast = (result) => {
        if (result.EC === 0) {
            setShow(false);
            successToast(result.EM);
            fetchPublisher();
        }
        if (result.EC === 1) {
            errorToast(result.EM);
        }
    }

    const handleButtonOnClick = async () => {
        if (type === 'CREATE') {

            if (!checkValidName()) {
                return;
            }

            let result = await postCreateNewPublisher(modalData);
            if (result) {
                showToast(result);
            }

        } else if (type === 'UPDATE') {

            if (!checkValidName()) {
                return;
            }

            let result = await putUpdatePublisher(modalData);
            if (result) {
                showToast(result);
            }
        } else {

            let result = await deletePublisher(modalData?.publisher_id)
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
                size={type !== 'DELETE' ? 'lg' : ''}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{type === 'CREATE' ? 'Add New Publisher' : (type === 'UPDATE' ? 'Update Publisher' : 'Delete Publisher')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {type === 'DELETE' ?
                        <span>Are you sure to remove this <strong>{modalData?.publisher_name}</strong> publisher?</span>
                        :
                        <>
                            <div className='row'>
                                <div className='col-6'>
                                    <label className='form-label'>Publisher Name:</label>
                                    <input
                                        className='form-control'
                                        type='text'
                                        placeholder='Publisher Name'
                                        onChange={(event) => handleOnChange('publisher_name', event.target.value)}
                                        value={modalData?.publisher_name}
                                    />
                                </div>
                                <div className='col-6'>
                                    <label className='form-label'>Contact:</label>
                                    <input
                                        className='form-control'
                                        type='text'
                                        placeholder='Phone number'
                                        onChange={(event) => handleOnChange('publisher_phone', event.target.value)}
                                        value={modalData?.publisher_phone}
                                    />
                                </div>
                            </div>
                            <div className='my-4 col-12'>
                                <label className='form-label'>Description:</label>
                                <textarea
                                    className="form-control description"
                                    placeholder="Description"
                                    onChange={(event) => handleOnChange('publisher_description', event.target.value)}
                                    value={modalData?.publisher_description}
                                />
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

export default ModalPublisher;