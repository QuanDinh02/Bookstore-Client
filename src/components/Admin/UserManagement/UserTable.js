import { FaRegTrashAlt } from 'react-icons/fa';
import { MdModeEditOutline } from 'react-icons/md';
import { BsArrowDownUp } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import User from '../../../assets/image/user.png';
import { useHistory } from 'react-router-dom';

const UserTable = () => {

    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    // handle pagination
    const handlePageClick = () => {

    }

    const handleAddNewUser = () => {
        history.push('/admin/manager/user-add-new');
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
                <div className="users-management-container">
                    <div className="users-list-top d-flex justify-content-between align-items-center px-4 py-3">
                        <span className="table-title">User List</span>
                        <button className="btn" onClick={handleAddNewUser}><AiOutlinePlus /> Add New User</button>
                    </div>
                    <div className="users-list-bottom px-4 py-3">
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
                        <div className="users-list mt-4">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <td className='table-head'>
                                            <span className='d-flex justify-content-between'>No <BsArrowDownUp className='filter-icon' /></span>
                                        </td>
                                        <td className='table-head'>
                                            <span>Profile</span>
                                        </td>
                                        <td className='table-head'>
                                            <span className='d-flex justify-content-between'>Username <BsArrowDownUp className='filter-icon' /></span>
                                        </td>
                                        <td className='table-head'>
                                            <span className='d-flex justify-content-between'>Email <BsArrowDownUp className='filter-icon' /></span>
                                        </td>
                                        <td className='table-head'>
                                            <span>Contact</span>
                                        </td>
                                        <td className='table-head'>
                                            <span className='d-flex justify-content-between'>Join Date <BsArrowDownUp className='filter-icon' /></span>
                                        </td>
                                        <td className='table-head'>
                                            <span className='d-flex justify-content-between'>Gender <BsArrowDownUp className='filter-icon' /></span>
                                        </td>
                                        <td className='table-head'>
                                            <span className='d-flex justify-content-between'>Role <BsArrowDownUp className='filter-icon' /></span>
                                        </td>
                                        <td className='table-head'>
                                            <span className='d-flex justify-content-between'>Actions <BsArrowDownUp className='filter-icon' /></span>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        [...Array(5)].map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td className='text-center user-img'><img src={User}></img></td>
                                                    <td className='username'>Steve Hopp</td>
                                                    <td className='email'>steve@gmail.com</td>
                                                    <td className='phone'>0123456789</td>
                                                    <td className='join-date'>03/08/2022</td>
                                                    <td className='gender'>Man</td>
                                                    <td className='user-group'>Customer</td>
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

export default UserTable;
