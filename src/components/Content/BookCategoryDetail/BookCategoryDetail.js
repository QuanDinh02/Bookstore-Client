import { useHistory, useLocation, useParams } from 'react-router-dom';
import './BookCategoryDetail.scss';
import { Link } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx";
import { AiOutlineMenu } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";

import ReactPaginate from 'react-paginate';
import BookCategoryDetailSidebar from './BookCategoryDetailSidebar';
import { useEffect, useState } from 'react';
import MediaQuery, { useMediaQuery } from 'react-responsive';
import {
    getABookCategoryGroup, getBooksByCategoryGroup,
    getBooksByBookCategory, getBooksByAuthor,
    getBooksByPublisher
} from '../../Services/apiServices';

import { useDispatch } from "react-redux";
import { AddShoppingCart } from '../../../redux/action/actions';
import { NumberFormat } from '../../FormatNumber/currencyFormat';
import { TailSpin } from 'react-loader-spinner';
import _ from 'lodash';

const BookCategoryDetail = () => {

    const dispatch = useDispatch();

    const { id } = useParams();
    const [multiColumn, setMultiColumn] = useState(true);
    const [bookCategoryGroup, setBookCategoryGroup] = useState({});
    const [booksData, setBooksData] = useState([]);
    const [checkEmptyData, setCheckEmptyData] = useState(true);

    const location = useLocation();
    const history = useHistory();

    const isExtraExtraLarge = useMediaQuery({
        query: '(min-width: 1400px)'
    })

    const isSmallerThanLarge = useMediaQuery({
        query: '(max-width: 992px)'
    })

    // handle pagination
    const handlePageClick = () => {

    }

    const handleMediaQueryChange = (matches) => {
        if (!matches) {
            setMultiColumn(true);
        }
    }

    const handleBookDisplay = (type) => {
        if (type === 'multicolumn') {
            setMultiColumn(true);
        }
        if (type === 'row') {
            setMultiColumn(false);
        }
    }

    const fetchABookGroup = async (group_id) => {
        let result = await getABookCategoryGroup(group_id);
        if (result && result.EC === 0) {
            if (result.DT) {
                setTimeout(() => {
                    setBookCategoryGroup(result.DT);
                }, 1000);
            }
        }
    }

    const fetchBooksByAuthor = async (author_id) => {
        let result = await getBooksByAuthor(author_id);
        if (result && result.EC === 0) {
            if (result.DT) {
                setTimeout(() => {
                    setCheckEmptyData(false);
                    setBooksData(result.DT);
                }, 1000);
            } else {
                setTimeout(() => {
                    setCheckEmptyData(false);
                }, 1000);
            }
        }
    }

    const fetchBooksByPublisher = async (publisher_id) => {
        let result = await getBooksByPublisher(publisher_id);
        if (result && result.EC === 0) {
            if (result.DT) {
                setTimeout(() => {
                    setCheckEmptyData(false);
                    setBooksData(result.DT);
                }, 1000);
            } else {
                setTimeout(() => {
                    setCheckEmptyData(false);
                }, 1000);
            }
        }
    }

    const fetchBooksByGroup = async (group_id) => {
        let result = await getBooksByCategoryGroup(group_id);
        if (result && result.EC === 0) {
            if (result.DT) {
                setTimeout(() => {
                    setCheckEmptyData(false);
                    setBooksData(result.DT);
                }, 1000);
            } else {
                setTimeout(() => {
                    setCheckEmptyData(false);
                }, 1000);
            }
        }
    }

    const handleSelectSubBookCategory = async (book_category_id) => {
        let result = await getBooksByBookCategory(book_category_id)
        if (result && result.EC === 0) {
            if (result.DT) {
                setTimeout(() => {
                    setCheckEmptyData(false);
                    setBooksData(result.DT);
                }, 1000);
            } else {
                setTimeout(() => {
                    setCheckEmptyData(false);
                }, 1000);
            }
        }
    }

    const handleSeeBookDetail = (book_id) => {
        history.push(`/book/${book_id}`);
        window.scrollTo(0, 0);
    }

    const handleAddBookToShoppingCart = (data) => {
        dispatch(AddShoppingCart(data));
    }

    const setDataEmpty = () => {
        setBooksData([]);
        setBookCategoryGroup({});
        setCheckEmptyData(true);
    }

    const TITLE = (value) => {
        switch (value) {
            case (-1):
                return (
                    <>
                        {bookCategoryGroup?.group_name} Books
                    </>
                );
            case (-2):
                return (
                    <>
                        {location.state.author_name} Books
                    </>
                );
            case (-3):
                return (
                    <>
                        {location.state.publisher_name} Books
                    </>
                );
            default:
                return (
                    <>
                        {location.state.book_category_name} Books
                    </>
                )
        }
    }

    useEffect(() => {
        setDataEmpty();
        fetchABookGroup(id);
        if (location.state.book_category_id === -1) {
            fetchBooksByGroup(id);
        }
        else if (location.state.book_category_id === -2) {
            fetchBooksByAuthor(location.state.author_id);
        }
        else if (location.state.book_category_id === -3) {
            fetchBooksByPublisher(location.state.publisher_id);
        }
        else {
            handleSelectSubBookCategory(location.state.book_category_id);
        }

    }, [id, location.state.book_category_id]);

    useEffect(() => {
        if (location.state.book_category_id === -2) {
            setDataEmpty();
            fetchABookGroup(id);
            fetchBooksByAuthor(location.state.author_id);
        }

    }, [id, location.state?.author_id]);

    useEffect(() => {
        if (location.state.book_category_id === -3) {
            setDataEmpty();
            fetchABookGroup(id);
            fetchBooksByPublisher(location.state.publisher_id);
        }

    }, [id, location.state?.publisher_id]);

    return (
        <>
            {(_.isEmpty(booksData) && checkEmptyData === true) ?
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
                <div className="book-category-detail-container">
                    <div className='book-category-detail-content container'>
                        <div className='breadcrumb-container d-none d-md-block mt-5'>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to='/'>Homepage</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link to={{
                                            pathname: `/book-category/${id}`,
                                            state: { book_category_id: -1 }
                                        }}
                                        >
                                            {bookCategoryGroup?.group_name}
                                        </Link>
                                    </li>
                                    {location.state.book_category_id !== -1 && location.state.book_category_id !== -2 &&
                                        location.state.book_category_id !== -3 &&
                                        <li className="breadcrumb-item sub-book-category">
                                            {location.state.book_category_name}
                                        </li>
                                    }
                                </ol>
                            </nav>
                        </div>
                        <div className='content d-flex mt-4'>
                            <div className='sidebar d-none d-md-block col-3'>
                                <BookCategoryDetailSidebar
                                    data={bookCategoryGroup}
                                />
                            </div>
                            <div className='book-category-detail-main col-12 col-md-9 '>
                                <div className='book-category-title' >
                                    {TITLE(location.state.book_category_id)}
                                </div>
                                <div className='sort-container d-flex justify-content-end mt-4'>
                                    <div className='select-sort col-8 col-md-6 col-xl-4'>
                                        <select class="form-select" aria-label="Default select example">
                                            <option selected>Sort by book status</option>
                                            <option value="1">Latest</option>
                                            <option value="2">A to Z</option>
                                            <option value="3">Z to A</option>
                                        </select>
                                    </div>

                                    <div className='sort-icon d-none d-lg-block d-lg-flex align-items-center ms-2'>
                                        <div
                                            className={multiColumn === true ? 'multicolumn-display active' : 'multicolumn-display'}
                                            onClick={() => handleBookDisplay('multicolumn')}
                                        >
                                            <RxDashboard className='multicolumn-display-icon' />
                                        </div>
                                        <div
                                            className={multiColumn === false ? 'row-display ms-1 active' : 'row-display ms-1'}
                                            onClick={() => handleBookDisplay('row')}
                                        >
                                            <AiOutlineMenu className='row-display-icon' />
                                        </div>
                                    </div>
                                </div>
                                <div className='content-container overflow-hidden mt-4 mb-3'>
                                    {multiColumn === true ?
                                        <div className='multiColumn-display row row-cols-2 row-cols-lg-4 row-cols-xl-5 g-2 g-lg-3'>
                                            {
                                                booksData && booksData.length > 0 &&
                                                booksData.map((item) => {
                                                    return (
                                                        <div key={`multicolum-book-item-${item.id}`} className='book col'>
                                                            <div className='book-image d-flex flex-column align-items-center position-relative'>
                                                                <img src={`data:image/jpeg;base64,${item.image}`} alt='' title={item.name} onClick={() => handleSeeBookDetail(item.id)} />
                                                                {item.price !== item.current_price &&
                                                                    <span
                                                                        className={isSmallerThanLarge === true ? "sale-off position-absolute bottom-0 end-1 badge bg-danger py-2" : "sale-off position-absolute bottom-0 end-0 badge bg-danger py-2"}
                                                                    >
                                                                        -{Math.round(((item.price - item.current_price) * 100) / item.price)}%
                                                                    </span>
                                                                }
                                                            </div>
                                                            <div className='book-content mt-4 px-4 px-lg-3'>
                                                                <div className='book-title' title={item.name} onClick={() => handleSeeBookDetail(item.id)}>
                                                                    <span>{item.name}</span>
                                                                </div>
                                                                <div className='book-author my-2'>
                                                                    <span>{item.author}</span>
                                                                </div>
                                                                {item.price !== item.current_price ?
                                                                    <>
                                                                        <div className='book-price'>
                                                                            <span>{NumberFormat(item.price)} </span>
                                                                        </div>
                                                                        <div className='book-current-price'>
                                                                            <span>{NumberFormat(item.current_price)} </span>
                                                                        </div>
                                                                    </>
                                                                    :
                                                                    <div className='book-price-not-change'>
                                                                        <span>
                                                                            {NumberFormat(item.price)} 
                                                                        </span>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        :
                                        <MediaQuery minWidth={992} onChange={handleMediaQueryChange}>
                                            <div className='Row-display'>
                                                {
                                                    booksData && booksData.length > 0 &&
                                                    booksData.map((item) => {
                                                        return (
                                                            <div key={`row-book-item-${item.id}`} className='book-row row mb-3 pb-4'>
                                                                <div className='book-row-image col-3 d-flex flex-column align-items-center position-relative'>
                                                                    <img src={`data:image/jpeg;base64,${item.image}`} alt='' title={item.name} onClick={() => handleSeeBookDetail(item.id)} />
                                                                    {item.price !== item.current_price &&
                                                                        <span
                                                                            className={isExtraExtraLarge === true ? "sale-off position-absolute bottom-0 end-1 badge bg-danger py-2" : "sale-off position-absolute bottom-0 end-0 badge bg-danger py-2"}
                                                                        >
                                                                            -{Math.round(((item.price - item.current_price) * 100) / item.price)}%
                                                                        </span>
                                                                    }
                                                                </div>
                                                                <div className='book-row-content px-3 pt-1 col-9'>
                                                                    <div className='book-title' title={item.name} onClick={() => handleSeeBookDetail(item.id)}>
                                                                        <span>{item.name}</span>
                                                                    </div>
                                                                    <div className='d-flex justify-content-between align-items-center'>
                                                                        <div>
                                                                            <div className='book-author'>
                                                                                <span>{item.author}</span>
                                                                            </div>
                                                                            <div className='price-box d-flex gap-3 align-items-end mb-2'>
                                                                                {item.price !== item.current_price ?
                                                                                    <>
                                                                                        <div className='book-current-price'>
                                                                                            <span>{NumberFormat(item.current_price)} </span>
                                                                                        </div>
                                                                                        <div className='book-price'>
                                                                                            <span>{NumberFormat(item.price)} </span>
                                                                                        </div>
                                                                                    </>
                                                                                    :
                                                                                    <div className='book-price-not-change'>
                                                                                        <span>{NumberFormat(item.price)} </span>
                                                                                    </div>
                                                                                }
                                                                            </div>
                                                                        </div>

                                                                        <div className='add-to-cart-btn'>
                                                                            <button
                                                                                className='btn btn-warning d-flex align-items-center gap-2'
                                                                                onClick={() => handleAddBookToShoppingCart({
                                                                                    id: item.id,
                                                                                    title: item.name,
                                                                                    current_price: item.current_price,
                                                                                    price: item.price,
                                                                                    image: item.image,
                                                                                    amount: 1
                                                                                })}
                                                                            >
                                                                                <BsCart3 />BUY NOW
                                                                            </button>
                                                                        </div>
                                                                    </div>

                                                                    <div className='book-description'>
                                                                        {item.description}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </MediaQuery>
                                    }
                                </div>
                                {booksData && booksData.length > 0 &&
                                    <div className='pagination-container'>
                                        <ReactPaginate
                                            nextLabel="next >"
                                            onPageChange={handlePageClick}
                                            pageRangeDisplayed={3}
                                            marginPagesDisplayed={3}
                                            pageCount={5}
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
                                            containerClassName="pagination justify-content-center"
                                            activeLinkClassName="page-active-background"
                                            renderOnZeroPageCount={null}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}

export default BookCategoryDetail;