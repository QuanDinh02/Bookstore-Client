import { FaRegTrashAlt } from 'react-icons/fa';
import { MdModeEditOutline } from 'react-icons/md';
import { HiChevronUpDown } from 'react-icons/hi2';
import { AiOutlinePlus } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import ModalBookCategory from '../Modal/ModalBookCategory';
import ModalCategoryGroup from '../Modal/ModalCategoryGroup';

const BookCategories = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [modalType, setModalType] = useState('');

    const [showModalCategory, setShowModalCategory] = useState(false);

    const [showModalGroup, setShowModalGroup] = useState(false);

    // handle pagination
    const handlePageClick = () => {

    }

    const handleShowModal = (action, type) => {
        setModalType(action);
        if (type === 'CATEGORY') {
            setShowModalCategory(true);
        } else {
            setShowModalGroup(true);
        }

    }

    useEffect(() => {
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
                                        {
                                            [...Array(5)].map((item, index) => {
                                                return (
                                                    <tr key={`book-category-item-${index}`}>
                                                        <td>1</td>
                                                        <td>Math Books</td>
                                                        <td>Science Books</td>
                                                        <td className='actions text-center'>
                                                            <div className='d-flex  gap-3'>
                                                                <div className='edit-btn px-1' title='Edit' onClick={() => handleShowModal('UPDATE', 'CATEGORY')}>
                                                                    <MdModeEditOutline className='icon' />
                                                                </div>
                                                                <div className='delete-btn px-1' title='Delete' onClick={() => handleShowModal('DELETE', 'CATEGORY')}>
                                                                    <FaRegTrashAlt className='icon' />
                                                                </div>
                                                            </div>
                                                        </td>
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
                                        pageCount={5}
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
                            type={modalType}
                            show={showModalCategory}
                            setShow={setShowModalCategory}
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
                                        {
                                            [...Array(5)].map((item, index) => {
                                                return (
                                                    <tr key={`book-category-group-item-${index}`}>
                                                        <td>1</td>
                                                        <td>Science Books</td>
                                                        <td>2023-03-08 06:59:12</td>
                                                        <td>2023-03-08 06:59:12</td>
                                                        <td className='actions text-center'>
                                                            <div className='d-flex  gap-3'>
                                                                <div className='edit-btn px-1' title='Edit' onClick={() => handleShowModal('UPDATE', 'CATEGORY_GROUP')}>
                                                                    <MdModeEditOutline className='icon' />
                                                                </div>
                                                                <div className='delete-btn px-1' title='Delete' onClick={() => handleShowModal('DELETE', 'CATEGORY_GROUP')}>
                                                                    <FaRegTrashAlt className='icon' />
                                                                </div>
                                                            </div>
                                                        </td>
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
                                        pageCount={5}
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
                            type={modalType}
                            show={showModalGroup}
                            setShow={setShowModalGroup}
                        />
                    </div>
                </>
            }
        </>
    )
}

export default BookCategories;