import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdCloudUpload } from "react-icons/md";
import {
    getAuthorWithPagination, getAllBookCategory, getPublisherWithPagination,
    postCreateNewBook, putUpdateBook, deleteBook, putUpdateSellingBook
} from '../../Services/adminServices';

import './Modal.scss';

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

const Modal_Title = {
    'CREATE': 'Add New Book',
    'UPDATE': 'Update Book',
    'DELETE': 'Delete Book',
    'UPDATE-SELLING': 'Selling Information'
}

const Modal_Button_Bg_Color = {
    'UPDATE': 'warning',
    'DELETE': 'outline-danger',
    'UPDATE-SELLING': 'info'
}

const Modal_Button_Content = {
    'UPDATE': 'Save',
    'DELETE': 'Confirm',
    'UPDATE-SELLING': 'Save'
}

const ModalBook = (props) => {
    const { show, setShow, type, data, fetchBooks } = props;

    const [modalData, setModalData] = useImmer();
    const [previewImage, setPreviewImage] = useState('');

    const [authorsList, setAuthorsList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [publishersList, setPublishersList] = useState([]);

    const handleClose = () => {
        setPreviewImage('');
        setShow(false);
    }

    const handleOnChange = (type, value) => {
        if (type === 'image') {
            setPreviewImage(URL.createObjectURL(value));
        }

        setModalData(draft => {
            draft[type] = value;
        })
    }

    const checkValidNameInput = () => {

        if (!modalData?.name) {
            toast.error('Empty book name is not allowed !', toast_error);
            return false;
        }

        if (modalData?.author === "0") {
            toast.error('Empty book author is not allowed !', toast_error);
            return false;
        }

        if (modalData?.publisher === "0") {
            toast.error('Empty book publisher is not allowed !', toast_error);
            return false;
        }

        if (modalData?.book_category === "0") {
            toast.error('Empty book category is not allowed !', toast_error);
            return false;
        }

        return true;
    }

    const showToast = (result) => {
        if (result.EC === 0) {
            handleClose();
            toast.success(result.EM, toast_success);
            fetchBooks();
        }
        if (result.EC === 1) {
            toast.error(result.EM, toast_error);
        }
    }

    const handleButtonOnClick = async () => {
        if (type === 'CREATE') {

            if (!checkValidNameInput()) {
                return;
            }

            let result = await postCreateNewBook(modalData);
            if (result) {
                showToast(result);
            }

        } else if (type === 'UPDATE') {

            if (!checkValidNameInput()) {
                return;
            }

            let result = await putUpdateBook(modalData);
            if (result) {
                showToast(result);
            }
        } else if (type === 'UPDATE-SELLING') {
            let result = await putUpdateSellingBook(modalData)
            if (result) {
                showToast(result);
            }
        }
        else {

            let result = await deleteBook(modalData?.book_id)
            if (result) {
                showToast(result);
            }
        }
    }

    const fetchAllAuthors = async () => {
        let result = await getAuthorWithPagination(0, 0);
        if (result && result.EC === 0) {
            setAuthorsList(result.DT);
        }
    }

    const fetchAllBookCategory = async () => {
        let result = await getAllBookCategory(0, 0);
        if (result && result.EC === 0) {
            setCategoryList(result.DT);
        }
    }

    const fetchAllPublishers = async () => {
        let result = await getPublisherWithPagination(0, 0);
        if (result && result.EC === 0) {
            setPublishersList(result.DT);
        }
    }

    useEffect(() => {
        fetchAllAuthors();
        fetchAllBookCategory();
        fetchAllPublishers();
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
                size={type !== 'DELETE' ? 'lg' : ''}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{Modal_Title[type]}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {type === 'DELETE' ?
                        <span>Are you sure to remove this <strong>{modalData?.name}</strong> book?</span>
                        :
                        (type === 'UPDATE-SELLING' ?
                            <>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label className='form-label'>Current Price:</label>
                                        <input
                                            className='form-control'
                                            type='text'
                                            placeholder='Current Price'
                                            onChange={(event) => handleOnChange('current_price', event.target.value)}
                                            value={modalData?.current_price}
                                        />
                                    </div>
                                    <div className='col-6'>
                                        <label className='form-label'>Quantity:</label>
                                        <input
                                            className='form-control'
                                            type='text'
                                            placeholder='Quantity'
                                            onChange={(event) => handleOnChange('quantity', event.target.value)}
                                            value={modalData?.quantity}
                                        />
                                    </div>
                                </div>
                                <div className='row my-3'>
                                    <div className='col-6'>
                                        <label className='form-label'>Quality:</label>
                                        <input
                                            className='form-control'
                                            type='text'
                                            placeholder='Quality'
                                            onChange={(event) => handleOnChange('quality', event.target.value)}
                                            value={modalData?.quality}
                                        />
                                    </div>
                                    <div className='col-6'>
                                        <label className='form-label'>Status:</label>
                                        <select
                                            className="form-select"
                                            onChange={(event) => handleOnChange('status', event.target.value)}
                                            value={modalData?.status}
                                        >
                                            <option defaultValue=''>Select...</option>
                                            <option value="On sale">On sale</option>
                                            <option value="Out of order">Out of order</option>
                                            <option value="No more">No more</option>
                                        </select>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label className='form-label'>Book:</label>
                                        <input
                                            className='form-control'
                                            type='text'
                                            placeholder='Book Name'
                                            onChange={(event) => handleOnChange('name', event.target.value)}
                                            value={modalData?.name}
                                        />
                                    </div>

                                    <div className='col-6'>
                                        <label className='form-label'>Author:</label>
                                        <select
                                            className="form-select"
                                            onChange={(event) => handleOnChange('author', event.target.value)}
                                            value={modalData?.author}
                                        >
                                            <option value={"0"} key={`author-option-0`}>Select...</option>
                                            {authorsList && authorsList.length > 0 &&
                                                authorsList.map(item => {
                                                    return (
                                                        <option
                                                            key={`author-option-${item.id}`}
                                                            value={item.id}
                                                        >
                                                            {item.name}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='row my-3'>
                                    <div className='col-4'>
                                        <label className='form-label'>Price:</label>
                                        <input
                                            className='form-control'
                                            type='text'
                                            placeholder='Book Price'
                                            onChange={(event) => handleOnChange('price', event.target.value)}
                                            value={modalData?.price}
                                        />
                                    </div>
                                    <div className='col-4'>
                                        <label className='form-label'>Language:</label>
                                        <input
                                            className='form-control'
                                            type='text'
                                            placeholder='Language'
                                            onChange={(event) => handleOnChange('language', event.target.value)}
                                            value={modalData?.language}
                                        />
                                    </div>
                                    <div className='col-4'>
                                        <label className='form-label'>Translator:</label>
                                        <input
                                            className='form-control'
                                            type='text'
                                            placeholder='Translator'
                                            onChange={(event) => handleOnChange('translator', event.target.value)}
                                            value={modalData?.translator}
                                        />
                                    </div>
                                </div>
                                <div className='row my-3'>
                                    <div className='col-4'>
                                        <label className='form-label'>Publishing Day:</label>
                                        <input
                                            className='form-control'
                                            type='text'
                                            placeholder='Publishing Day'
                                            onChange={(event) => handleOnChange('publishingDay', event.target.value)}
                                            value={modalData?.publishingDay}
                                        />
                                    </div>
                                    <div className='col-4'>
                                        <label className='form-label'>Publishing Company:</label>
                                        <input
                                            className='form-control'
                                            type='text'
                                            placeholder='Publishing Company'
                                            onChange={(event) => handleOnChange('publishingCompany', event.target.value)}
                                            value={modalData?.publishingCompany}
                                        />
                                    </div>
                                    <div className='col-4'>
                                        <label className='form-label'>Product Code:</label>
                                        <input
                                            className='form-control'
                                            type='text'
                                            placeholder='Product Code'
                                            onChange={(event) => handleOnChange('productCode', event.target.value)}
                                            value={modalData?.productCode}
                                        />
                                    </div>
                                </div>
                                <div className='row my-3'>
                                    <div className='col-3'>
                                        <label className='form-label'>Size:</label>
                                        <input
                                            className='form-control'
                                            type='text'
                                            placeholder='Book Size'
                                            onChange={(event) => handleOnChange('size', event.target.value)}
                                            value={modalData?.size}
                                        />
                                    </div>
                                    <div className='col-3'>
                                        <label className='form-label'>Pages:</label>
                                        <input
                                            className='form-control'
                                            type='text'
                                            placeholder='Pages'
                                            onChange={(event) => handleOnChange('pages', event.target.value)}
                                            value={modalData?.pages}
                                        />
                                    </div>
                                    <div className='col-3'>
                                        <label className='form-label'>Volume:</label>
                                        <input
                                            className='form-control'
                                            type='text'
                                            placeholder='Volume'
                                            onChange={(event) => handleOnChange('volume', event.target.value)}
                                            value={modalData?.volume}
                                        />
                                    </div>
                                    <div className='col-3'>
                                        <label className='form-label'>Format:</label>
                                        <input
                                            className='form-control'
                                            type='text'
                                            placeholder='Format'
                                            onChange={(event) => handleOnChange('format', event.target.value)}
                                            value={modalData?.format}
                                        />
                                    </div>
                                </div>
                                <div className='row my-3'>
                                    <div className='col-6'>
                                        <label className='form-label'>Publisher:</label>
                                        <select
                                            className="form-select"
                                            onChange={(event) => handleOnChange('publisher', event.target.value)}
                                            value={modalData?.publisher}
                                        >
                                            <option value={"0"} key={`publisher-option-0`}>Select...</option>
                                            {publishersList && publishersList.length > 0 &&
                                                publishersList.map(item => {
                                                    return (
                                                        <option
                                                            key={`publisher-option-${item.id}`}
                                                            value={item.id}
                                                        >
                                                            {item.name}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='col-6'>
                                        <label className='form-label'>Book Category:</label>
                                        <select
                                            className="form-select"
                                            onChange={(event) => handleOnChange('category', event.target.value)}
                                            value={modalData?.category}
                                        >
                                            <option value={"0"} key={`book-category-option-0`}>Select...</option>
                                            {categoryList && categoryList.length > 0 &&
                                                categoryList.map(item => {
                                                    return (
                                                        <option
                                                            key={`book-category-option-${item.id}`}
                                                            value={item.id}
                                                        >
                                                            {item.name}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='my-4 col-12'>
                                    <label className='form-label'>Description:</label>
                                    <textarea
                                        class="form-control description"
                                        placeholder="Description"
                                        onChange={(event) => handleOnChange('description', event.target.value)}
                                        value={modalData?.description}
                                    />
                                </div>
                                <div className='my-4 ImageUpload'>
                                    <label for="formFile" class="form-label d-flex align-items-center gap-2 file_upload"><MdCloudUpload /> Upload File</label>
                                    <input
                                        class="form-control"
                                        type="file"
                                        id="formFile"
                                        hidden
                                        onChange={(event) => handleOnChange('image', event.target.files[0])}
                                    />
                                </div>
                                <div className='image-preview my-4'>
                                    {previewImage ?
                                        <img src={previewImage} alt='' />
                                        :
                                        (type === 'UPDATE' && data?.image ?
                                            <img src={`data:image/jpeg;base64,${data.image}`} alt='' />
                                            :
                                            <span>Preview Image</span>
                                        )
                                    }
                                </div>
                            </>
                        )
                    }

                </Modal.Body>
                <Modal.Footer>
                    {type === 'CREATE' ?
                        <Button variant="success" className='create-btn' onClick={handleButtonOnClick}>Save</Button>
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

export default ModalBook;