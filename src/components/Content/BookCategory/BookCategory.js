import { useEffect, useState } from "react"
import { IoIosArrowForward } from "react-icons/io";
import './BookCategory.scss';
import { getAllBookCategoryGroup } from "../../Services/apiServices";
import { useHistory } from "react-router-dom";

const BookCategory = (props) => {

    const {
        show, setShowBookCategory,
        showDetailBookCategory, setShowDetailBookCategory
    } = props;

    const [listOfBookCategoryGroup, setListOfBookCategoryGroup] = useState([]);

    const [listOfBookCategory, setListOfBookCategory] = useState([]);
    const [listOfAuthors, setListOfAuthors] = useState([]);
    const [listOfPublishers, setListOfPublishers] = useState([]);
    const [bookGroupID, setBookGroupID] = useState(0);

    const history = useHistory();

    const handleShowDetailBookCategory = (item) => {
        setShowDetailBookCategory(true);
        setBookGroupID(item.group_id);
        setListOfBookCategory(item.book_categories);
        setListOfAuthors(item.Authors);
        setListOfPublishers(item.Publishers);
    }

    const handleSelectItem = (type, id, name = 'None') => {
        setShowBookCategory(false);
        switch (type) {
            case 'BOOK_CATEROGY_GROUP':
                history.push(`/book-category/${id}`, { book_category_id: -1 })
                break;
            case 'BOOK_CATEROGY':
                history.push(`/book-category/${bookGroupID}`, { book_category_id: id, book_category_name: name })
                break;
            case 'AUTHOR':
                history.push(`/book-category/${bookGroupID}`, { book_category_id: -2, author_id: id, author_name: name })
                break;
            case 'PUBLISHER':
                history.push(`/book-category/${bookGroupID}`, { book_category_id: -3, publisher_id: id, publisher_name: name })
                break;
            default:
                break;
        }
    }

    const fetchAllBookCategoryGroup = async () => {
        let result = await getAllBookCategoryGroup();
        if (result && result.EC === 0) {
            setListOfBookCategoryGroup(result.DT);
        }
    }

    useEffect(() => {
        fetchAllBookCategoryGroup();
    }, []);

    return (
        <>
            {show === true &&
                <>
                    <div className="book-category col-3">
                        {listOfBookCategoryGroup && listOfBookCategoryGroup.length > 0 &&
                            listOfBookCategoryGroup.map((item, index) => {
                                return (
                                    <div
                                        key={`book-category-group-${item.group_id}`}
                                        className="category-item d-flex align-items-center justify-content-between"
                                        onClick={() => handleSelectItem('BOOK_CATEROGY_GROUP', item.group_id)}
                                        onMouseEnter={() => handleShowDetailBookCategory(item)}
                                    >
                                        <span className="category-title">{item.group_name}</span>
                                        <IoIosArrowForward className="icon" />
                                    </div>
                                )
                            })
                        }
                    </div>

                    {showDetailBookCategory === true &&
                        <div className="book-category-detail col-9">
                            <div className="content d-flex">
                                <div className="category col-4">
                                    <div className="title" >
                                        <span title={'CATEGORY'}>CATEGORY</span>
                                    </div>
                                    {listOfBookCategory && listOfBookCategory.length > 0 &&
                                        listOfBookCategory.map((item) => {
                                            return (
                                                <div
                                                    key={`book-category-${item.id}`}
                                                    className='title-box'
                                                    onClick={() => handleSelectItem('BOOK_CATEROGY', item.id, item.name)}
                                                >
                                                    <span
                                                        className="title-name"
                                                        title={item.name}
                                                    >
                                                        {item.name}
                                                    </span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="authors col-4">
                                    <div className="title">
                                        <span title={'AUTHORS'}>AUTHORS</span>
                                    </div>
                                    {listOfAuthors && listOfAuthors.length > 0 &&
                                        listOfAuthors.map((item) => {
                                            return (
                                                <div
                                                    key={`author-${item.id}`}
                                                    className='title-box'
                                                >
                                                    <span
                                                        className="title-name"
                                                        title={item.name}
                                                        onClick={() => handleSelectItem('AUTHOR', item.id, item.name)}
                                                    >
                                                        {item.name}
                                                    </span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="publishers col-4">
                                    <div className="title">
                                        <span title={'PUBLISHERS'}>PUBLISHERS</span>
                                    </div>
                                    {listOfPublishers && listOfPublishers.length > 0 &&
                                        listOfPublishers.map((item) => {
                                            return (
                                                <div
                                                    key={`publisher-${item.id}`}
                                                    className='title-box'
                                                >
                                                    <span
                                                        className="title-name"
                                                        title={item.name}
                                                        onClick={() => handleSelectItem('PUBLISHER', item.id, item.name)}
                                                    >
                                                        {item.name}
                                                    </span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    }
                </>
            }
        </>
    )
}

export default BookCategory