import './HighlightBook.scss';
import { getHighlightBook } from '../../../Services/apiServices';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { AddShoppingCart } from '../../../../redux/action/actions';
import { NumberFormat } from '../../../FormatNumber/currencyFormat';

const HighlightBook = (props) => {

    const dispatch = useDispatch();

    const { book_title, backgroud_color, book_id } = props;
    const history = useHistory();

    const [bookData, setBookData] = useState({
        id: '',
        name: '',
        Author: '',
        description: '',
        price: 0,
        current_price: 0,
        image: ''
    });

    const handleAddBookToShoppingCart = (data) => {
        dispatch(AddShoppingCart(data));
    }

    const fetchHighlightBook = async (id) => {
        let result = await getHighlightBook(+id);
        if (result && result.EC === 0) {
            setBookData({
                id: result.DT.id,
                name: result.DT.name,
                Author: result.DT.Author.name,
                description: result.DT.description,
                price: result.DT.price,
                current_price: result.DT.current_price,
                image: result.DT.image
            });
        }
    }

    const handleSeeBookDetail = (bookId) => {
        history.push(`/book/${bookId}`);
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        fetchHighlightBook(book_id);
    }, []);

    return (
        <div className='highlight-book-container'>
            <div className='book-category-title '>
                {book_title}
            </div>
            <div className={`book-content d-flex flex-column flex-lg-row align-items-center align-items-lg-start justify-content-between ${backgroud_color}`}>
                <div className='book-image col-9 col-md-6 col-lg-3 mb-4'>
                    <img src={`data:image/jpeg;base64,${bookData.image}`} alt='' title={`${bookData.name}`} onClick={() => handleSeeBookDetail(book_id)} />
                </div>
                <div className='content col-12 col-lg-8'>
                    <div className={`title ${backgroud_color}`}>
                        <strong title={`${bookData.name}`} onClick={() => handleSeeBookDetail(book_id)}>{bookData.name}</strong>
                    </div>
                    <div className='author'>
                        {bookData.Author}
                    </div>
                    <div className='description'>
                        {bookData.description}
                        <span>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make
                            a type specimen book.
                        </span>

                    </div>
                    <div className='buy-box d-md-flex flex-md-row justify-content-md-between '>
                        <div className='left mt-2 col-12 col-md-7 d-flex align-items-center gap-2 gap-xxl-3 justify-content-around justify-content-md-start'>
                            <div className='sale-off'>
                                -{Math.round(((bookData.price - bookData.current_price) * 100) / bookData.price)}%
                            </div>
                            <div className='old-price'>{NumberFormat(bookData.price)}</div>
                            <div className='price'>{NumberFormat(bookData.current_price)}</div>
                        </div>

                        <div
                            className='right mt-2 col-12 col-md-3 d-md-flex justify-content-md-center'
                            onClick={() => handleAddBookToShoppingCart({
                                id: bookData.id,
                                title: bookData.name,
                                current_price: bookData.current_price,
                                price: bookData.price,
                                image: bookData.image,
                                amount: 1
                            })}
                        >
                            <span>Buy Now</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HighlightBook;