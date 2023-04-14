import React from 'react';
import { HiUser, HiPhone } from "react-icons/hi";
import { IoMail } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import { FaRegTrashAlt } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { getOrderDetailById, upateOrderStatus, deleteOrderDetailItem } from '../../Services/adminServices';
import NoImage from '../../../assets/image/NoImage.png';
import { TailSpin } from 'react-loader-spinner';
import ModalOrderDetail from '../Modal/ModalOrderDetail';
import { useImmer } from 'use-immer';
import { successToast, errorToast } from '../../Toast/Toast';
import { NumberFormat } from '../../FormatNumber/currencyFormat';

const OrderDetail = (props) => {

    const [orderStatus, setOrderStatus] = React.useState('Processing');
    const { id } = useParams();
    const [detailData, setDetailData] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);
    const [showModal, setShowModal] = React.useState(false);
    const [modalAction, setModalAction] = React.useState('');
    const [deleteItem, setDeleteItem] = useImmer({
        order: {
            id: '',
            total_price: 0,
            total_books: 0
        },
        item: {
            id: '',
            price: 0,
            amount: 0
        }
    });

    const { setTitle } = props;

    const fetchOrderDetail = async () => {
        let result = await getOrderDetailById(id);
        if (result && result.EC === 0) {
            setDetailData(result.DT);
            setOrderStatus(result.DT?.order.status);
            setDeleteItem(draft => {
                draft.order.id = id;
                draft.order.total_price = result.DT?.order.total_price;
                draft.order.total_books = result.DT?.order.total_books;
            })
        }
    }

    const handleShowModal = (action) => {
        setModalAction(action);
        setShowModal(true);
    }

    const handleUpdateOrderStatus = async () => {
        let result = await upateOrderStatus({
            id: id,
            status: orderStatus
        });
        if (result && result.EC === 0) {
            successToast(result.EM);
            setShowModal(false);
            fetchOrderDetail();
        } else {
            errorToast(result.EM);
        }
    }


    const handleDeleteOrderDetailItem = async () => {
        let result = await deleteOrderDetailItem(deleteItem);
        if (result && result.EC === 0) {
            successToast(result.EM);
            setShowModal(false);
            fetchOrderDetail();
        } else {
            errorToast(result.EM);
        }
    }

    React.useEffect(() => {
        fetchOrderDetail();
    }, []);

    React.useEffect(() => {
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
                <>
                    <div className="order-detail-container d-flex justify-content-between">
                        <div className="left-content">
                            <div className="content-title px-4 py-3">
                                <span className="table-title">Order Status</span>
                            </div>
                            <div className="main-content px-4 py-3">
                                <div>
                                    <div className={`${orderStatus.toLowerCase()}-status order-status d-flex justify-content-center py-2 blue mx-4 mb-4`}>
                                        <span>{orderStatus}</span>
                                    </div>
                                    <label className='form-label'>Select order status: </label>
                                    <select
                                        className="form-select mb-5"
                                        onChange={(event) => setOrderStatus(event.target.value)}
                                        value={orderStatus}
                                    >
                                        <option value="Processing">Processing</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Canceled">Cancel</option>
                                    </select>
                                    {
                                        orderStatus !== detailData?.order?.status &&
                                        <div className='text-center'>
                                            <button className='btn btn-warning' onClick={() => handleShowModal('UPDATE')}>Update Order Status</button>
                                        </div>
                                    }

                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className='order-main'>
                                <div className="content-title px-4 py-3">
                                    <div className="table-title d-flex align-items-center gap-3">
                                        <span>Order Items</span>
                                        <span className='order-id'>#{detailData?.order?.id}</span>
                                        <span className='order-date'>{detailData?.order?.date}</span>
                                    </div>
                                </div>
                                <div className="main-content px-4 py-3">
                                    <div className='order-items mb-4'>
                                        <table class="table table-borderless">
                                            <tbody>
                                                {detailData?.order_details && detailData?.order_details.length > 0 &&
                                                    detailData?.order_details.map(item => {
                                                        return (
                                                            <tr key={`orderdetail-item-${item.id}`}>
                                                                <td>
                                                                    <div className='order-item-info d-flex gap-3'>
                                                                        <div className='image'>
                                                                            {item.Book.image ?
                                                                                <img src={`data:image/jpeg;base64,${item.Book.image}`} alt='' />
                                                                                :
                                                                                <img src={NoImage} alt='item-image' />
                                                                            }
                                                                        </div>
                                                                        <div className='name'>
                                                                            <div className='book-name'>
                                                                                {item.Book.name}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className='price-calc d-flex gap-2 align-items-center justify-content-center'>
                                                                        <span className='price'>
                                                                            {NumberFormat(item.Book.SellingBook.current_price)}</span> x
                                                                        <span className='amount'>{item.book_amount}</span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className='total text-end'>{NumberFormat(item.price)}</div>
                                                                </td>
                                                                <td>
                                                                    {orderStatus === 'Processing' &&
                                                                        <span
                                                                            className='d-flex justify-content-end delete-order-item-icon'
                                                                            title='Delete'
                                                                        >
                                                                            <FaRegTrashAlt onClick={() => {
                                                                                handleShowModal('DELETE');
                                                                                setDeleteItem(draft => {
                                                                                    draft.item.id = item.id;
                                                                                    draft.item.price = item.price;
                                                                                    draft.item.amount = item.book_amount;
                                                                                });
                                                                            }} />
                                                                        </span>
                                                                    }
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='order-total-payment d-flex justify-content-end'>
                                        <span><strong>Total</strong>: {NumberFormat(detailData?.order?.total_price)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='customer-contact mt-4'>
                                <div className="content-title px-4 py-3">
                                    <span className="table-title">Customer Contact</span>
                                </div>
                                <div className="main-content px-4 py-3">
                                    <div className='customer-info mt-2'>
                                        <table className='table table-borderless'>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className='d-flex align-items-center gap-2 '>
                                                            <HiUser className='customer-icon' />
                                                            <span>{detailData?.order?.User.fullname}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='d-flex align-items-center gap-2 '>
                                                            <IoMail className='customer-icon' />
                                                            <span>{detailData?.order?.User.email}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='d-flex align-items-center gap-2 '>
                                                            <HiPhone className='customer-icon' />
                                                            <span>{detailData?.order?.User.phone}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='d-flex align-items-center gap-2 '>
                                                            <MdLocationOn className='customer-icon' />
                                                            <span>{detailData?.order?.User.address}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ModalOrderDetail
                        show={showModal}
                        setShow={setShowModal}
                        action={modalAction}
                        updateStatus={handleUpdateOrderStatus}
                        deleteOrderDetailItem={handleDeleteOrderDetailItem}
                    />
                </>

            }
        </>


    )
}

export default OrderDetail;
