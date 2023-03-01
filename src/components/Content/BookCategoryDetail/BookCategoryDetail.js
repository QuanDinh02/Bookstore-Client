import { useParams } from 'react-router-dom';
import './BookCategoryDetail.scss';

const BookCategoryDetail = () => {

    const {id} = useParams();

    return (
        <div className="book-category-detail-container container">
            book category detail {id}
        </div>
    )
}

export default BookCategoryDetail;