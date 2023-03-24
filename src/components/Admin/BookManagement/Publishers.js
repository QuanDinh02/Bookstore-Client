import { FaRegTrashAlt } from 'react-icons/fa';
import { MdModeEditOutline } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import { HiChevronUpDown } from 'react-icons/hi2';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import ModalPublisher from '../Modal/ModalPublisher';
import { useImmer } from 'use-immer';
import { getPublisherWithPagination } from '../../Services/adminServices';

const Publishers = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [modalType, setModalType] = useState('');

    const [showModalPublisher, setShowModalPublisher] = useState(false);
    const [publisherList, setPublisherList] = useImmer([]);
    const [publisherCurrentPage, setPublisherCurrentPage] = useState(1);
    const [publisherLimit, setPublisherLimit] = useState(3);

    const [moddifiedData, setModifiedData] = useState({
        publisher_name: '',
        publisher_description: '',
        publisher_phone: ''
    });

    // handle pagination
    const handlePageClick = (event) => {
        setPublisherCurrentPage(+event.selected + 1);
    }

    const handleShowModal = (action, data = {}) => {

        setModalType(action);

        if (action === 'CREATE') {
            setModifiedData({
                publisher_name: '',
                publisher_description: '',
                publisher_phone: ''
            })
        }
        else if (action === 'UPDATE') {
            setModifiedData({
                publisher_id: data?.id,
                publisher_name: data?.name,
                publisher_description: data?.description,
                publisher_phone: data?.phone
            })
        } else {
            setModifiedData({
                publisher_id: data?.id,
                publisher_name: data?.name
            })
        }

        setShowModalPublisher(true);
    }

    const fetchPublisherWithPagination = async () => {
        let result = await getPublisherWithPagination(publisherLimit, publisherCurrentPage);
        if (result && result.EC === 0) {
            setPublisherList(result.DT);
        }
    }

    useEffect(() => {
        fetchPublisherWithPagination();
    }, [publisherCurrentPage]);

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
                <div className="publishers-management-container">
                    <div className="publishers-list-top d-flex justify-content-between align-items-center px-4 py-3">
                        <span className="table-title">Publishers List</span>
                        <button className="btn" onClick={() => handleShowModal('CREATE')}><AiOutlinePlus /> Add New Publisher</button>
                    </div>
                    <div className="publishers-list-bottom px-4 py-3">
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
                        <div className="publishers-list mt-4">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <td className='table-head'>
                                            <span className='d-flex align-items-center gap-2'>No<HiChevronUpDown className='filter-icon' /></span>
                                        </td>
                                        <td className='table-head'>
                                            <span className='d-flex align-items-center gap-2'>Publisher Name<HiChevronUpDown className='filter-icon' /></span>
                                        </td>
                                        <td className='table-head'>
                                            <span className='d-flex align-items-center gap-2'>Description<HiChevronUpDown className='filter-icon' /></span>
                                        </td>
                                        <td className='table-head'>
                                            <span className='d-flex align-items-center gap-2'>Phone<HiChevronUpDown className='filter-icon' /></span>
                                        </td>
                                        <td className='table-head'>
                                            <span className='d-flex align-items-center gap-2'>Actions <HiChevronUpDown className='filter-icon' /></span>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {publisherList?.publishers && publisherList?.publishers.length > 0 &&
                                        publisherList?.publishers.map((item, index) => {
                                            return (
                                                <tr key={`publisher-item-${item.id}`}>
                                                    <td>{(publisherCurrentPage - 1) * publisherLimit + index + 1}</td>
                                                    <td className='publisher-name'>{item.name}</td>
                                                    <td className='publisher-description'>{item.description}</td>
                                                    <td className='phone'>{item.phone}</td>
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
                                        publisherList?.publishers.length < publisherLimit &&
                                        [...Array(publisherLimit - publisherList?.publishers.length)].map(item => {
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
                                    pageCount={publisherList?.total_pages}
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
                    <ModalPublisher
                        data={moddifiedData}
                        type={modalType}
                        show={showModalPublisher}
                        setShow={setShowModalPublisher}
                        fetchPublisher={fetchPublisherWithPagination}
                    />
                </div>
            }
        </>
    )
}

export default Publishers;
