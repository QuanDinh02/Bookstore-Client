import './Cart.scss';
import { IoTrashOutline } from 'react-icons/io5';

import { useDispatch, useSelector } from "react-redux";

import {
    ChangeCartItemAmount, DeleteShoppingCart,
    DeleteAllInShoppingCart, DeleteManyCartItems
} from '../../../redux/action/actions';

import { createNewOrder, createNewOrderDetails } from '../../Services/apiServices';
import { getDefaultAddress } from '../../Services/userServices';

import { useImmer } from 'use-immer';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CartModal from './CartModal';

import toast from 'react-hot-toast';

const toast_success = {
    style: {
        padding: '1rem',
        background: '#47D764',
        color: '#FFFFFF'
    },
    iconTheme: {
        primary: '#FFFFFF',
        secondary: '#47D764'
    }
}

const toast_error = {
    style: {
        padding: '1rem',
        background: '#FE355B',
        color: '#FFFFFF'
    },
    iconTheme: {
        primary: '#FFFFFF',
        secondary: '#FE355B'
    }
}

const Cart = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);

    const bookList = useSelector(state => state.shoppingCart.bookList);
    const booksCount = useSelector(state => state.shoppingCart.booksCount);

    const account = useSelector(state => state.user.account);

    const [cartItems, setCartItems] = useImmer([]);
    const [checkAllCartItems, setCheckAllCartItems] = useState(false);
    const [cartItemsAmount, setCartItemsAmount] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [discountTotal, setDiscountTotal] = useState(0);
    const [total, setTotal] = useState(0);

    const handleChangeItemAmount = (book_id, amount) => {
        if (isNaN(amount) || +amount <= 0) {
            return;
        }
        dispatch(ChangeCartItemAmount(book_id, +amount));
        setCartItems(draft => {
            draft = draft.map(item => {
                if (item.id === book_id) {
                    item.amount = +amount;
                }
                return item;
            })
        })
    }

    const handleCheckCartItem = (book_id, checked) => {
        setCartItems(draft => {
            draft = draft.map(item => {
                if (item.id === book_id) {
                    item.isChecked = checked;
                }
                return item;
            })
        })
    }

    const handleCheckAllCartItem = (event) => {
        setCheckAllCartItems(event.target.checked);
        setCartItems(draft => {
            draft = draft.map(item => {
                item.isChecked = event.target.checked;
                return item;
            })
        })
        if (event.target.checked) {
            setCartItemsAmount(cartItems.length);
        } else {
            setCartItemsAmount(0);
        }
    }

    const handleDeleteCartItem = (book_id) => {
        dispatch(DeleteShoppingCart(book_id));
    }

    const handleDeleteManyCartItems = () => {
        if (checkAllCartItems && cartItems && cartItems.length > 0) {
            dispatch(DeleteAllInShoppingCart());
        }
        else {
            if (cartItems && cartItems.length > 0) {
                let rmCartItems = [];
                cartItems.forEach(item => {
                    if (item.isChecked === true) {
                        rmCartItems.push(item.id);
                    }
                })
                dispatch(DeleteManyCartItems(rmCartItems));
            }
        }

    }

    const handleConfirmCart = async () => {
        if (cartItems.every(item => item.isChecked === false)) {
            toast.error('No items are selected !', toast_error);
            return;
        } else {
            let bookAmounts = 0;
            cartItems.forEach(item => {
                bookAmounts += item.amount;
            })

            const date = new Date();

            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            let currentDate = `${day}/${month}/${year}`;

            let fetchDefaultAddress = await getDefaultAddress(account.id);
            if (fetchDefaultAddress && fetchDefaultAddress.EC === 0 && fetchDefaultAddress.DT) {
                let result = await createNewOrder({
                    date: currentDate,
                    status: 'Processing',
                    address: fetchDefaultAddress.DT.address,
                    payment: 'Cash',
                    total_price: total,
                    total_books: bookAmounts,
                    customer_id: account.id
                })

                if (result && result.EC === 0) {
                    let orderID = result.DT.order.id;
                    let orderItems = cartItems.filter(item => item.isChecked === true);

                    orderItems = orderItems.map(item => {
                        return {
                            order_id: orderID,
                            book_id: item.id,
                            book_amount: item.amount,
                            price: item.current_price * item.amount
                        }
                    })

                    let msg = await createNewOrderDetails(orderItems);
                    if (msg && msg.EC === 0) {
                        toast.success('Order successfully !', toast_success);
                        dispatch(DeleteAllInShoppingCart());

                        setTimeout(() => {
                            history.push('/user/purchase');
                        }, 1500);
                    }
                }
            }
        }
    }

    const handleLoginToBuy = () => {
        history.push('/login');
    }

    useEffect(() => {
        if (cartItems && cartItems.length > 0) {

            let check = cartItems.every(item => item.isChecked === true);

            let _subTotal = 0;
            let countsCheckItems = 0;
            let _discountTotal = 0;
            let _total = 0;

            cartItems.forEach(item => {
                if (item.isChecked === true) {
                    _subTotal += item.price * item.amount;
                    countsCheckItems += 1;
                    _discountTotal += (item.price - item.current_price) * item.amount;
                    _total += item.current_price * item.amount;
                }
            });

            setSubTotal(_subTotal);
            setCartItemsAmount(countsCheckItems);
            setDiscountTotal(_discountTotal);
            setTotal(_total);

            if (check) {
                if (!checkAllCartItems) {
                    setCheckAllCartItems(true);
                }
            } else {
                if (checkAllCartItems) {
                    setCheckAllCartItems(false);
                }
            }
        }
    }, [cartItems]);

    useEffect(() => {
        if (bookList && bookList.length > 0 && cartItems.length === 0) {
            let _bookList = bookList.map(item => {
                let _item = { ...item, isChecked: false }
                return _item;
            })
            setCartItems(_bookList);
        }

    }, []);

    useEffect(() => {

        if (booksCount === 0) {
            setCartItems([]);
            setCheckAllCartItems(false);
            setCartItemsAmount(0);
            setSubTotal(0);
            setDiscountTotal(0);
            setTotal(0);
        }

        if (cartItems && cartItems.length > 0 && bookList.length > 0 && bookList.length !== cartItems.length) {
            let CartItems = bookList.map(item => item.id);
            let _draft = cartItems.filter(item => CartItems.includes(item.id));
            setCartItems(_draft);
        }

    }, [bookList]);

    return (
        <>
            <div className='shopping-cart-container'>
                <div className='cart-title text-center py-4'>
                    Shopping Cart
                </div>
                <div className='cart-detail-container pt-4'>
                    <div className='cart-detail container d-flex flex-column flex-lg-row gap-3 justify-content-lg-between'>
                        <div className='cart-main col-12 col-lg-9 col-xl-8 position-relative'>
                            <table class="table table-borderless" key={'checkbox-all-1'}>
                                <tbody className=''>
                                    <tr className='d-flex'>
                                        <td className='checkbox-all d-flex'>
                                            <div class="form-check d-flex h-100 align-items-center">
                                                <input
                                                    class="form-check-input ms-lg-3 me-lg-4 checkbox-form"
                                                    type="checkbox"
                                                    checked={checkAllCartItems}
                                                    onChange={(event) => handleCheckAllCartItem(event)}
                                                />
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
                                        cartItems && cartItems.length > 0 &&
                                        cartItems.map((item, index) => {
                                            return (
                                                <tr key={`book-cart-${item.id}`} className='d-flex'>
                                                    <td className='checkbox-product d-flex'>
                                                        <div class="form-check d-flex h-100 align-items-center">
                                                            <input
                                                                class="form-check-input ms-lg-3 me-lg-4 checkbox-form"
                                                                type="checkbox"
                                                                checked={item.isChecked}
                                                                onChange={(event) => handleCheckCartItem(item.id, event.target.checked)}
                                                            />
                                                        </div>
                                                        <div className='product-info d-flex h-100 w-100 justify-content-between'>
                                                            <div className='product-image col-4'>
                                                                <img src={`data:image/jpeg;base64,${item.image}`} alt='' />
                                                            </div>
                                                            <div className='product-title d-flex align-items-center col-7'>
                                                                <span className='title-content'>{item.title}</span>
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
                                                            <IoTrashOutline className='icon' onClick={() => handleDeleteCartItem(item.id)} />
                                                        </span>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <table class="table table-borderless select-all-section" key={'checkbox-all-2'}>
                                <tbody className=''>
                                    <tr className='d-flex'>
                                        <td className='checkbox-all d-flex'>
                                            <div class="form-check d-flex h-100 align-items-center">
                                                <input
                                                    class="form-check-input ms-lg-3 me-lg-4 checkbox-form"
                                                    type="checkbox"
                                                    checked={checkAllCartItems}
                                                    onChange={(event) => handleCheckAllCartItem(event)}
                                                />
                                            </div>
                                            <div className='d-flex align-items-center'>
                                                <span>SELECT ALL ({booksCount})</span>
                                            </div>
                                        </td>
                                        <td className='table-header-x4 d-flex align-items-center justify-content-end'>
                                            <span className='remove-all-icon' onClick={handleDeleteManyCartItems}><IoTrashOutline className='icon' />&nbsp;DELETE</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='cart-payment col-12 col-lg-3 col-xl-4'>
                            <div className='summary'>
                                <span>Order Summary</span>
                            </div>
                            <div className='subtotal d-flex justify-content-between mt-3 title-color'>
                                <div className='subtotal-title'>
                                    Subtotal ({cartItemsAmount} items)
                                </div>
                                <div className='value'>
                                    <span>{subTotal}</span>&nbsp;<span className='unit'>đ</span>
                                </div>
                            </div>
                            <div className='product-discount d-flex justify-content-between mt-3 title-color'>
                                <div className='product-title'>
                                    Product Discount
                                </div>
                                <div className='value'>
                                    -<span>{discountTotal}</span>&nbsp;<span className='unit'>đ</span>
                                </div>
                            </div>
                            <div className='saved d-flex justify-content-between mt-3 title-color'>
                                <div className='saved-title'>
                                    Saved
                                </div>
                                <div className='value'>
                                    -<span>{discountTotal}</span>&nbsp;<span className='unit'>đ</span>
                                </div>
                            </div>
                            <div className='total-amount d-flex justify-content-between mt-3'>
                                <div className='total-amount-title'>
                                    Total Amount
                                </div>
                                <div className='value'>
                                    <span>{total}</span>&nbsp;<span className='unit'>đ</span>
                                </div>
                            </div>
                            <div className='confirm-cart mt-3'>
                                <button className='btn btn-success' onClick={() => setShowModal(true)}>CONFIRM CART({cartItemsAmount})</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CartModal
                show={showModal}
                setShow={setShowModal}
                confirmCart={handleConfirmCart}
                login={handleLoginToBuy}
            />
        </>
    )
}

export default Cart;