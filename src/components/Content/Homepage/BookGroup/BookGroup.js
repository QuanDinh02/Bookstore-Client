import './BookGroup.scss';
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from 'react';
import { getBooksByBookCategory } from '../../../Services/apiServices';
import { useHistory } from 'react-router-dom';
import { NumberFormat } from '../../../FormatNumber/currencyFormat';

const BookGroup = (props) => {

    const { group_title, book_group_id } = props;
    const [bookList, setBookList] = useState([]);
    const history = useHistory();

    const fetchBookList = async (id) => {
        let result = await getBooksByBookCategory(id, 6,1);
        if (result && result.EC === 0) {
            setBookList(result.DT.books_data);
        }
    }

    const handleSeeBookDetail = (bookId) => {
        history.push(`/book/${bookId}`);
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        fetchBookList(book_group_id);
    }, []);

    return (
        <div className="book-group-container">
            <div className='book-group-title'>
                <div className='title'>{group_title}</div>
                <div className='see-more d-flex'>
                    <span className='redirect'>See more</span> 
                    <span><IoIosArrowForward /></span>
                </div>
            </div>
            <div className='book-group-main row row-cols-2 row-cols-lg-3 justify-content-center justify-content-md-between justify-content-xl-start justify-content-xxl-between'>
                {bookList && bookList.length > 0 &&
                    bookList.map((item) => {
                        return (
                            <div
                                className='book col mx-xl-5 mx-xxl-1'
                                key={`book-item-${item.id}`}
                                onClick={() => handleSeeBookDetail(item.id)}
                            >
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
                                        <div className='sale-off'>
                                        -{Math.round(((item.price - item.current_price) * 100) / item.price)}%
                                        </div>
                                    </div>
                                    <div className='price-box'>
                                        <div className='old-price'>{NumberFormat(item.price)}</div>
                                        <div className='price'>{NumberFormat(item.current_price)}</div>
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