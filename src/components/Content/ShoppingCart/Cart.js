import './Cart.scss';
import { IoTrash } from 'react-icons/io5';

import { useDispatch, useSelector } from "react-redux";
import { ChangeCartItemAmount, DeleteShoppingCart } from '../../../redux/action/actions';

const Cart = () => {

    const dispatch = useDispatch();
    const bookList = useSelector(state => state.shoppingCart.bookList);

    const handleChangeItemAmount = (book_id, amount) => {
        if (isNaN(amount) || +amount <= 0) {
            return;
        }
        dispatch(ChangeCartItemAmount(book_id, +amount));
    }

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
                                    bookList && bookList.length > 0 &&
                                    bookList.map((item, index) => {
                                        return (
                                            <tr key={`book-cart-${item.id}`} className='d-flex'>
                                                <td className='checkbox-product d-flex'>
                                                    <div class="form-check d-flex h-100 align-items-center">
                                                        <input class="form-check-input ms-lg-3 me-lg-4 checkbox-form" type="checkbox" value="" />
                                                    </div>
                                                    <div className='product-info d-flex h-100 w-100'>
                                                        <div className='product-image'>
                                                            <img src={`data:image/jpeg;base64,${item.image}`} alt='' />
                                                        </div>
                                                        <div className='product-title d-flex align-items-center ps-3'>
                                                            <span>{item.title}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='product-info d-flex align-items-center justify-content-center'>
                                                    {item.current_price} <span className='unit'>&nbsp;đ</span>
                                                </td>
                                                <td className='product-info d-flex align-items-center justify-content-center quantity'>
                                                    <button
                                                        onClick={() => handleChangeItemAmount(item.id, item.amount - 1)}
                                                    >
                                                        &#8722;
                                                    </button>

                                                    <input
                                                        type='number'
                                                        value={item.amount}
                                                        onChange={(event) => handleChangeItemAmount(item.id, event.target.value)}
                                                    />

                                                    <button
                                                        onClick={() => handleChangeItemAmount(item.id, item.amount + 1)}
                                                    >
                                                        &#43;
                                                    </button>
                                                </td>
                                                <td className='product-info d-flex align-items-center justify-content-center total-price'>
                                                    {item.current_price * item.amount} <span className='unit'>&nbsp; đ</span>
                                                </td>
                                                <td className='product-info d-flex align-items-center justify-content-center remove-icon'>
                                                    <span title='delete'>
                                                        <IoTrash className='icon' onClick={()=>dispatch(DeleteShoppingCart(item.id))}/>
                                                    </span>
                                                </td>
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