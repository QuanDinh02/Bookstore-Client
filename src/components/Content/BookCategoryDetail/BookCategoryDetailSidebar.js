import { IoIosArrowForward } from "react-icons/io";

const BookCategoryDetailSidebar = (props) => {

    const { data } = props;

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
                        <div key={`category-item-${item.id}`} className="category-item d-flex align-items-center justify-content-between">
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
                        <div key={`category-item-author-${item.id}`} className="category-item d-flex align-items-center justify-content-between">
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
                        <div key={`category-item-publisher-${item.id}`} className="category-item d-flex align-items-center justify-content-between">
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