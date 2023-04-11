import React from "react";
import { useParams } from "react-router-dom";
import NoImage from '../../../../assets/image/NoImage.png';
import { getOrderDetail } from "../../../Services/adminServices";
import { useSelector } from "react-redux";
import {NumberFormat} from '../../../FormatNumber/currencyFormat';

const ORDER_STATUS = ['All', 'Processing', 'Delivered', 'Completed', 'Canceled'];

const PurchaseDetail = (props) => {

    const { id } = useParams();
    const { setShow, setDeleteOrder } = props;

    const [orderDetailList, setOrderDetailList] = React.useState([]);

    const account = useSelector(state => state.user.account);

    const fetchOrderDetail = async (customer_id, order_status) => {
        let result = await getOrderDetail(customer_id, order_status);
        if (result && result.EC === 0) {
            setOrderDetailList(result.DT);
        }
    }

    const handleCancelOrder = (order_id) => {
        setShow(true);
        setDeleteOrder(order_id);
    }

    React.useEffect(() => {
        fetchOrderDetail(account.id, ORDER_STATUS[+id - 1]);
    }, [id]);

    return (
        <>
            {orderDetailList?.orders && orderDetailList?.orders.length > 0 &&
                orderDetailList.orders.map((o, index) => {
                    return (
                        <div key={`customer-order-${index}`} className="order-container py-2 px-3">
                            <div className="order-info d-flex justify-content-between align-items-center">
                                <div className="order-id-time d-flex align-items-center gap-3">
                                    <div className="order-id">
                                        <span className="order-title">Order</span>
                                        <span className="code"> #{o.order.id}</span>
                                    </div>
                                    <span className="order-time"> {o.order.date}</span>
                                </div>
                                <div className={`${o.order.status.toLowerCase()}-status`}>
                                    {o.order.status}
                                </div>
                            </div>
                            <div className="order-detail mt-4">
                                {o.order_details && o.order_details.length > 0 &&
                                    o.order_details.map((item, index) => {
                                        return (
                                            <div key={`order-detail-item-${item.id}`} className="order-item py-3 d-flex justify-content-between">
                                                <div className="d-flex justify-content-between left">
                                                    <div className="d-flex gap-3">
                                                        <div className="image">
                                                            {item.Book.image ?
                                                                <img src={`data:image/jpeg;base64,${item.Book.image}`} alt='' />
                                                                :
                                                                <img src={NoImage} alt='' />
                                                            }
                                                        </div>
                                                        <div className="name pt-2">{item.Book.name}</div>
                                                    </div>
                                                    <div className="quantity pe-3 d-flex justify-content-center align-items-center">
                                                        <span>x {item.book_amount}</span>
                                                    </div>
                                                </div>

                                                <div className="right d-flex justify-content-center align-items-center">
                                                    <span className="price">{NumberFormat(item.price)}</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className="order-payment w-100 pt-3 d-flex flex-column align-items-end">
                                    <div className="total-payments mt-2 mb-3">
                                        <span>Total Payments: <span className="total-price">{NumberFormat(o.order.total_price)}</span></span>
                                    </div>
                                    {o.order.status.toLowerCase() === 'processing' &&
                                        <button
                                            className="order-delete-btn"
                                            onClick={() => handleCancelOrder(o.order.id)}
                                        >
                                            Cancel Order
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </>

    )
}

export default PurchaseDetail;