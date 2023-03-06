import './BookDetail.scss';
import { Link } from 'react-router-dom';
import Onepiece from '../../../assets/image/Onepiece.png';
import userImage from '../../../assets/image/user.png';

import { IoIosStar } from "react-icons/io";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";
import BookReview from './BookReview';
import StarRating from './StarRating';

const BookDetail = (props) => {

    return (
        <div className='book-detail-container'>
            <div className='book-detail container'>
                <div className='breadcrumb-container d-none d-md-block mt-5'>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to='/'>Homepage</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to='/'>Homepage</Link>
                                {/* <Link to={{
                                    pathname: `/book-category/${id}`,
                                    state: { book_category_id: -1 }
                                }}
                                >
                                    {bookCategoryGroup?.group_name}
                                </Link> */}
                            </li>
                            <li className="breadcrumb-item">
                                <Link to='/'>Homepage</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to='/'>Homepage</Link>
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className='content position-relative mt-4 red d-flex flex-column'>
                    <div className='book-main-info row g-3 g-xl-1 justify-content-center justify-content-lg-between'>
                        <div className='book-image d-flex justify-content-center col'>
                            <img src={Onepiece} />
                        </div>
                        <div className='book-info col-12 col-lg-8 col-xl-6'>
                            <div className='book-title'>
                                <span>Cây Chuối Non Đi Giày Xanh (Bìa Mềm)</span>
                            </div>
                            <div className='book-author mt-1'>
                                Author:<span className='author' title='Author: Nguyễn Nhật Ánh'> Nguyễn Nhật Ánh</span>

                            </div>
                            <div className='book-publishing-company mt-1'>
                                <span>Nhà xuất bản: Nxb Trẻ</span>
                            </div>
                            <div className='book-publisher mt-1'>
                                Publisher: <span className='publisher' title='Publisher: NXB Trẻ'> NXB Trẻ</span>
                            </div>
                            <div className='rate my-2'>
                                {
                                    [...Array(5)].map(item => {
                                        return (
                                            <IoIosStar className='star' />
                                        )
                                    })
                                }
                                <span className='note'>(4 rate 4 comments)</span>

                            </div>
                            <div className='brief-description-content'>
                                Kỷ niệm bao giờ cũng đẹp và đặc biệt là không biết phản bội.
                                "Câu chuyện này về kỷ niệm. Có nỗi sợ trẻ con ai cũng từng qua,
                                có rung động mơ hồ đủ khiến hồi hộp đỏ mặt. Mối ghen tuông len lỏi,
                                nỗi buồn thắt tim, và những giấc mơ trong
                            </div>
                            <div className='service-info mt-3 pt-3'>
                                <div className='service-title mb-2'>
                                    Thông tin kèm theo
                                </div>
                                <div className='service-item'>
                                    <AiFillCheckCircle className='check-icon' /> Có dịch vụ bọc sách plastic cao cấp cho sách này
                                </div>
                                <div className='service-item'>
                                    <AiFillCheckCircle className='check-icon' /> Miễn phí giao hàng toàn quốc cho Đơn hàng từ 250.000đ (Áp dụng từ 1/2/2015.
                                </div>
                            </div>
                        </div>
                        <div className='payment-info col p-3 gray'>
                            <div className='payment-title'>
                                Payment Infomation
                            </div>
                            <div className='main my-3 py-3'>
                                <div className='price mb-3 d-flex justify-content-between'>
                                    <span>Cover price</span>
                                    <span className='price-value'>110.000 <span className='unit'>đ</span></span>
                                </div>
                                <div className='current_price mb-3 d-flex justify-content-between align-items-center'>
                                    <span>Price</span>
                                    <span className='current-price-value'>77.000 <span className='unit'>đ</span></span>
                                </div>
                                <div className='sale-off mb-3 d-flex justify-content-between'>
                                    <span>Sale-off</span>
                                    <span className='sale-off-value'>(33.000 <span className='unit'>đ</span>) 30%</span>
                                </div>
                                <div className='quality d-flex justify-content-between'>
                                    <span>Quality</span>
                                    <span className='value'>A</span>
                                </div>
                            </div>
                            <div className='book-status d-flex justify-content-end align-items-center gap-2 mb-2'>
                                <AiFillCheckCircle className='check-icon' /><span> GOODS AVAILABLE</span>
                            </div>
                            <div className='add-to-cart-btn px-3'>
                                <button className='btn btn-warning d-flex align-items-center justify-content-center gap-2'>
                                    <BsCart3 />BUY NOW
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='book-detail-nav sticky-top d-none d-lg-block d-lg-flex gap-5 mt-5'>
                        <div className='tab me-3 pe-3'>
                            <a className='navigation-link' href="#scrollspyHeading1">Detailed Information</a>
                        </div>
                        <div className='tab me-3 px-3'>
                            <a className='navigation-link' href="#scrollspyHeading2">Book Description</a>
                        </div>
                        <div className='tab me-3 px-3'>
                            <a className='navigation-link' href="#scrollspyHeading3">Customer Responses</a>
                        </div>
                    </div>
                    <div className='book-full-detail-info'>
                        <div data-bs-spy="scroll" data-bs-offset="0" class="scrollspy-example" tabIndex="0">
                            <div id="scrollspyHeading1" className='detailed-information col-12 col-lg-8 sroll-top-distance'>
                                <h5>Detailed Information</h5>
                                <table class="table table-borderless mt-3">
                                    <tbody>
                                        <tr>
                                            <td class="table-active">Author</td>
                                            <td>Nguyễn Nhật Ánh</td>
                                        </tr>
                                        <tr>
                                            <td class="table-active">Publisher</td>
                                            <td>NXB Tre</td>
                                        </tr>
                                        <tr>
                                            <td class="table-active">Publishing Company</td>
                                            <td>NXB Tre</td>
                                        </tr>
                                        <tr>
                                            <td class="table-active">Pulishing Day</td>
                                            <td>12/2017</td>
                                        </tr>
                                        <tr>
                                            <td class="table-active">Volumn</td>
                                            <td>374.00 gram</td>
                                        </tr>
                                        <tr>
                                            <td class="table-active">Format</td>
                                            <td>Paperback</td>
                                        </tr>
                                        <tr>
                                            <td class="table-active">Page</td>
                                            <td>392</td>
                                        </tr>
                                        <tr>
                                            <td class="table-active">Size</td>
                                            <td>13 x 20 cm</td>
                                        </tr>
                                        <tr>
                                            <td class="table-active">Product Code</td>
                                            <td>8934974151630</td>
                                        </tr>
                                        <tr>
                                            <td class="table-active">Language</td>
                                            <td>English</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div id="scrollspyHeading2" className='sroll-top-distance'>
                                <h5>Book Description</h5>
                                <div className='book-description'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                    It has survived not only five centuries, but also the leap into electronic typesetting,
                                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
                                    sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
                                    like Aldus PageMaker including versions of Lorem Ipsum. It is a long established fact that a reader
                                    will be distracted by the readable content of a page when looking at its layout. The point of using
                                    Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using
                                    'Content here, content here', making it look like readable English.
                                </div>
                            </div>
                            <div id="scrollspyHeading3" className='customer-responses sroll-top-distance'>
                                <h5 className='title'>Customer Responses</h5>
                                <div className='comments mt-2'>
                                    <BookReview
                                        image={userImage}
                                        title={'Good Book'}
                                        rate={4}
                                        commentor_name={'Yamato'}
                                        content={'Always support author and look forward to new book support author and look forward to new book'}
                                    />
                                    <BookReview
                                        image={userImage}
                                        title={'Very Good'}
                                        rate={5}
                                        commentor_name={'Jane'}
                                        content={''}
                                    />
                                    <BookReview
                                        image={userImage}
                                        title={'Normal'}
                                        rate={3}
                                        commentor_name={'Kevin'}
                                        content={'Always support author and look forward to new book'}
                                    />
                                </div>
                                <div className='total-comments col-12 col-md-6 mt-3 blue'>
                                    <div className='d-flex'>
                                        <div className='average-point p-3'>
                                            <span>4.8</span>
                                        </div>
                                        <div className='total'>
                                            <div className='star-icon'>
                                                <StarRating rate={5} />
                                            </div>
                                            <span className='value'>1340 comments</span>
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            [...Array(5)].map((item, index) => {
                                                return (
                                                    <div className='rating-item d-flex gap-2 align-items-center'>
                                                        <div className='star-rating'>
                                                            <StarRating rate={5 - index} />
                                                        </div>
                                                        <div class="progress rating-progress-bar">
                                                            <div class="progress-bar bg-success" role="progressbar" style={{ 'width': `${75}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                        <div className='value'>
                                                            <span>1135</span>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetail;