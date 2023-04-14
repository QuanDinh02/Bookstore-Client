import { FaRegTrashAlt } from 'react-icons/fa';
import { MdModeEditOutline, MdSell } from 'react-icons/md';
import { HiChevronUpDown } from 'react-icons/hi2';
import { AiOutlinePlus } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';
import { useCallback, useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import NoImage from '../../../assets/image/NoImage.png';
import ModalBook from '../Modal/ModalBook';
import { useImmer } from 'use-immer';
import { getBooksWithPagination, getBooksByName } from '../../Services/adminServices';
import _ from 'lodash';
import { NumberFormat } from '../../FormatNumber/currencyFormat';

const BookList = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [modalType, setModalType] = useState('');

    const [showModalBook, setShowModalBook] = useState(false);
    const [booksList, setBooksList] = useImmer([]);
    const [bookCurrentPage, setBookCurrentPage] = useState(1);
    const [bookLimit, setBookLimit] = useState(10);

    const [searchBook, setSearchBook] = useState('');
    const [listLoading, setListLoading] = useState(false);

    const { setTitle } = props;

    const defaultValue = {
        name: '',
        author: "0",
        price: '',
        language: '',
        translator: '',
        publishingDay: '',
        publishingCompany: '',
        productCode: '',
        size: '',
        pages: '',
        volume: '',
        format: '',
        publisher: "0",
        category: "0",
        description: '',
        image: '',
    }

    const [modifiedData, setModifiedData] = useState({
        ...defaultValue
    });

    // handle pagination
    const handlePageClick = (event) => {
        setBookCurrentPage(+event.selected + 1);
    }

    const handleShowModal = (action, data = {}) => {
        setModalType(action);

        if (action === 'CREATE') {
            setModifiedData({
                ...defaultValue
            })
        }
        else if (action === 'UPDATE') {
            setModifiedData({
                id: data?.id,
                name: data?.name,
                author: data?.Author.id,
                price: data?.price,
                language: data?.language,
                translator: data?.translator,
                publishingDay: data?.publishingDay,
                publishingCompany: data?.publishingCompany,
                productCode: data?.productCode,
                size: data?.size,
                pages: data?.pages,
                volume: data?.volume,
                format: data?.format,
                publisher: data?.Publisher.id,
                category: data?.BookCategory.id,
                description: data?.description,
                image: data?.image,
            })
        }
        else if (action === 'UPDATE-SELLING') {
            setModifiedData({
                book_id: data?.id,
                current_price: data?.SellingBook.current_price,
                quantity: data?.SellingBook.quantity,
                quality: data?.SellingBook.quality,
                status: data?.SellingBook.status
            })
        }
        else {
            setModifiedData({
                book_id: data?.id,
                name: data?.name
            })
        }

        setShowModalBook(true);
    }

    const fetchBooksWithPagination = async () => {
        let result = await getBooksWithPagination(bookLimit, bookCurrentPage);
        if (result && result.EC === 0) {
            setBooksList(result.DT);
        }
    }


    const bookSearch = _.debounce(async (book_name) => {
        let result = await getBooksByName(bookLimit, bookCurrentPage, book_name);
        if (result && result.EC === 0) {
            setBooksList(result.DT);
        }
        setListLoading(false);
    }, 1000);

    const handleSearchBook = (book_name) => {
        setSearchBook(book_name);
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setListLoading(true);
            setBookCurrentPage(1);
            bookSearch(searchBook);
        }
    }

    useEffect(() => {
        if (searchBook) {
            setListLoading(true);
            bookSearch(searchBook);
        } else {
            fetchBooksWithPagination();
        }

    }, [bookCurrentPage]);

    useEffect(() => {
        setTitle('Books');
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    return (
        <>
            {isLoading === true ?
                <TailSpin
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass="d-flex justify-content-center align-items-center tail-spin"
                    visible={true}
                />
                :
                <div className="books-management-container">
                    <div className="books-list-top d-flex justify-content-between align-items-center px-4 py-3">
                        <span className="table-title">Books List</span>
                        <button className="btn" onClick={() => handleShowModal('CREATE')}><AiOutlinePlus /> Add New Book</button>
                    </div>
                    <div className="books-list-bottom px-4 py-3">
                        <div className="select-search-box d-flex justify-content-end">
                            <div className="select-box d-flex align-items-center gap-1">
                                <label>Search: </label>
                                <input
                                    type='text'
                                    className="form-control"
                                    placeholder='Search book name...'
                                    value={searchBook}
                                    onChange={(event) => handleSearchBook(event.target.value)}
                                    onKeyDown={(event) => handleKeyPress(event)}
                                />
                            </div>
                        </div>
                        {listLoading === true ?
                            <TailSpin
                                height="60"
                                width="60"
                                color="#4fa94d"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperStyle={{}}
                                wrapperClass="d-flex justify-content-center align-items-center tail-spin"
                                visible={true}
                            />
                            :
                            <div className="books-list mt-4">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <td className='table-head'>
                                                <span className='d-flex align-items-center gap-2'>No<HiChevronUpDown className='filter-icon' /></span>
                                            </td>
                                            <td className='table-head'>
                                                <span>Book image</span>
                                            </td>
                                            <td className='table-head'>
                                                <span className='d-flex align-items-center gap-2'>Book Name<HiChevronUpDown className='filter-icon' /></span>
                                            </td>
                                            <td className='table-head'>
                                                <span className='d-flex align-items-center gap-2'>Book Category<HiChevronUpDown className='filter-icon' /></span>
                                            </td>
                                            <td className='table-head'>
                                                <span className='d-flex align-items-center gap-2'>Book Author<HiChevronUpDown className='filter-icon' /></span>
                                            </td>
                                            <td className='table-head'>
                                                <span className='d-flex align-items-center gap-2'>Book Description<HiChevronUpDown className='filter-icon' /></span>
                                            </td>
                                            <td className='table-head'>
                                                <span className='d-flex align-items-center gap-2'>Price<HiChevronUpDown className='filter-icon' /></span>
                                            </td>
                                            <td className='table-head'>
                                                <span className='d-flex align-items-center gap-2'>Current Price<HiChevronUpDown className='filter-icon' /></span>
                                            </td>
                                            <td className='table-head'>
                                                <span className='d-flex align-items-center gap-2'>Actions<HiChevronUpDown className='filter-icon' /></span>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {booksList?.books && booksList?.books.length > 0 &&
                                            booksList?.books.map((item, index) => {
                                                return (
                                                    <tr key={`book-item-${item.id}`}>
                                                        <td>{(bookCurrentPage - 1) * bookLimit + index + 1}</td>
                                                        <td className='book-img'>
                                                            {item.image ?
                                                                <img src={`data:image/jpeg;base64,${item.image}`} alt='' />
                                                                :
                                                                <img src={NoImage}></img>
                                                            }
                                                        </td>
                                                        <td className='book-name'>{item.name}</td>
                                                        <td className='category'>{item.BookCategory.name}</td>
                                                        <td className='author'>{item.Author.name}</td>
                                                        <td className='book-description'>
                                                            <div className='description-main'>
                                                                {item.description}
                                                            </div>

                                                        </td>
                                                        <td className='price'>{NumberFormat(item.price)}</td>
                                                        <td className='current_price'>{NumberFormat(item.SellingBook.current_price)}</td>
                                                        <td className='actions text-center'>
                                                            <div className='d-flex gap-3'>
                                                                <div className='edit-btn px-1' title='Edit' onClick={() => handleShowModal('UPDATE', item)}>
                                                                    <MdModeEditOutline className='icon' />
                                                                </div>
                                                                <div className='delete-btn px-1' title='Delete' onClick={() => handleShowModal('DELETE', item)}>
                                                                    <FaRegTrashAlt className='icon' />
                                                                </div>
                                                                <div className='update-btn px-1' title='Selling Update' onClick={() => handleShowModal('UPDATE-SELLING', item)}>
                                                                    <MdSell className='icon' />
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <div className='pagination-container pt-3'>
                                    <ReactPaginate
                                        nextLabel="next >"
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={3}
                                        marginPagesDisplayed={3}
                                        pageCount={booksList?.total_pages}
                                        forcePage={bookCurrentPage - 1}
                                        previousLabel="< previous"
                                        pageClassName="page-item"
                                        pageLinkClassName="page-link page-background"
                                        previousClassName="page-item"
                                        previousLinkClassName="page-link pre-next"
                                        nextClassName="page-item"
                                        nextLinkClassName="page-link pre-next"
                                        breakLabel="..."
                                        breakClassName="page-item"
                                        breakLinkClassName="page-link"
                                        containerClassName="pagination justify-content-end"
                                        activeLinkClassName="page-active-background"
                                        renderOnZeroPageCount={null}
                                    />
                                </div>
                            </div>
                        }

                    </div>
                    <ModalBook
                        data={modifiedData}
                        type={modalType}
                        show={showModalBook}
                        setShow={setShowModalBook}
                        fetchBooks={fetchBooksWithPagination}
                    />
                </div>
            }
        </>
    )
}

export default BookList;
