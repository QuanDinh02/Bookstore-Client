import { FaRegTrashAlt } from 'react-icons/fa';
import { MdModeEditOutline } from 'react-icons/md';
import { HiChevronUpDown } from 'react-icons/hi2';
import { AiOutlinePlus } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import ModalBookCategory from '../Modal/ModalBookCategory';
import ModalCategoryGroup from '../Modal/ModalCategoryGroup';
import { getAllBookCategory, getAllBookCategoryGroup } from '../../Services/adminServices';
import { useImmer } from 'use-immer';

const BookCategories = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [modalType, setModalType] = useState('');

    const [showModalCategory, setShowModalCategory] = useState(false);
    const [bookCatgoryList, setBookCategoryList] = useImmer([]);
    const [categoryCurrentPage, setCategoryCurrentPage] = useState(1);
    const [categoryLimit, setCategoryLimit] = useState(3);

    const [showModalGroup, setShowModalGroup] = useState(false);
    const [catgoryGroupList, setCategoryGroupList] = useImmer([]);
    const [groupCurrentPage, setGroupCurrentPage] = useState(1);
    const [groupLimit, setGroupLimit] = useState(3);

    const { setTitle } = props;

    const [moddifiedData, setModifiedData] = useState({
        category_name: '',
        category_group: '0'
    });

    // handle pagination
    const handlePageClick = (event) => {
        setCategoryCurrentPage(+event.selected + 1);
    }

    const handleGroupPageClick = (event) => {
        setGroupCurrentPage(+event.selected + 1);
    }

    const handleShowModal = (action, type, data = '') => {

        setModalType(action);

        if (type === 'CATEGORY') {
            if (action === 'CREATE') {
                setModifiedData({
                    category_name: '',
                    category_group: '0'
                })
            }
            else if (action === 'UPDATE') {
                setModifiedData({
                    category_id: data?.id,
                    category_name: data?.name,
                    category_group: `${data?.BookCategoryGroup.id}`
                })
            } else {
                setModifiedData({
                    category_id: data?.id,
                    category_name: data?.name
                })
            }

            setShowModalCategory(true);
        } else {

            if (action === 'CREATE') {
                setModifiedData({
                    category_group_name: ''
                })
            }

            if (action === 'UPDATE' || action === 'DELETE') {
                setModifiedData({
                    category_group_id: data?.id,
                    category_group_name: data?.name
                })
            }

            setShowModalGroup(true);
        }
    }

    const fetchBookCategoryWithPagination = async () => {
        let result = await getAllBookCategory(categoryLimit, categoryCurrentPage);
        if (result && result.EC === 0) {
            setBookCategoryList(result.DT);
        }
    }

    const fetchBookCategoryGroupWithPagination = async () => {
        let result = await getAllBookCategoryGroup(groupLimit, groupCurrentPage);
        if (result && result.EC === 0) {
            setCategoryGroupList(result.DT);
        }
    }

    useEffect(() => {
        fetchBookCategoryWithPagination();
    }, [categoryCurrentPage]);

    useEffect(() => {
        fetchBookCategoryGroupWithPagination();
    }, [groupCurrentPage]);

    useEffect(() => {
        setTitle('Book Category');

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    return (
        <>
            {isLoading === true ?
                <TailSpin
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass="d-flex justify-content-center align-items-center tail-spin"
                    visible={true}
                />
                :
                <>
                    <div className="book-category-management-container">
                        <div className="book-category-list-top d-flex justify-content-between align-items-center px-4 py-3">
                            <span className="table-title">Category List</span>
                            <button className="btn" onClick={() => handleShowModal('CREATE', 'CATEGORY')}><AiOutlinePlus /> Add New Category</button>
                        </div>
                        <div className="book-category-list-bottom px-4 py-3">
                            <div className="select-search-box d-flex justify-content-between">
                                <div className="item-amount-select d-flex align-items-center gap-1">
                                    <span>Show</span>
                                    <select className="form-select">
                                        <option defaultValue="10">10</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                    <span> entries</span>
                                </div>
                                <div className="select-box d-flex align-items-center gap-1">
                                    <label>Search: </label>
                                    <input type='text' className="form-control" />
                                </div>
                            </div>
                            <div className="book-category-list mt-4">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <td className='table-head'>
                                                <span className='d-flex align-items-center gap-2'>No <HiChevronUpDown className='filter-icon' /></span>
                                            </td>
                                            <td className='table-head'>
                                                <span className='d-flex align-items-center gap-2'>Category Name <HiChevronUpDown className='filter-icon' /></span>
                                            </td>
                                            <td className='table-head'>
                                                <span className='d-flex align-items-center gap-2'>Category Group <HiChevronUpDown className='filter-icon' /></span>
                                            </td>
                                            <td className='table-head'>
                                                <span className='d-flex align-items-center gap-2'>Actions <HiChevronUpDown className='filter-icon' /></span>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookCatgoryList?.book_categories && bookCatgoryList?.book_categories.length > 0 &&
                                            bookCatgoryList?.book_categories.map((item, index) => {
                                                return (
                                                    <tr key={`book-category-item-${item.id}`}>
                                                        <td>{(categoryCurrentPage - 1) * categoryLimit + index + 1}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.BookCategoryGroup.name}</td>
                                                        <td className='actions text-center'>
                                                            <div className='d-flex  gap-3'>
                                                                <div className='edit-btn px-1' title='Edit' onClick={() => handleShowModal('UPDATE', 'CATEGORY', item)}>
                                                                    <MdModeEditOutline className='icon' />
                                                                </div>
                                                                <div className='delete-btn px-1' title='Delete' onClick={() => handleShowModal('DELETE', 'CATEGORY', { id: item.id, name: item.name })}>
                                                                    <FaRegTrashAlt className='icon' />
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        {
                                            bookCatgoryList?.book_categories.length < categoryLimit &&
                                            [...Array(categoryLimit - bookCatgoryList?.book_categories.length)].map(item => {
                                                return (
                                                    <tr key={`empty-item-${item}`}>
                                                        <td>...</td>
                                                        <td>...</td>
                                                        <td>...</td>
                                                        <td>...</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <div className='pagination-container pt-3'>
                                    <ReactPaginate
                                        nextLabel="next >"
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={3}
                                        marginPagesDisplayed={3}
                                        pageCount={bookCatgoryList?.total_pages}
                                        previousLabel="< previous"
                                        pageClassName="page-item"
                                        pageLinkClassName="page-link page-background"
                                        previousClassName="page-item"
                                        previousLinkClassName="page-link pre-next"
                                        nextClassName="page-item"
                                        nextLinkClassName="page-link pre-next"
                                        breakLabel="..."
                                        breakClassName="page-item"
                                        breakLinkClassName="page-link"
                                        containerClassName="pagination justify-content-end"
                                        activeLinkClassName="page-active-background"
                                        renderOnZeroPageCount={null}
                                    />
                                </div>
                            </div>
                        </div>
                        <ModalBookCategory
                            data={moddifiedData}
                            type={modalType}
                            show={showModalCategory}
                            setShow={setShowModalCategory}
                            fetchBookCategory={fetchBookCategoryWithPagination}
                        />
                    </div>
                    <div className="book-category-management-container">
                        <div className="book-category-list-top d-flex justify-content-between align-items-center px-4 py-3">
                            <span className="table-title">Category Groups</span>
                            <button className="btn" onClick={() => handleShowModal('CREATE', 'CATEGORY_GROUP')}><AiOutlinePlus /> Add New Group</button>
                        </div>
                        <div className="book-category-list-bottom px-4 py-3">
                            <div className="select-search-box d-flex">
                                <div className="select-box d-flex align-items-center gap-1">
                                    <label>Search: </label>
                                    <input type='text' className="form-control" />
                                </div>
                            </div>
                            <div className="book-category-list mt-4">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <td className='table-head'>
                                                <span className='d-flex align-items-center gap-2'>No<HiChevronUpDown className='filter-icon' /></span>
                                            </td>
                                            <td className='table-head'>
                                                <span className='d-flex align-items-center gap-2'>Group Name<HiChevronUpDown className='filter-icon' /></span>
                                            </td>
                                            <td className='table-head'>
                                                <span className='d-flex align-items-center gap-2'>Create Time<HiChevronUpDown className='filter-icon' /></span>
                                            </td>
                                            <td className='table-head'>
                                                <span className='d-flex align-items-center gap-2'>Update Time<HiChevronUpDown className='filter-icon' /></span>
                                            </td>
                                            <td className='table-head'>
                                                <span className='d-flex align-items-center gap-2'>Actions<HiChevronUpDown className='filter-icon' /></span>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {catgoryGroupList?.category_groups && catgoryGroupList?.category_groups.length > 0 &&
                                            catgoryGroupList?.category_groups.map((item, index) => {
                                                return (
                                                    <tr key={`book-category-group-item-${item.id}`}>
                                                        <td>{(groupCurrentPage - 1) * groupLimit + index + 1}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.createdAt}</td>
                                                        <td>{item.updatedAt}</td>
                                                        <td className='actions text-center'>
                                                            <div className='d-flex  gap-3'>
                                                                <div className='edit-btn px-1' title='Edit' onClick={() => handleShowModal('UPDATE', 'CATEGORY_GROUP', item)}>
                                                                    <MdModeEditOutline className='icon' />
                                                                </div>
                                                                <div className='delete-btn px-1' title='Delete' onClick={() => handleShowModal('DELETE', 'CATEGORY_GROUP', { id: item.id, name: item.name })}>
                                                                    <FaRegTrashAlt className='icon' />
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        {
                                            catgoryGroupList?.category_groups.length < groupLimit &&
                                            [...Array(groupLimit - catgoryGroupList?.category_groups.length)].map(item => {
                                                return (
                                                    <tr key={`empty-item-${item}`}>
                                                        <td>...</td>
                                                        <td>...</td>
                                                        <td>...</td>
                                                        <td>...</td>
                                                        <td>...</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <div className='pagination-container pt-3'>
                                    <ReactPaginate
                                        nextLabel="next >"
                                        onPageChange={handleGroupPageClick}
                                        pageRangeDisplayed={3}
                                        marginPagesDisplayed={3}
                                        pageCount={catgoryGroupList?.total_pages}
                                        previousLabel="< previous"
                                        pageClassName="page-item"
                                        pageLinkClassName="page-link page-background"
                                        previousClassName="page-item"
                                        previousLinkClassName="page-link pre-next"
                                        nextClassName="page-item"
                                        nextLinkClassName="page-link pre-next"
                                        breakLabel="..."
                                        breakClassName="page-item"
                                        breakLinkClassName="page-link"
                                        containerClassName="pagination justify-content-end"
                                        activeLinkClassName="page-active-background"
                                        renderOnZeroPageCount={null}
                                    />
                                </div>
                            </div>
                        </div>
                        <ModalCategoryGroup
                            data={moddifiedData}
                            type={modalType}
                            show={showModalGroup}
                            setShow={setShowModalGroup}
                            fetchBookCategoryGroup={fetchBookCategoryGroupWithPagination}
                        />
                    </div>
                </>
            }
        </>
    )
}

export default BookCategories;