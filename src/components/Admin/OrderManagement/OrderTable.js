import { FaRegTrashAlt } from 'react-icons/fa';
import { HiChevronUpDown } from 'react-icons/hi2';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';

import { getOrderWithPagination, deleteOrder } from '../../Services/adminServices';
import { useImmer } from 'use-immer';
import ModalDeleteOrder from '../Modal/ModalDeleteOrder';
import { successToast, errorToast } from '../../Toast/Toast';
import { NumberFormat } from '../../FormatNumber/currencyFormat';

const OrderTable = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    const [showModalOrder, setShowModalOrder] = useState(false);
    const [orderList, setOrderList] = useImmer([]);
    const [orderCurrentPage, setOrderCurrentPage] = useState(1);
    const [orderLimit, setOrderLimit] = useState(10);

    const [orderDelete, setOrderDelete] = useState('');

    const { setTitle } = props;

    // handle pagination
    const handlePageClick = (event) => {
        setOrderCurrentPage(+event.selected + 1);
    }

    const handleShowModal = (orderID, event) => {
        event.stopPropagation();
        setOrderDelete(orderID);
        setShowModalOrder(true);
    }

    const handleDeleteOrder = async () => {
        let result = await deleteOrder(orderDelete);
        if (result && result.EC === 0) {
            successToast(result.EM);
            setTimeout(() => {
                fetchOrderWithPagination();
            }, 500);
        } else {
            errorToast(result.EM);
        }
    }

    const fetchOrderWithPagination = async () => {
        let result = await getOrderWithPagination(orderLimit, orderCurrentPage);
        if (result && result.EC === 0) {
            setOrderList(result.DT);
        }
    }

    const handleViewOrderDetail = (orderID) => {
        history.push(`/admin/manager/order-detail/${orderID}`);
    }

    useEffect(() => {
        fetchOrderWithPagination();
    }, [orderCurrentPage]);

    useEffect(() => {
        setTitle('Order');
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
                <div className="orders-management-container">
                    <div className="orders-list-top d-flex justify-content-between align-items-center px-4 py-3">
                        <span className="table-title">Orders List</span>
                    </div>
                    <div className="orders-list-bottom px-4 py-3">
                        <div className="orders-list  mt-4">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <td className='table-head'>
                                            <span className='d-flex align-items-center gap-2'>No</span>
                                        </td>
                                        <td className='table-head'>
                                            <span className='d-flex align-items-center gap-2'>OrderID<HiChevronUpDown className='filter-icon' /></span>
                                        </td>
                                        <td className='table-head'>
                                            <span className='d-flex align-items-center gap-2'>Address<HiChevronUpDown className='filter-icon' /></span>
                                        </td>
                                        <td className='table-head text-center'>
                                            <span>Payment</span>
                                        </td>
                                        <td className='table-head'>
                                            <span className='d-flex align-items-center gap-2'>Date<HiChevronUpDown className='filter-icon' /></span>
                                        </td>
                                        <td className='table-head'>
                                            <span className='d-flex align-items-center gap-2'>Price<HiChevronUpDown className='filter-icon' /></span>
                                        </td>
                                        <td className='table-head'>
                                            <span>TotalBooks</span>
                                        </td>
                                        <td className='table-head'>
                                            <span className='d-flex align-items-center gap-2'>CustomerID<HiChevronUpDown className='filter-icon' /></span>
                                        </td>
                                        <td className='table-head'>
                                            <span className='d-flex align-items-center gap-2'>Status<HiChevronUpDown className='filter-icon' /></span>
                                        </td>
                                        <td className='table-head text-center'>
                                            <span>Actions</span>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderList?.orders && orderList?.orders.length > 0 &&
                                        orderList?.orders.map((item, index) => {
                                            return (
                                                <tr key={`order-info-${item.id}`} onClick={() => handleViewOrderDetail(item.id)}>
                                                    <td>{(orderCurrentPage - 1) * orderLimit + index + 1}</td>
                                                    <td className='order_id'>{item.id}</td>
                                                    <td className='address'>
                                                        <div className='address-content'>
                                                            {item.address}
                                                        </div>
                                                    </td>
                                                    <td className='payment text-center'>{item.payment}</td>
                                                    <td className='date'>{item.date}</td>
                                                    <td className='price'>{NumberFormat(item.total_price)}</td>
                                                    <td className='total-books text-center'>{item.total_books}</td>
                                                    <td className='customer'>{item.User.id}</td>
                                                    <td className={`${item.status.toLowerCase()}-status`}>{item.status}</td>
                                                    <td className='actions text-center'>
                                                        <div className='d-flex justify-content-center'>
                                                            <div className='delete-btn px-1' title='Delete' onClick={(event) => handleShowModal(item.id, event)}>
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
                                    pageCount={orderList.total_pages}
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
                    <ModalDeleteOrder
                        show={showModalOrder}
                        setShow={setShowModalOrder}
                        handleDeleteOrder={handleDeleteOrder}
                    />
                </div>
            }
        </>
    )
}

export default OrderTable;
