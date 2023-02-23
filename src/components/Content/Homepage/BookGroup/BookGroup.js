import './BookGroup.scss';
import Book from '../../../../assets/image/Book.png';
import { IoIosArrowForward } from "react-icons/io";

const BookGroup = () => {
    return (
        <div className="book-group-container">
            <div className='book-group-title'>
                <div className='title'>Best Sale Book</div>
                <div>
                    <span className='redirect'>See more</span> <IoIosArrowForward />
                </div>

            </div>
            <div className='book-group-main d-flex flex-wrap justify-content-around'>
                <div className='book'>
                    <div className='content '>
                        <div className='book-image'>
                            <img src={Book} alt='' title='The begin of Empire: The Wuzong Niel' />
                        </div>
                        <div className='book-info'>
                            <div className='title' title='The begin of Empire: The Wuzong Niel'>
                                The begin of Empire the Emperor
                            </div>
                            <div className='author'>
                                Dr Strange
                            </div>
                            <div className='description'>
                                Lorem Ipsum is simply dummy text of the
                                printing and typesetting industry.Lorem Ipsum has been
                            </div>
                        </div>
                    </div>
                    <div className='price-container'>
                        <div>
                            <div className='sale-off'>-10%</div>
                        </div>
                        <div className='price-box'>
                            <div className='old-price'>1.200.000 <span className='unit'>đ</span></div>
                            <div className='price'>1.080.000 <span className='unit'>đ</span></div>
                        </div>

                    </div>
                </div>
                <div className='book'>
                    <div className='content '>
                        <div className='book-image'>
                            <img src={Book} alt='' title='The begin of Empire: The Wuzong Niel' />
                        </div>
                        <div className='book-info'>
                            <div className='title' title='The begin of Empire: The Wuzong Niel'>
                                The begin of Empire the Emperor
                            </div>
                            <div className='author'>
                                Dr Strange
                            </div>
                            <div className='description'>
                                
                            </div>
                        </div>
                    </div>
                    <div className='price-container'>
                        <div>
                            <div className='sale-off'>-10%</div>
                        </div>
                        <div className='price-box'>
                            <div className='old-price'>1.200.000 <span className='unit'>đ</span></div>
                            <div className='price'>1.080.000 <span className='unit'>đ</span></div>
                        </div>

                    </div>
                </div>
                <div className='book'>
                    <div className='content '>
                        <div className='book-image'>
                            <img src={Book} alt='' title='The begin of Empire: The Wuzong Niel' />
                        </div>
                        <div className='book-info'>
                            <div className='title' title='The begin of Empire: The Wuzong Niel'>
                                The begin of Empire the Emperor
                            </div>
                            <div className='author'>
                                Dr Strange
                            </div>
                            <div className='description'>
                                Lorem Ipsum is simply dummy text of the
                                printing and typesetting industry.Lorem Ipsum has been
                            </div>
                        </div>
                    </div>
                    <div className='price-container'>
                        <div>
                            <div className='sale-off'>-10%</div>
                        </div>
                        <div className='price-box'>
                            <div className='old-price'>1.200.000 <span className='unit'>đ</span></div>
                            <div className='price'>1.080.000 <span className='unit'>đ</span></div>
                        </div>

                    </div>
                </div>
                <div className='book'>
                    <div className='content '>
                        <div className='book-image'>
                            <img src={Book} alt='' title='The begin of Empire: The Wuzong Niel' />
                        </div>
                        <div className='book-info'>
                            <div className='title' title='The begin of Empire: The Wuzong Niel'>
                                The begin of Empire the Emperor
                            </div>
                            <div className='author'>
                                Dr Strange
                            </div>
                            <div className='description'>
                                Lorem Ipsum is simply dummy text of the
                                printing and typesetting industry.Lorem Ipsum has been
                            </div>
                        </div>
                    </div>
                    <div className='price-container'>
                        <div>
                            <div className='sale-off'>-10%</div>
                        </div>
                        <div className='price-box'>
                            <div className='old-price'>1.200.000 <span className='unit'>đ</span></div>
                            <div className='price'>1.080.000 <span className='unit'>đ</span></div>
                        </div>

                    </div>
                </div>
                <div className='book'>
                    <div className='content '>
                        <div className='book-image'>
                            <img src={Book} alt='' title='The begin of Empire: The Wuzong Niel' />
                        </div>
                        <div className='book-info'>
                            <div className='title' title='The begin of Empire: The Wuzong Niel'>
                                The begin of Empire the Emperor
                            </div>
                            <div className='author'>
                                Dr Strange
                            </div>
                            <div className='description'>
                                Lorem Ipsum is simply dummy text of the
                                printing and typesetting industry.Lorem Ipsum has been
                            </div>
                        </div>
                    </div>
                    <div className='price-container'>
                        <div>
                            <div className='sale-off'>-10%</div>
                        </div>
                        <div className='price-box'>
                            <div className='old-price'>1.200.000 <span className='unit'>đ</span></div>
                            <div className='price'>1.080.000 <span className='unit'>đ</span></div>
                        </div>

                    </div>
                </div>
                <div className='book'>
                    <div className='content '>
                        <div className='book-image'>
                            <img src={Book} alt='' title='The begin of Empire: The Wuzong Niel' />
                        </div>
                        <div className='book-info'>
                            <div className='title' title='The begin of Empire: The Wuzong Niel'>
                                The begin of Empire the Emperor
                            </div>
                            <div className='author'>
                                Dr Strange
                            </div>
                            <div className='description'>
                                Lorem Ipsum is simply dummy text of the
                                printing and typesetting industry.Lorem Ipsum has been
                            </div>
                        </div>
                    </div>
                    <div className='price-container'>
                        <div>
                            <div className='sale-off'>-10%</div>
                        </div>
                        <div className='price-box'>
                            <div className='old-price'>1.200.000 <span className='unit'>đ</span></div>
                            <div className='price'>1.080.000 <span className='unit'>đ</span></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookGroup;