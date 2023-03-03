//import { useParams } from 'react-router-dom';
import './BookCategoryDetail.scss';
import { Link } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx";
import { AiOutlineMenu } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";

import CertainBook from '../../../assets/image/CertainBook.png';
import ReactPaginate from 'react-paginate';
import BookCategoryDetailSidebar from './BookCategoryDetailSidebar';
import { useState } from 'react';
import MediaQuery, { useMediaQuery } from 'react-responsive';

const BookCategoryDetail = () => {

    //const {id} = useParams();

    const [multiColumn, setMultiColumn] = useState(true);

    const isExtraExtraLarge = useMediaQuery({
        query: '(min-width: 1400px)'
    })

    const isSmallerThanLarge = useMediaQuery({
        query: '(max-width: 992px)'
    })

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

    return (
        <div className="book-category-detail-container">
            <div className='book-category-detail-content container'>
                <div className='breadcrumb-container d-none d-md-block mt-5'>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to='/'>Homepage</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to='/'>Book-Category</Link>
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className='content d-flex mt-4'>
                    <div className='sidebar d-none d-md-block col-3'>
                        <BookCategoryDetailSidebar />
                    </div>
                    <div className='main col-12 col-md-9 '>
                        <div className='book-category-title' >
                            Economic Books
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
                                        [...Array(7)].map(item => {
                                            return (
                                                <div className='book col'>
                                                    <div className='book-image d-flex flex-column align-items-center position-relative'>
                                                        <img src={CertainBook} title='Ngôn Ngữ Bí Mật Trong Kinh' />
                                                        <span
                                                            className={isSmallerThanLarge === true ? "sale-off position-absolute bottom-0 end-1 badge bg-danger py-2" : "sale-off position-absolute bottom-0 end-0 badge bg-danger py-2"}
                                                        >
                                                            -15%
                                                        </span>
                                                    </div>
                                                    <div className='book-content mt-4 px-3'>
                                                        <div className='book-title' title='Ngôn Ngữ Bí Mật Trong Kinh'>
                                                            <span>Ngôn Ngữ Bí Mật Trong Kinh</span>
                                                        </div>
                                                        <div className='book-author my-2'>
                                                            <span>Kevin Hogan</span>
                                                        </div>
                                                        <div className='book-price'>
                                                            <span>125.000 </span>
                                                            <span className='unit'>đ</span>
                                                        </div>
                                                        <div className='book-current-price'>
                                                            <span>106.000 </span>
                                                            <span className='unit'>đ</span>
                                                        </div>
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
                                            [...Array(3)].map(item => {
                                                return (
                                                    <div className='book-row row row-cols-2 mb-3 pb-4'>
                                                        <div className='book-row-image col-3 d-flex flex-column align-items-center position-relative'>
                                                            <img src={CertainBook} title='Ngôn Ngữ Bí Mật Trong Kinh' />
                                                            <span
                                                                className={isExtraExtraLarge === true ? "sale-off position-absolute bottom-0 end-1 badge bg-danger py-2" : "sale-off position-absolute bottom-0 end-0 badge bg-danger py-2"}
                                                            >
                                                                -15%
                                                            </span>
                                                        </div>
                                                        <div className='book-row-content px-3 pt-1 col-9'>
                                                            <div className='book-title' title='Ngôn Ngữ Bí Mật Trong Kinh'>
                                                                <span>Ngôn Ngữ Bí Mật Trong Kinh</span>
                                                            </div>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <div>
                                                                    <div className='book-author'>
                                                                        <span>Kevin Hogan</span>
                                                                    </div>
                                                                    <div className='price-box d-flex gap-3 align-items-end mb-2'>
                                                                        <div className='book-current-price'>
                                                                            <span>106.000 </span>
                                                                            <span className='unit'>đ</span>
                                                                        </div>
                                                                        <div className='book-price'>
                                                                            <span>125.000 </span>
                                                                            <span className='unit'>đ</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className='add-to-cart-btn'>
                                                                    <button className='btn btn-warning d-flex align-items-center gap-2'>
                                                                        <BsCart3 />BUY NOW
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <div className='book-description'>
                                                                Tiến sĩ tâm lý Kevin Hogan sẽ chia sẻ những điều cơ bản trong ngôn ngữ cơ thể và cách nó tác động đến thái độ, hành động và kết quả của giao tiếp. Mọi người đều truyền đạt ngôn ngữ cơ thể đến người khác, dù họ có nhận ra điều đó hay
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookCategoryDetail;