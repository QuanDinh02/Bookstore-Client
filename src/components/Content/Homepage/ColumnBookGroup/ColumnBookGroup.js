import './ColumnBookGroup.scss';
import RightBook from '../../../../assets/image/RightBook.png';
import { AiFillStar } from "react-icons/ai";

const ColumnBookGroup = () => {
    return (
        <div className='column-book-group-container tomato'>
            <div className='book-group-title'>
                Best Sale Book In Week
            </div>
            <div className='book-group-content'>
                <div className='book'>
                    <div className='book-image'>
                        <img src={RightBook} alt='' title='Đắc Nhân Tâm'/>
                    </div>
                    <div className='book-content'>
                        <div className='title' title='Đắc Nhân Tâm'>{`Đắc Nhân Tâm (Khổ Nhỏ Tái Bản 2022)`}</div>
                        <div className='author'>Donna Dale Carnegie</div>
                        <div className='rate'>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                        </div>
                        <div className='price'>
                            <span className='old-price'>58.000 <span className='unit'>đ</span></span>
                            <span className='new-price'>48.000 <span className='unit'>đ</span></span>
                        </div>
                    </div>
                </div>
                <div className='book'>
                    <div className='book-image'>
                        <img src={RightBook} alt='' />
                    </div>
                    <div className='book-content'>
                        <div className='title'>{`Đắc Nhân Tâm (Khổ Nhỏ Tái Bản 2022)`}</div>
                        <div className='author'>Donna Dale Carnegie</div>
                        <div className='rate'>
                        </div>
                        <div className='price'>
                            <span className='old-price'>58.000 <span className='unit'>đ</span></span>
                            <span className='new-price'>48.000 <span className='unit'>đ</span></span>
                        </div>
                    </div>
                </div>
                <div className='book'>
                    <div className='book-image'>
                        <img src={RightBook} alt='' />
                    </div>
                    <div className='book-content'>
                        <div className='title'>{`Đắc Nhân Tâm (Khổ Nhỏ Tái Bản 2022)`}</div>
                        <div className='author'>Donna Dale Carnegie</div>
                        <div className='rate'>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                        </div>
                        <div className='price'>
                            <span className='old-price'>58.000 <span className='unit'>đ</span></span>
                            <span className='new-price'>48.000 <span className='unit'>đ</span></span>
                        </div>
                    </div>
                </div>
                <div className='book'>
                    <div className='book-image'>
                        <img src={RightBook} alt='' />
                    </div>
                    <div className='book-content'>
                        <div className='title'>{`Đắc Nhân Tâm (Khổ Nhỏ Tái Bản 2022)`}</div>
                        <div className='author'>Donna Dale Carnegie</div>
                        <div className='rate'>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                        </div>
                        <div className='price'>
                            <span className='old-price'>58.000 <span className='unit'>đ</span></span>
                            <span className='new-price'>48.000 <span className='unit'>đ</span></span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default ColumnBookGroup;