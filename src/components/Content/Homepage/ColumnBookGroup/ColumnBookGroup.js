import './ColumnBookGroup.scss';
import { IoMdStarHalf,IoIosStar } from "react-icons/io";
import { useEffect, useState } from 'react';
import { getBooksByBookCategory } from '../../../Services/apiServices';

const ColumnBookGroup = (props) => {

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
        <div className='column-book-group-container tomato'>
            <div className='book-group-title'>
                {group_title}
            </div>
            <div className='book-group-content'>
                {bookList && bookList.length > 0 &&
                    bookList.map((item) => {
                        return (
                            <div className='book' key={`book-item-${item.id}`}>
                                <div className='book-image'>
                                    <img src={`data:image/jpeg;base64,${item.image}`} alt='' title={item.name} />
                                </div>
                                <div className='book-content'>
                                    <div className='title' title={item.name}>{item.name}</div>
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
                                                    <IoIosStar className='no-star'/>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='price'>
                                        <span className='old-price'>{item.price} <span className='unit'>đ</span></span>
                                        <span className='new-price'>{item.current_price} <span className='unit'>đ</span></span>
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