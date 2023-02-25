import { useState } from "react"
import { IoIosArrowForward } from "react-icons/io";
import './BookCategory.scss';

const BookCategory = (props) => {

    const { show, showDetailBookCategory, setShowDetailBookCategory } = props;

    const [listOfBookCategory, setListOfBookCategory] = useState([
        'Best selller', 'Best selller', 'Best selller', 'Best selller', 'Best selller',
        'Best selller', 'Best selller', 'Best selller', 'Best selller', 'Best selller',
        'Best selller', 'Best selller', 'Best selller', 'Best selller', 'Best selller'
    ]);

    const handleSelectItem = (index) => {
        console.log("index = ", index);
        setShowDetailBookCategory(true);
        setDataDetailBookCategory(index);
    }

    const [dataDetailBookCategory, setDataDetailBookCategory] = useState(-1);

    return (
        <>
            {show === true &&
                <>
                    <div
                        className="book-category col-3"
                    >
                        {listOfBookCategory && listOfBookCategory.length > 0 &&
                            listOfBookCategory.map((item, index) => {
                                return (
                                    <div
                                        className="category-item d-flex align-items-center justify-content-between"
                                        onClick={() => handleSelectItem(index)}
                                    >
                                        <span className="category-title">Best Seller</span>
                                        <IoIosArrowForward className="icon" />
                                    </div>
                                )
                            })
                        }
                    </div>
                    {showDetailBookCategory === true &&
                        <div className="book-category-detail col-9 blue">
                            {dataDetailBookCategory}
                        </div>
                    }
                </>
            }
        </>
    )
}

export default BookCategory