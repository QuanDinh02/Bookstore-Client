import './BookDetail.scss';
import { Link, useHistory, useParams } from 'react-router-dom';

import { AiFillCheckCircle } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";

import BookReview from './BookReview';
import StarRating from '../StarRatings/StarRating';

import { getBookDetail } from '../../Services/apiServices';
import { useEffect, useState } from 'react';

import { TailSpin } from 'react-loader-spinner';
import _ from 'lodash';

import { useDispatch } from "react-redux";
import { AddShoppingCart } from '../../../redux/action/actions';
import { NumberFormat } from '../../FormatNumber/currencyFormat';

const BookDetail = (props) => {

    const dispatch = useDispatch();

    let isAuthenticated = true;
    const { id } = useParams();
    const [data, setBookData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleAddBookToShoppingCart = (data) => {
        dispatch(AddShoppingCart(data));
    }

    const fetchBookDetail = async (book_id) => {
        let data = await getBookDetail(book_id);
        if (data && data.EC === 0) {
            setTimeout(() => {
                setBookData(data.DT);
                setIsLoading(false);
            }, 1000);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        fetchBookDetail(id);
    }, [id]);

    return (
        <>
            {(_.isEmpty(data) || isLoading === true) ?
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
                <div className='book-detail-container'>
                    <div className='book-detail container'>
                        <div className='breadcrumb-container d-none d-md-block mt-5'>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to='/'>Homepage</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link to={{
                                            pathname: `/book-category/${data?.BookCategoryGroup?.id}`,
                                            state: { book_category_id: -1 }
                                        }}
                                        >
                                            {data?.BookCategoryGroup?.name}
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link to={{
                                            pathname: `/book-category/${data?.BookCategoryGroup?.id}`,
                                            state: {
                                                book_category_id: data?.BookCategory?.id,
                                                book_category_name: data?.BookCategory?.name
                                            }
                                        }}
                                        >
                                            {data?.BookCategory?.name}
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link to='#'>{data?.name}</Link>
                                    </li>
                                </ol>
                            </nav>
                        </div>
                        <div className='content position-relative mt-4 d-flex flex-column'>
                            <div className='book-main-info row g-3 g-xl-1 justify-content-center justify-content-lg-between'>
                                <div className='book-image d-flex justify-content-center'>
                                    <img src={`data:image/jpeg;base64,${data?.image}`} alt='' />
                                </div>
                                <div className='book-info col-12 col-lg-8 col-xl-6 col-xxl-5 mx-xxl-5'>
                                    <div className='book-title'>
                                        <span>
                                            {data?.name}
                                        </span>
                                    </div>
                                    <div className='book-author mt-1'>
                                        Author:<span className='author' title={`Author ${data?.Author && data?.Author?.name && data.Author.name}`}>
                                            {data?.Author && data?.Author?.name ? data.Author.name : ''}
                                        </span>

                                    </div>
                                    <div className='book-publishing-company mt-1'>
                                        <span>Publishing Company: {data?.publishingCompany}</span>
                                    </div>
                                    <div className='book-publisher mt-1'>
                                        Publisher: <span className='publisher' title={`Publisher: ${data?.Publisher?.name}`}>
                                            {data?.Publisher && data?.Publisher?.name ? data.Publisher.name : ''}
                                        </span>
                                    </div>
                                    <div className='rate my-2'>
                                        <StarRating rate={data?.rate ? data.rate : 0} />
                                        <span className='note'>({data?.TotalComments} rates)</span>

                                    </div>
                                    <div className='brief-description-content'>
                                        {data?.description}
                                    </div>
                                    <div className='service-info mt-3 pt-3'>
                                        <div className='service-title mb-2'>
                                            Attached information
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
                                            <span className={data.price !== data.current_price ? 'price-value' : 'price-old-value'}>{NumberFormat(data?.price)}</span>
                                        </div>
                                        {data.price !== data.current_price &&
                                            <>
                                                <div className='current_price mb-3 d-flex justify-content-between align-items-center'>
                                                    <span>Price</span>
                                                    <span className='current-price-value'>{NumberFormat(data?.current_price)}</span>
                                                </div>
                                                <div className='sale-off mb-3 d-flex justify-content-between'>
                                                    <span>Sale-off</span>
                                                    <span className='sale-off-value'>
                                                        ({data?.current_price && data?.price ? NumberFormat(data.price - data.current_price) : 0}) {Math.round(((data.price - data.current_price) * 100) / data.price)}%
                                                    </span>
                                                </div>
                                            </>

                                        }

                                        <div className='quality d-flex justify-content-between'>
                                            <span>Quality</span>
                                            <span className='value'>{data?.quality}</span>
                                        </div>
                                    </div>
                                    <div className='book-status d-flex justify-content-end align-items-center gap-2 mb-2'>
                                        <AiFillCheckCircle className='check-icon' /><span> {data?.status ? data.status.toUpperCase() : ''}</span>
                                    </div>
                                    <div className='add-to-cart-btn px-3'>
                                        <button
                                            className='btn btn-warning d-flex align-items-center justify-content-center gap-2'
                                            onClick={() => handleAddBookToShoppingCart({
                                                id: data?.id,
                                                title: data?.name,
                                                current_price: data?.current_price,
                                                price: data?.price,
                                                image: data?.image,
                                                amount: 1
                                            })}
                                        >
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
                                                    <td>{data?.Author && data?.Author?.name ? data.Author.name : ''}</td>
                                                </tr>
                                                <tr>
                                                    <td class="table-active">Publisher</td>
                                                    <td>{data?.Publisher && data?.Publisher?.name ? data.Publisher.name : ''}</td>
                                                </tr>
                                                <tr>
                                                    <td class="table-active">Translator</td>
                                                    <td>{data?.translator}</td>
                                                </tr>
                                                <tr>
                                                    <td class="table-active">Publishing Company</td>
                                                    <td>{data?.publishingCompany}</td>
                                                </tr>
                                                <tr>
                                                    <td class="table-active">Pulishing Day</td>
                                                    <td>{data?.publishingDay}</td>
                                                </tr>
                                                <tr>
                                                    <td class="table-active">Volumn</td>
                                                    <td>{data?.volume}</td>
                                                </tr>
                                                <tr>
                                                    <td class="table-active">Format</td>
                                                    <td>{data?.format}</td>
                                                </tr>
                                                <tr>
                                                    <td class="table-active">Page</td>
                                                    <td>{data?.pages}</td>
                                                </tr>
                                                <tr>
                                                    <td class="table-active">Size</td>
                                                    <td>{data?.size}</td>
                                                </tr>
                                                <tr>
                                                    <td class="table-active">Product Code</td>
                                                    <td>{data?.productCode}</td>
                                                </tr>
                                                <tr>
                                                    <td class="table-active">Language</td>
                                                    <td>{data?.language}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div id="scrollspyHeading2" className='sroll-top-distance'>
                                        <h5>Book Description</h5>
                                        <div className='book-description'>
                                            {data?.description}
                                        </div>
                                    </div>
                                    <div id="scrollspyHeading3" className='customer-responses sroll-top-distance'>
                                        <h5 className='title'>Customer Responses</h5>
                                        <div className='comments mt-2'>
                                            {data?.Comments && data.Comments.length > 0 &&
                                                data.Comments.map((item) => {
                                                    return (
                                                        <BookReview
                                                            key={`book-review-${item.id}`}
                                                            image={item?.User.image}
                                                            title={item.title}
                                                            time={item.time}
                                                            rate={item.rate}
                                                            commentor_name={item?.User.username}
                                                            content={item.content}
                                                        />
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className='d-flex flex-column flex-md-row mt-4'>
                                            <div className='total-comments col-12 col-md-6'>
                                                <div className='d-flex'>
                                                    <div className='average-point p-3'>
                                                        <span>{data?.rate ? data.rate : 0}</span>
                                                    </div>
                                                    <div className='total'>
                                                        <div className='star-icon'>
                                                            <StarRating rate={5} size='big' />
                                                        </div>
                                                        <span className='value'>{data?.TotalComments} comments</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    {
                                                        [...Array(5)].map((item, index) => {
                                                            return (
                                                                <div className='rating-item d-flex flex-column flex-sm-row gap-sm-2 align-items-sm-center'>
                                                                    <div className='star-rating'>
                                                                        <StarRating rate={5 - index} />
                                                                    </div>
                                                                    <div class="progress rating-progress-bar">
                                                                        <div
                                                                            class="progress-bar bg-success" role="progressbar"
                                                                            style={{ 'width': `${data?.StarRatings ? data.StarRatings[`star_${5 - index}`]['percent'] : 0}%` }}
                                                                            aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                                    </div>
                                                                    <div className='value'>
                                                                        <span>{data?.StarRatings ? data.StarRatings[`star_${5 - index}`]['rate'] : 0}</span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className='rating-box col-12 col-md-6 col-xl-5 mt-3 mt-md-0'>
                                                {isAuthenticated === true ?
                                                    <table class="table table-borderless">
                                                        <tbody>
                                                            <tr>
                                                                <td>Rate</td>
                                                                <td className='starRatings'>
                                                                    <StarRating rate={0} size='medium' onClickStar={true} />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Title</td>
                                                                <td>
                                                                    <input className='form-control' type='text' />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Content</td>
                                                                <td>
                                                                    <textarea style={{ 'minHeight': '6.25rem' }} class="form-control" placeholder="Leave a comment here" />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td></td>
                                                                <td>
                                                                    <div className='send-comment-btn'>
                                                                        <button className='btn btn-success d-flex align-items-center justify-content-center col-8 col-md-10 col-lg-7 col-xxl-6'>
                                                                            SEND RATINGS
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    :
                                                    <div className='denied-access ps-3 d-flex flex-column justify-content-center gap-2'>
                                                        <div className='text'>Login to send your comment</div>
                                                        <div className='d-flex gap-2 align-items-center'>
                                                            <button className='btn btn-success'>Log in</button>
                                                            <div className='text'>
                                                                You don't have an account?
                                                                Please <span className='sign-up'>Sign up</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            }
        </>
    )
}

export default BookDetail;