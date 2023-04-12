import { FaRegTrashAlt } from 'react-icons/fa';
import { MdModeEditOutline } from 'react-icons/md';
import { HiChevronUpDown } from 'react-icons/hi2';
import { AiOutlinePlus } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import User from '../../../assets/image/user.png';
import { useHistory } from 'react-router-dom';
import ModalUser from '../Modal/ModalUser';
import { getUserWithPagination } from '../../Services/adminServices';
import { useImmer } from 'use-immer';

const UserTable = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    const [modalType, setModalType] = useState('');

    const [showModalUser, setShowModalUser] = useState(false);
    const [usersList, setUsersList] = useImmer([]);
    const [userCurrentPage, setUserCurrentPage] = useState(1);
    const [userLimit, setUserLimit] = useState(2);

    const { setTitle } = props;

    const [moddifiedData, setModifiedData] = useState({
        user_id: '',
        fullname: '',
        username: '',
        email: '',
        phone: '',
        address: '',
        dob: '',
        gender: '',
        facebook_url: '',
        twitter_url: '',
        user_group: '',
        image: ''
    });

    // handle pagination
    const handlePageClick = (event) => {
        setUserCurrentPage(+event.selected + 1);
    }

    const handleShowModal = (action, data = {}) => {
        setModalType(action);

        if (action === 'UPDATE') {
            setModifiedData({
                user_id: data.id,
                fullname: data?.fullname,
                username: data?.username,
                email: data?.email,
                phone: data?.phone,
                address: data?.address,
                dob: data?.dob,
                gender: data?.gender,
                facebook_url: data?.facebook_url,
                twitter_url: data?.twitter_url,
                user_group: `${data?.UserGroup.id}`,
                image: data?.image
            })
        } else {
            setModifiedData({
                user_id: data.id,
                username: data?.username
            })
        }

        setShowModalUser(true);
    }

    const handleAddNewUser = () => {
        history.push('/admin/manager/user-add-new');
    }

    const fetchUserWithPagination = async () => {
        let result = await getUserWithPagination(userLimit, userCurrentPage);
        if (result && result.EC === 0) {
            setUsersList(result.DT);
        }
    }

    useEffect(() => {
        fetchUserWithPagination();
    }, [userCurrentPage]);

    useEffect(() => {
        setTitle('User');
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
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <td className='table-head'>
                                            <span className='d-flex align-items-center gap-2'>No <HiChevronUpDown className='filter-icon' /></span>
                                        </td>
                                        <td className='table-head'>
                                            <span>Profile</span>
                                        </td>
                                        <td className='table-head'>
                                            <span className='d-flex align-items-center gap-2'>Username <HiChevronUpDown className='filter-icon' /></span>
                                        </td>
                                        <td className='table-head'>
                                            <span className='d-flex align-items-center gap-2'>Email <HiChevronUpDown className='filter-icon' /></span>
                                        </td>
                                        <td className='table-head'>
                                            <span>Contact</span>
                                        </td>
                                        <td className='table-head'>
                                            <span className='d-flex align-items-center gap-2'>Dob <HiChevronUpDown className='filter-icon' /></span>
                                        </td>
                                        <td className='table-head'>
                                            <span className='d-flex align-items-center gap-2'>Gender <HiChevronUpDown className='filter-icon' /></span>
                                        </td>
                                        <td className='table-head'>
                                            <span className='d-flex align-items-center gap-2'>Role <HiChevronUpDown className='filter-icon' /></span>
                                        </td>
                                        <td className='table-head'>
                                            <span className='d-flex align-items-center gap-2'>Actions <HiChevronUpDown className='filter-icon' /></span>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersList?.users && usersList?.users.length > 0 &&
                                        usersList?.users.map((item, index) => {
                                            return (
                                                <tr key={`user-info-${item.id}`}>
                                                    <td>{(userCurrentPage - 1) * userLimit + index + 1}</td>
                                                    <td className='user-img'>
                                                        {item.image ?
                                                            <img src={`data:image/jpeg;base64,${item.image}`} alt='' />
                                                            :
                                                            <img src={User}></img>
                                                        }
                                                    </td>
                                                    <td className='username'>{item.username}</td>
                                                    <td className='email'>{item.email}</td>
                                                    <td className='phone'>{item.phone}</td>
                                                    <td className='dob'>{item.dob}</td>
                                                    <td className='gender'>{item.gender}</td>
                                                    <td className='user-group'>{item.UserGroup.name}</td>
                                                    <td className='actions text-center'>
                                                        <div className='d-flex gap-3'>
                                                            <div className='edit-btn px-1' title='Edit' onClick={() => handleShowModal('UPDATE', item)}>
                                                                <MdModeEditOutline className='icon' />
                                                            </div>
                                                            <div className='delete-btn px-1' title='Delete' onClick={() => handleShowModal('DELETE', item)}>
                                                                <FaRegTrashAlt className='icon' />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    {
                                        usersList?.users.length < userLimit &&
                                        [...Array(userLimit - usersList?.users.length)].map(item => {
                                            return (
                                                <tr key={`empty-item-${item}`}>
                                                    {[...Array(9)].map(i => {
                                                        return (
                                                            <td>...</td>
                                                        )
                                                    })}
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
                                    pageCount={usersList?.total_pages}
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
                    <ModalUser
                        data={moddifiedData}
                        type={modalType}
                        show={showModalUser}
                        setShow={setShowModalUser}
                        fetchUsers={fetchUserWithPagination}
                    />
                </div>
            }
        </>
    )
}

export default UserTable;
