import { IoIosArrowForward } from "react-icons/io";
import { useHistory } from "react-router-dom";

const BookCategoryDetailSidebar = (props) => {

    const { data } = props;
    const history = useHistory();

    const handleSelectSubBookCategory = (type, id, name = 'None') => {
        switch (type) {
            case 'BOOK_CATEROGY':
                history.push(`/book-category/${data?.group_id}`, { book_category_id: id, book_category_name: name })
                break;
            case 'AUTHOR':
                history.push(`/book-category/${data?.group_id}`, { book_category_id: -2, author_id: id, author_name: name })
                break;
            case 'PUBLISHER':
                history.push(`/book-category/${data?.group_id}`, { book_category_id: -3, publisher_id: id, publisher_name: name })
                break;
            default:
                break;
        }
    }

    return (
        <div className="book-category-sidebar">
            <div className="category-item d-flex align-items-center justify-content-between">
                <span className="category-title-fixed">Discount Books</span>
                <IoIosArrowForward className="icon" />
            </div>
            <div className="category-item d-flex align-items-center justify-content-between">
                <span className="category-title-fixed">Best Seller</span>
                <IoIosArrowForward className="icon" />
            </div>
            <div className="category-item d-flex align-items-center justify-content-between">
                <span className="category-title-fixed">New Books Release</span>
                <IoIosArrowForward className="icon" />
            </div>
            <div className="category-item d-flex align-items-center justify-content-between">
                <span className="category-title-fixed">Upcoming Books</span>
                <IoIosArrowForward className="icon" />
            </div>
            <div className="category-item d-flex align-items-center justify-content-between">
                <span className="category-title-fixed">Combo</span>
                <IoIosArrowForward className="icon" />
            </div>

            <div className="category-item no-cursor-pointer d-flex align-items-center justify-content-between">
                <span className="category-title-fixed section">BOOK CATEGORY</span>
            </div>
            {
                data?.book_categories?.map(item => {
                    return (
                        <div
                            key={`category-item-${item.id}`}
                            className="category-item d-flex align-items-center justify-content-between"
                            onClick={() => handleSelectSubBookCategory('BOOK_CATEROGY', item.id, item.name)}
                        >
                            <span className="category-title">{item.name}</span>
                            <IoIosArrowForward className="icon" />
                        </div>
                    )
                })
            }

            <div className="category-item no-cursor-pointer d-flex align-items-center justify-content-between">
                <span className="category-title-fixed section">AUTHOR</span>
            </div>
            {
                data?.Authors?.map(item => {
                    return (
                        <div
                            key={`category-item-author-${item.id}`}
                            className="category-item d-flex align-items-center justify-content-between"
                            onClick={() => handleSelectSubBookCategory('AUTHOR', item.id, item.name)}
                        >
                            <span className="category-title">{item.name}</span>
                            <IoIosArrowForward className="icon" />
                        </div>
                    )
                })
            }

            <div className="category-item no-cursor-pointer d-flex align-items-center justify-content-between">
                <span className="category-title-fixed section">PUBLISHERS</span>
            </div>
            {
                data?.Publishers?.map(item => {
                    return (
                        <div
                            key={`category-item-publisher-${item.id}`}
                            className="category-item d-flex align-items-center justify-content-between"
                            onClick={() => handleSelectSubBookCategory('PUBLISHER', item.id, item.name)}
                        >
                            <span className="category-title">{item.name}</span>
                            <IoIosArrowForward className="icon" />
                        </div>
                    )
                })
            }

        </div>
    )
}

export default BookCategoryDetailSidebar;