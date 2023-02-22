import './HighlightBook.scss';
import HighlighBook from '../../../../assets/image/HighlightBook.png';

const HighlightBook = () => {
    return (
        <div className='highlight-book-container blue'>
            <div className='book-category-title'>
                Best New Book
            </div>
            <div className='book-content d-flex flex-row justify-content-between'>
                <div className='book-image col-3'>
                    <img src={HighlighBook} alt='' title='The begin of Empire: The Wuzong Niel' />
                </div>
                <div className='content col-8'>
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
                    <div className='buy-box d-flex flex-row justify-content-between '>
                        <div className='left col-7 d-flex align-items-center gap-3'>
                            <div className='sale-off'>-10%</div>
                            <div className='old-price'>1.200.000 <span className='unit'>đ</span></div>
                            <div className='price'>1.080.000 <span className='unit'>đ</span></div>
                        </div>

                        <div className='right col-3 '>
                            <span>Buy Now</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HighlightBook;