import { FaRegTrashAlt } from 'react-icons/fa';
import { MdModeEditOutline } from 'react-icons/md';
import { HiChevronUpDown } from 'react-icons/hi2';
import { AiOutlinePlus } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import User from '../../../assets/image/user.png';
import ModalAuthor from '../Modal/ModalAuthor';
import { useImmer } from 'use-immer';
import { getAuthorWithPagination } from '../../Services/adminServices';

const Authors = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [modalType, setModalType] = useState('');

    const [showModalAuthor, setShowModalAuthor] = useState(false);
    const [authorsList, setAuthorsList] = useImmer([]);
    const [authorCurrentPage, setAuthorCurrentPage] = useState(1);
    const [authorLimit, setAuthorLimit] = useState(2);

    const [moddifiedData, setModifiedData] = useState({
        author_name: '',
        author_description: '',
        image: ''
    });

    // handle pagination
    const handlePageClick = (event) => {
        setAuthorCurrentPage(+event.selected + 1);
    }

    const handleShowModal = (action, data = {}) => {
        setModalType(action);

        if (action === 'CREATE') {
            setModifiedData({
                author_name: '',
                author_description: '',
                image: ''
            })
        }
        else if (action === 'UPDATE') {
            setModifiedData({
                author_id: data?.id,
                author_name: data?.name,
                author_description: data?.description ? data.description : '',
                author_image: data?.image
            })
        } else {
            setModifiedData({
                author_id: data?.id,
                author_name: data?.name
            })
        }

        setShowModalAuthor(true);
    }

    const fetchAuthorWithPagination = async () => {
        let result = await getAuthorWithPagination(authorLimit, authorCurrentPage);
        if (result && result.EC === 0) {
            setAuthorsList(result.DT);
        }
    }

    useEffect(() => {
        fetchAuthorWithPagination();
    }, [authorCurrentPage]);

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
                <div className="authors-management-container">
                    <div className="authors-list-top d-flex justify-content-between align-items-center px-4 py-3">
                        <span className="table-title">Authors List</span>
                        <button
                            className="btn"
                            onClick={() => handleShowModal('CREATE')}
                        >
                            <AiOutlinePlus /> Add New Author
                        </button>
                    </div>
                    <div className="authors-list-bottom px-4 py-3">
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
                        <div className="authors-list mt-4">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <td className='table-head'>
                                            <span className='d-flex align-items-center gap-2'>No <HiChevronUpDown className='filter-icon' /></span>
                                        </td>
                                        <td className='table-head'>
                                            <span>Image</span>
                                        </td>
                                        <td className='table-head'>
                                            <span className='d-flex align-items-center gap-2'>Author Name <HiChevronUpDown className='filter-icon' /></span>
                                        </td>
                                        <td className='table-head'>
                                            <span className='d-flex align-items-center gap-2'>Description <HiChevronUpDown className='filter-icon' /></span>
                                        </td>
                                        <td className='table-head'>
                                            <span className='d-flex align-items-center gap-2'>Actions <HiChevronUpDown className='filter-icon' /></span>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {authorsList?.authors && authorsList?.authors.length > 0 &&
                                        authorsList?.authors.map((item, index) => {
                                            return (
                                                <tr key={`author-info-item-${item.id}`}>
                                                    <td>{(authorCurrentPage - 1) * authorLimit + index + 1}</td>
                                                    <td className='author-img'>
                                                        {item.image ?
                                                            <img src={`data:image/jpeg;base64,${item.image}`} alt='' />
                                                            :
                                                            <img src={User}></img>
                                                        }
                                                    </td>
                                                    <td className='author-name'>{item.name}</td>
                                                    <td className='description'>{item.description}</td>
                                                    <td className='actions text-center'>
                                                        <div className='d-flex  gap-3'>
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
                                        authorsList?.authors.length < authorLimit &&
                                        [...Array(authorLimit - authorsList?.authors.length)].map(item => {
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
                                    pageCount={authorsList?.total_pages}
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
                    <ModalAuthor
                        data={moddifiedData}
                        type={modalType}
                        show={showModalAuthor}
                        setShow={setShowModalAuthor}
                        fetchAuthors={fetchAuthorWithPagination}
                    />
                </div>
            }
        </>
    )
}

export default Authors;
