import './HighlightBook.scss';
import HighlighBook from '../../../../assets/image/HighlightBook.png';

const HighlightBook = () => {
    return (
        <div className='highlight-book-container blue'>
            <div className='book-category-title'>
                Best New Book
            </div>
            <div className='book-content d-flex flex-column flex-lg-row align-items-center align-items-lg-start justify-content-between'>
                <div className='book-image col-9 col-md-6 col-lg-3 mb-4'>
                    <img src={HighlighBook} alt='' title='The begin of Empire: The Wuzong Niel' />
                </div>
                <div className='content col-12 col-lg-8'>
                    <div className='title' title='The begin of Empire: The Wuzong Niel'>
                        <strong>The begin of Empire: The Wuzong Niel</strong>
                    </div>
                    <div className='author'>
                        Dr Strange
                    </div>
                    <div className='description'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make
                        a type specimen book. It has survived not only five centuries, but also the
                        leap into electronic typesetting, remaining essentially unchanged. It was
                        popularised in the 1960s with the release of Letraset sheets containing Lorem
                        Ipsum passages
                    </div>
                    <div className='buy-box d-md-flex flex-md-row justify-content-md-between '>
                        <div className='left mt-2 col-12 col-md-7 d-flex align-items-center gap-2 gap-xxl-3 justify-content-around justify-content-md-start'>
                            <div className='sale-off'>-10%</div>
                            <div className='old-price'>1.200.000 <span className='unit'>đ</span></div>
                            <div className='price'>1.080.000 <span className='unit'>đ</span></div>
                        </div>

                        <div className='right mt-2 col-12 col-md-3 d-md-flex justify-content-md-center'>
                            <span>Buy Now</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HighlightBook;