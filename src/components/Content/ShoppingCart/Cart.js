import './Cart.scss';
import Onepiece from '../../../assets/image/Onepiece.png';
import { IoTrash } from 'react-icons/io5';


const Cart = () => {
    return (
        <div className='shopping-cart-container'>
            <div className='cart-title text-center py-4'>
                Shopping Cart
            </div>
            <div className='cart-detail-container pt-4'>
                <div className='cart-detail container'>
                    <div className='cart-main'>
                        <table class="table table-borderless">
                            <tbody className=''>
                                <tr className='d-flex'>
                                    <td className='checkbox-all d-flex'>
                                        <div class="form-check d-flex h-100 align-items-center">
                                            <input class="form-check-input ms-lg-3 me-lg-4 checkbox-form" type="checkbox" value="" />
                                        </div>
                                        <div className='d-flex align-items-center'>
                                            <span>Product</span>
                                        </div>
                                    </td>
                                    <td className='table-header d-flex align-items-center justify-content-center'>Unit Price</td>
                                    <td className='table-header d-flex align-items-center justify-content-center'>Quantity</td>
                                    <td className='table-header d-flex align-items-center justify-content-center'>Total Price</td>
                                    <td className='table-header d-flex align-items-center justify-content-center'>Actions</td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="table product-table">
                            <tbody className=''>
                                {
                                    [...Array(3)].map((item, index) => {
                                        return (
                                            <tr key={`book-cart-${index}`} className='d-flex'>
                                                <td className='checkbox-product d-flex'>
                                                    <div class="form-check d-flex h-100 align-items-center">
                                                        <input class="form-check-input ms-lg-3 me-lg-4 checkbox-form" type="checkbox" value="" />
                                                    </div>
                                                    <div className='product-info d-flex h-100 w-100'>
                                                        <div className='product-image'>
                                                            <img src={Onepiece} alt='' />
                                                        </div>
                                                        <div className='product-title d-flex align-items-center ps-3'>
                                                            <span>Onepiece</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='product-info d-flex align-items-center justify-content-center'>2.000 d</td>
                                                <td className='product-info d-flex align-items-center justify-content-center quantity'>
                                                    <button>&#8722;</button>
                                                    <input type='text' value={1} />
                                                    <button>&#43;</button>
                                                </td>
                                                <td className='product-info d-flex align-items-center justify-content-center total-price'>1.800 d</td>
                                                <td className='product-info d-flex align-items-center justify-content-center remove-icon' title='delete'><IoTrash className='icon'/></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;