import './BookGroup.scss';
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from 'react';
import { getBooksByBookCategory } from '../../../Services/apiServices';

const BookGroup = (props) => {

    const { group_title, book_group_id } = props;
    const [bookList, setBookList] = useState([]);

    const fetchBookList = async (id) => {
        let result = await getBooksByBookCategory(id);
        if (result && result.EC === 0) {
            setBookList(result.DT);
        }
    }

    useEffect(() => {
        fetchBookList(book_group_id);
    }, []);

    return (
        <div className="book-group-container">
            <div className='book-group-title'>
                <div className='title'>{group_title}</div>
                <div>
                    <span className='redirect'>See more</span> <IoIosArrowForward />
                </div>
            </div>
            <div className='book-group-main d-flex flex-wrap justify-content-around'>
                {bookList && bookList.length > 0 &&
                    bookList.map((item) => {
                        return (
                            <div className='book' key={`book-item-${item.id}`}>
                                <div className='content '>
                                    <div className='book-image'>
                                        <img src={`data:image/jpeg;base64,${item.image}`} alt='' title={item.name} />
                                    </div>
                                    <div className='book-info'>
                                        <div className='title' title={item.name}>
                                            {item.name}
                                        </div>
                                        <div className='author'>
                                            {item.author}
                                        </div>
                                        <div className='description'>
                                            {item.description}
                                        </div>
                                    </div>
                                </div>
                                <div className='price-container'>
                                    <div>
                                        <div className='sale-off'>-10%</div>
                                    </div>
                                    <div className='price-box'>
                                        <div className='old-price'>{item.price} <span className='unit'>đ</span></div>
                                        <div className='price'>{item.current_price} <span className='unit'>đ</span></div>
                                    </div>

                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default BookGroup;