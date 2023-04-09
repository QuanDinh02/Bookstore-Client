import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdCloudUpload } from "react-icons/md";
import { useImmer } from 'use-immer';
import { postCreateNewAuthor, putUpdateAuthor, deleteAuthor } from '../../Services/adminServices';
import './Modal.scss';
import { successToast, errorToast } from '../../Toast/Toast';

const ModalAuthor = (props) => {
    const { show, setShow, type, data, fetchAuthors } = props;

    const [modalData, setModalData] = useImmer();
    const [previewImage, setPreviewImage] = useState('');

    const handleClose = () => {
        setPreviewImage('');
        setShow(false);
    }

    const handleOnChange = (type, value) => {
        if (type === 'author_image') {
            setPreviewImage(URL.createObjectURL(value));
        }

        setModalData(draft => {
            draft[type] = value;
        })
    }

    const checkValidNameInput = () => {

        if (!modalData?.author_name) {
            errorToast('Empty author name is not allowed !');
            return false;
        }

        return true;
    }

    const showToast = (result) => {
        if (result.EC === 0) {
            handleClose();
            successToast(result.EM);
            fetchAuthors();
        }
        if (result.EC === 1) {
            errorToast(result.EM);
        }
    }

    const handleButtonOnClick = async () => {
        if (type === 'CREATE') {

            if (!checkValidNameInput()) {
                return;
            }

            let result = await postCreateNewAuthor(modalData);
            if (result) {
                showToast(result);
            }

        } else if (type === 'UPDATE') {

            if (!checkValidNameInput()) {
                return;
            }

            let result = await putUpdateAuthor(modalData);
            if (result) {
                showToast(result);
            }
        } else {

            let result = await deleteAuthor(modalData?.author_id)
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
                    <Modal.Title>{type === 'CREATE' ? 'Add New Author' : (type === 'UPDATE' ? 'Update Author' : 'Delete Author')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {type === 'DELETE' ?
                        <span>Are you sure to remove this <strong>{modalData?.author_name}</strong> author ?</span>
                        :
                        <>
                            <div className='col-12'>
                                <label className='form-label'>Author Name:</label>
                                <input
                                    className='form-control'
                                    type='text'
                                    placeholder='Author Name'
                                    onChange={(event) => handleOnChange('author_name', event.target.value)}
                                    value={modalData?.author_name}
                                />
                            </div>
                            <div className='my-4 col-12 '>
                                <label className='form-label'>Description:</label>
                                <textarea
                                    className="form-control description"
                                    placeholder="Description"
                                    onChange={(event) => handleOnChange('author_description', event.target.value)}
                                    value={modalData?.author_description}
                                />
                            </div>
                            <div className='my-4 ImageUpload'>
                                <label htmlFor="formFile" className="form-label d-flex align-items-center gap-2 file_upload"><MdCloudUpload /> Upload File</label>
                                <input
                                    className="form-control"
                                    type="file"
                                    id="formFile"
                                    hidden
                                    onChange={(event) => handleOnChange('author_image', event.target.files[0])}
                                />
                            </div>
                            <div className='image-preview my-4'>
                                {previewImage ?
                                    <img src={previewImage} alt='' />
                                    :
                                    (type === 'UPDATE' && data?.author_image ?
                                        <img src={`data:image/jpeg;base64,${data.author_image}`} alt='' />
                                        :
                                        <span>Preview Image</span>
                                    )
                                }
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

export default ModalAuthor;