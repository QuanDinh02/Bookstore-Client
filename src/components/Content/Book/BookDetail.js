import './BookDetail.scss';
import { Link } from 'react-router-dom';
import Onepiece from '../../../assets/image/Onepiece.png';
import { IoIosStar } from "react-icons/io";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";

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
                <div className='content mt-4 red d-flex flex-column'>
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
                    <div className='book-detail-nav d-flex gap-5 mt-5 mb-3'>
                        <div className='tab me-3 pe-3'>
                            <a className='navigation-link' href="#scrollspyHeading1">BOOK INTRODUCE</a>
                        </div>
                        <div className='tab me-3 px-3'>
                            <a className='navigation-link' href="#scrollspyHeading2">DETAIL INFOMATION</a>
                        </div>
                        <div className='tab me-3 px-3'>
                            <a className='navigation-link' href="#scrollspyHeading3">COMMENTS</a>
                        </div>
                    </div>
                    <div lassName='book-full-detail-info'>
                        <div data-bs-spy="scroll" data-bs-offset="0" class="scrollspy-example" tabindex="0">
                            <h4 id="scrollspyHeading1">First heading</h4>
                            <p>
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                            </p>
                            <h4 id="scrollspyHeading2">Second heading</h4>
                            <p>
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                            </p>
                            <h4 id="scrollspyHeading3">Third heading</h4>
                            <p>
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                                This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetail;