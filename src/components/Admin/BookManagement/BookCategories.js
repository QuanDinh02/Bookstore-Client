import { FaRegTrashAlt } from 'react-icons/fa';
import { MdModeEditOutline } from 'react-icons/md';
import { BsArrowDownUp } from 'react-icons/bs';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';

const BookCategories = () => {

    const [isLoading, setIsLoading] = useState(true);

    // handle pagination
    const handlePageClick = () => {

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
                <div className="book-category-management-container">
                    <div className="book-category-list-top d-flex justify-content-between align-items-center px-4 py-3">
                        <span className="table-title">Category Lists</span>
                        <button className="btn">Add New Category</button>
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
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <td className='table-head'>
                                            <span className='d-flex justify-content-between'>No <BsArrowDownUp className='filter-icon' /></span>
                                        </td>
                                        <td className='table-head'>
                                            <span className='d-flex justify-content-between'>Category Name <BsArrowDownUp className='filter-icon' /></span>
                                        </td>
                                        <td className='table-head'>
                                            <span className='d-flex justify-content-between'>Category Group <BsArrowDownUp className='filter-icon' /></span>
                                        </td>
                                        <td className='table-head'>
                                            <span className='d-flex justify-content-between'>Actions <BsArrowDownUp className='filter-icon' /></span>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        [...Array(5)].map(item => {
                                            return (
                                                <tr>
                                                    <td>1</td>
                                                    <td>Math Books</td>
                                                    <td>Science Books</td>
                                                    <td className='actions text-center'>
                                                        <div className='d-flex justify-content-center gap-3'>
                                                            <div className='edit-btn px-1' title='Edit'>
                                                                <MdModeEditOutline className='icon' />
                                                            </div>
                                                            <div className='delete-btn px-1' title='Delete'>
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
                </div>
            }
        </>
    )
}

export default BookCategories;