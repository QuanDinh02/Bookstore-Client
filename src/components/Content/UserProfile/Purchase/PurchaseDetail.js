import { useParams } from "react-router-dom";
import Onepiece from '../../../../assets/image/Onepiece.png';

const PurchaseDetail = () => {

    const { id } = useParams();

    return (
        <>
            <div className="order-container py-2 px-3">
                <div className="order-info d-flex justify-content-between align-items-center">
                    <div className="order-id-time d-flex align-items-center gap-3">
                        <div className="order-id">
                            <span className="order-title">Order</span>
                            <span className="code"> #48302</span>
                        </div>
                        <span className="order-time"> 14/03/2023</span>
                    </div>
                    <div className="processing-status">
                        Processing
                    </div>
                </div>
                <div className="order-detail mt-4">
                    <div className="order-item py-3 d-flex justify-content-between">
                        <div className="d-flex justify-content-between left">
                            <div className="d-flex gap-3">
                                <div className="image">
                                    <img src={Onepiece} alt='' />
                                </div>
                                <div className="name pt-2">Onepiece</div>
                            </div>
                            <div className="quantity pe-3 d-flex justify-content-center align-items-center">
                                <span>x 2</span>
                            </div>
                        </div>

                        <div className="right d-flex justify-content-center align-items-center">
                            <span className="price">40,000 đ</span>
                        </div>
                    </div>
                    <div className="order-item py-3 d-flex justify-content-between">
                        <div className="d-flex justify-content-between left">
                            <div className="d-flex gap-3">
                                <div className="image">
                                    <img src={Onepiece} alt='' />
                                </div>
                                <div className="name pt-2">Onepiece</div>
                            </div>
                            <div className="quantity pe-3 d-flex justify-content-center align-items-center">
                                <span>x 2</span>
                            </div>
                        </div>

                        <div className="right d-flex justify-content-center align-items-center">
                            <span className="price">40,000 đ</span>
                        </div>
                    </div>
                    <div className="order-payment w-100 pt-3 d-flex flex-column align-items-end">
                        <div className="total-payments mt-2 mb-3">
                            <span>Total Payments: <span className="total-price">80,500 đ</span></span>
                        </div>
                        <button className="order-delete-btn">Cancel Order</button>
                    </div>
                </div>
            </div>
        </>

    )
}

export default PurchaseDetail;