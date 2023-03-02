//import { useParams } from 'react-router-dom';
import './BookCategoryDetail.scss';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { AiOutlineMenu } from "react-icons/ai";
import CertainBook from '../../../assets/image/CertainBook.png';
import ReactPaginate from 'react-paginate';

const BookCategoryDetail = () => {

    //const {id} = useParams();

    const handlePageClick = () => {

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
                        <div className="book-category-sidebar">
                            <div className="category-item d-flex align-items-center justify-content-between">
                                <span className="category-title-fixed">Discount Books</span>
                                <IoIosArrowForward className="icon" />
                            </div>
                            <div className="category-item d-flex align-items-center justify-content-between">
                                <span className="category-title-fixed">Best Seller</span>
                                <IoIosArrowForward className="icon" />
                            </div>
                            <div className="category-item d-flex align-items-center justify-content-between">
                                <span className="category-title-fixed">New Books Release</span>
                                <IoIosArrowForward className="icon" />
                            </div>
                            <div className="category-item d-flex align-items-center justify-content-between">
                                <span className="category-title-fixed">Upcoming Books</span>
                                <IoIosArrowForward className="icon" />
                            </div>
                            <div className="category-item d-flex align-items-center justify-content-between">
                                <span className="category-title-fixed">Combo</span>
                                <IoIosArrowForward className="icon" />
                            </div>

                            <div className="category-item no-cursor-pointer d-flex align-items-center justify-content-between">
                                <span className="category-title-fixed section">BOOK CATEGORY</span>
                            </div>
                            <div className="category-item d-flex align-items-center justify-content-between">
                                <span className="category-title">Book</span>
                                <IoIosArrowForward className="icon" />
                            </div>
                            <div className="category-item d-flex align-items-center justify-content-between">
                                <span className="category-title">Book</span>
                                <IoIosArrowForward className="icon" />
                            </div>
                            <div className="category-item d-flex align-items-center justify-content-between">
                                <span className="category-title">Book</span>
                                <IoIosArrowForward className="icon" />
                            </div>
                            <div className="category-item d-flex align-items-center justify-content-between">
                                <span className="category-title">Book</span>
                                <IoIosArrowForward className="icon" />
                            </div>

                            <div className="category-item no-cursor-pointer d-flex align-items-center justify-content-between">
                                <span className="category-title-fixed section">AUTHOR</span>
                            </div>
                            <div className="category-item d-flex align-items-center justify-content-between">
                                <span className="category-title">Author</span>
                                <IoIosArrowForward className="icon" />
                            </div>
                            <div className="category-item d-flex align-items-center justify-content-between">
                                <span className="category-title">Author</span>
                                <IoIosArrowForward className="icon" />
                            </div>
                            <div className="category-item d-flex align-items-center justify-content-between">
                                <span className="category-title">Author</span>
                                <IoIosArrowForward className="icon" />
                            </div>
                            <div className="category-item d-flex align-items-center justify-content-between">
                                <span className="category-title">Author</span>
                                <IoIosArrowForward className="icon" />
                            </div>

                        </div>
                    </div>
                    <div className='main col-12 col-md-9 '>
                        <div className='book-category-title' >
                            Economic Books
                        </div>
                        <div className='sort-container d-flex justify-content-end mt-4'>
                            <div className='select-sort col-8 col-md-6 col-lg-5 col-xl-4'>
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>Sort by book status</option>
                                    <option value="1">Latest</option>
                                    <option value="2">A to Z</option>
                                    <option value="3">Z to A</option>
                                </select>
                            </div>

                            <div className='sort-icon d-none d-md-block d-md-flex align-items-center ms-2'>
                                <div className='grid-display'>
                                    <RxDashboard className='grid-display-icon' />
                                </div>
                                <div className='row-display ms-1'>
                                    <AiOutlineMenu className='row-display-icon' />
                                </div>
                            </div>
                        </div>
                        <div className='content-container overflow-hidden mt-4 mb-3'>
                            <div className='row row-cols-2 row-cols-lg-4 row-cols-xl-5 g-2 g-lg-3'>
                                <div className='book col'>
                                    <div className='book-image d-flex flex-column align-items-center'>
                                        <img src={CertainBook} title='Ngôn Ngữ Bí Mật Trong Kinh'/>
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
                                <div className='book col'>
                                    <div className='book-image d-flex flex-column align-items-center'>
                                        <img src={CertainBook} title='Ngôn Ngữ Bí Mật Trong Kinh'/>
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
                                <div className='book col'>
                                    <div className='book-image d-flex flex-column align-items-center'>
                                        <img src={CertainBook} title='Ngôn Ngữ Bí Mật Trong Kinh'/>
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
                                <div className='book col'>
                                    <div className='book-image d-flex flex-column align-items-center'>
                                        <img src={CertainBook} title='Ngôn Ngữ Bí Mật Trong Kinh'/>
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
                                <div className='book col'>
                                    <div className='book-image d-flex flex-column align-items-center'>
                                        <img src={CertainBook} title='Ngôn Ngữ Bí Mật Trong Kinh'/>
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
                                <div className='book col'>
                                    <div className='book-image d-flex flex-column align-items-center'>
                                        <img src={CertainBook} title='Ngôn Ngữ Bí Mật Trong Kinh'/>
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
                            </div>
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