import { useState } from "react"
import { IoIosArrowForward } from "react-icons/io";
import './BookCategory.scss';

const BookCategory = (props) => {

    const { show } = props;

    const [listOfBookCategory, setListOfBookCategory] = useState([
        'Best selller', 'Best selller', 'Best selller', 'Best selller', 'Best selller',
        'Best selller', 'Best selller', 'Best selller', 'Best selller', 'Best selller',
        'Best selller', 'Best selller', 'Best selller', 'Best selller', 'Best selller'
    ]);

    return (
        <>
            {show === true &&
                <div className="book-category col-3">
                    {listOfBookCategory && listOfBookCategory.length > 0 &&
                        listOfBookCategory.map((item, index) => {
                            return (
                                <div>
                                    <div className="category-item d-flex align-items-center justify-content-between">
                                        <span className="category-title">Best Seller</span>
                                        <IoIosArrowForward className="icon" />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </>
    )
}

export default BookCategory