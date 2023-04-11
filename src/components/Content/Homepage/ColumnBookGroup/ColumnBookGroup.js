import './ColumnBookGroup.scss';
import { IoIosStar } from "react-icons/io";
import { useEffect, useState } from 'react';
import { getBooksByBookCategory } from '../../../Services/apiServices';
import { useHistory } from 'react-router-dom';
import { NumberFormat } from '../../../FormatNumber/currencyFormat';

const ColumnBookGroup = (props) => {

    const { group_title, book_group_id } = props;
    const [bookList, setBookList] = useState([]);
    const history = useHistory();

    const fetchBookList = async (id) => {
        let result = await getBooksByBookCategory(id);
        if (result && result.EC === 0) {
            setBookList(result.DT);
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
        <div className='column-book-group-container'>
            <div className='book-group-title'>
                {group_title}
            </div>
            <div className='book-group-content'>
                {bookList && bookList.length > 0 &&
                    bookList.map((item) => {
                        return (
                            <div className='book' key={`book-column-item-${item.id}`}>
                                <div className='book-image'>
                                    <img src={`data:image/jpeg;base64,${item.image}`} alt='' title={item.name} onClick={() => handleSeeBookDetail(item.id)} />
                                </div>
                                <div className='book-content'>
                                    <div className='title' title={item.name} onClick={() => handleSeeBookDetail(item.id)}>{item.name}</div>
                                    <div className='author'>{item.author}</div>
                                    <div className='rate'>
                                        {item.rate && item.rate > 0 &&
                                            [...Array(item.rate)].map(item => {
                                                return (
                                                    <IoIosStar className='star' />
                                                )
                                            })
                                        }
                                        {item.rate < 5 && item.rate > 0 &&
                                            [...Array(5 - item.rate)].map(item => {
                                                return (
                                                    <IoIosStar className='no-star' />
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='price'>
                                        <span className='old-price'>{NumberFormat(item.price)}</span>
                                        <span className='new-price'>{NumberFormat(item.current_price)}</span>
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
export default ColumnBookGroup;