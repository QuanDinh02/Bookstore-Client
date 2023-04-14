import './Header.scss';
import { HiTruck } from 'react-icons/hi';
import { GiBookshelf } from 'react-icons/gi';
import { MdPhoneIphone } from 'react-icons/md';
import { CiSearch } from 'react-icons/ci';
import { BsCart3 } from 'react-icons/bs';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { IoCallSharp } from 'react-icons/io5';
import { RiWechatFill } from 'react-icons/ri';
import { TiDelete } from 'react-icons/ti';

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { DeleteShoppingCart, UserLogin, UserLogout } from '../../redux/action/actions';

import BookCategory from '../Content/BookCategory/BookCategory';
import { useEffect, useState, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { fetchAccount, userLogout } from '../Services/userServices';
import { getSearchBooks } from '../Services/apiServices';
import { successToast } from '../Toast/Toast';
import { NumberFormat } from '../FormatNumber/currencyFormat';
import _ from 'lodash';

const Header = (props) => {

    const { setShow } = props;
    const dispatch = useDispatch();

    const urls = ['/admin', '/login', '/register'];

    const bookList = useSelector(state => state.shoppingCart.bookList);
    const booksCount = useSelector(state => state.shoppingCart.booksCount);

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const account = useSelector(state => state.user.account);

    const [showBookCategory, setShowBookCategory] = useState(false);
    const [showDetailBookCategory, setShowDetailBookCategory] = useState(false);
    const [showShoppingCart, setShowShoppingCart] = useState(false);

    const [search, setSearch] = useState('');
    const [searchList, setSearchList] = useState([]);
    const [showSearchList, setShowSearchList] = useState(true);

    const [search2, setSearch2] = useState('');
    const [currentSelect, setCurrentSelect] = useState(-1);

    const handleDeleteBookFromShoppingCart = (book_id) => {
        dispatch(DeleteShoppingCart(book_id));
    }

    const handleShowBookCategory = () => {
        setShowBookCategory(!showBookCategory);
    }

    const MouseLeave = () => {
        setShowDetailBookCategory(false)
    }

    const history = useHistory();
    const location = useLocation();

    const bookSearch = useCallback(_.debounce(async (value) => {
        let result = await getSearchBooks(value);
        if (result && result.EC === 0) {
            let books = result.DT.map(item => {
                return {
                    ...item, isSelected: false
                }
            })
            setSearchList(books);
        }
    }, 500), []);

    const handleSearchOnChange = (event) => {
        setCurrentSelect(-1);
        setSearch2('');
        setSearch(event.target.value);
    }

    const handleKeyPress = (event) => {

        if (searchList.length > 0) {
            let _searchList = _.cloneDeep(searchList);
            if(event.key === 'Enter') {
                handleSearchButtonOnClick();
            }

            if (event.key === 'ArrowDown') {
                if (currentSelect === -1) {
                    setCurrentSelect(0);
                    _searchList = _searchList.map((item, index) => {
                        if (index === 0) {
                            setSearch2(item.name);
                            item.isSelected = true;
                            return item;
                        } else {
                            item.isSelected = false;
                            return item;
                        }
                    })
                } else {
                    if (currentSelect + 1 <= searchList.length - 1) {
                        setCurrentSelect(currentSelect + 1);
                        _searchList = _searchList.map((item, index) => {
                            if (index === currentSelect + 1) {
                                setSearch2(item.name);
                                item.isSelected = true;
                                return item;
                            } else {
                                item.isSelected = false;
                                return item;
                            }
                        })
                    }
                }
            }

            if (event.key === 'ArrowUp') {
                if (currentSelect === -1) {
                    setCurrentSelect(searchList.length - 1);
                    _searchList = _searchList.map((item, index) => {
                        if (index === searchList.length - 1) {
                            setSearch2(item.name);
                            item.isSelected = true;
                            return item;
                        } else {
                            item.isSelected = false;
                            return item;
                        }
                    })
                } else {
                    if (currentSelect - 1 >= 0) {
                        setCurrentSelect(currentSelect - 1);
                        _searchList = _searchList.map((item, index) => {
                            if (index === currentSelect - 1) {
                                setSearch2(item.name);
                                item.isSelected = true;
                                return item;
                            } else {
                                item.isSelected = false;
                                return item;
                            }
                        })
                    }
                }
            }

            setSearchList(_searchList);
        }
    }

    const handleSearchButtonOnClick = async () => {
        if (search) {
            setCurrentSelect(-1);
            let result = await getSearchBooks(search);
            if (result && result.EC === 0) {
                if (result.DT.length === 1) {
                    let book = (result.DT)[0];
                    setSearch(book.name);
                    history.push(`/book/${book.id}`);
                    window.scrollTo(0, 0);
                }
            }
        }
        if (search2) {
            setSearch(search2);
            setSearch2('');
            setCurrentSelect(-1);
            let result = await getSearchBooks(search2);
            if (result && result.EC === 0) {
                if (result.DT.length === 1) {
                    let book = (result.DT)[0];
                    history.push(`/book/${book.id}`);
                    window.scrollTo(0, 0);
                }
            }
        }
    }

    const handleSearchBookDetail = (bookId, book_name) => {
        setSearch(book_name);
        setShowSearchList(false);
        setSearch2('');
        setCurrentSelect(-1);
        history.push(`/book/${bookId}`);
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        if (search) {
            bookSearch(search);
        } else {
            setSearchList([]);
            bookSearch.cancel();
        }
    }, [search]);

    const handleViewBookDetail = (book_id) => {
        history.push(`/book/${book_id}`);
        window.scrollTo(0, 0);
    }

    const handleViewShoppingCart = () => {
        history.push('/cart');
        window.scrollTo(0, 0);
    }

    const handleUserLogout = async () => {
        let res = await userLogout();
        if (res && res.EC === 0) {
            successToast(res.EM);
            dispatch(UserLogout());
            setTimeout(() => {
                window.location.reload();
            }, 700);
        }
    }

    const handleViewProfile = () => {
        history.push('/user/account');
    }

    const handleViewPurchase = () => {
        history.push('/user/purchase');
    }

    const fetchAccountInfo = async () => {
        let result = await fetchAccount();
        if (result && result.EC === 0) {
            let buildData = {
                isAuthenticated: result.DT.isAuthenticated,
                account: {
                    email: result.DT.email,
                    username: result.DT.username,
                    id: result.DT.id,
                    user_group: result.DT.group
                }
            }
            dispatch(UserLogin(buildData));
        }
    }

    useEffect(() => {
        setShowShoppingCart(false);
        setShowSearchList(false);
        fetchAccountInfo();
        if(search2) {
            setSearch(search2);
            setSearch2('');
        }

        if (location.pathname === '/') {
            setShowBookCategory(true);
            setSearch('');

        } else {
            setShowBookCategory(false);
        }

    }, [location.pathname]);

    useEffect(() => {

        if (urls.some(u => location.pathname.includes(u))) {
            setShow(false);
        } else {
            setShow(true);
        }
    }, [location.pathname]);

    return (
        <>
            <div className='title d-none d-md-block'>
                <div className='content container d-flex pt-2'>
                    <div className='item d-flex align-items-bottom gap-2'>
                        <HiTruck className='icon' />
                        <span>Freeship</span>
                    </div>
                    <div className='item d-flex align-items-bottom gap-1'>
                        <GiBookshelf className='icon' />
                        <span>80.000 Books Title</span>
                    </div>
                    <div className='item d-flex align-items-bottom gap-1'>
                        <MdPhoneIphone className='icon' />
                        <span>Megabook Reader</span>
                    </div>
                </div>
            </div>
            <div className='main d-flex align-items-center sticky-top'>
                <div className='content container d-flex flex-column flex-xl-row justify-content-between'>
                    <div className='brand-box col-12 col-xl-3 text-center' onClick={() => history.push('/')}>
                        Mega<span className='brand'>book</span>.com
                    </div>
                    <div className='col-12 col-xl-9 d-flex justify-content-around gap-4'>
                        <div className='searchBar position-relative col-12 col-md-7'>
                            <div className='search-box flex-grow-1 py-1 ms-1'>
                                <div className='icon d-flex justify-content-center align-items-center'><CiSearch /></div>
                                <div className='search'>
                                    <input
                                        placeholder='Search books name...'
                                        value={search2 ? search2 : search}
                                        onChange={(event) => handleSearchOnChange(event)}
                                        onClick={() => setShowSearchList(true)}
                                        onKeyDown={(event) => handleKeyPress(event)}
                                    />
                                </div>
                                <div
                                    className='search-btn green d-flex justify-content-center align-items-center me-1'
                                    onClick={handleSearchButtonOnClick}
                                >
                                    Search
                                </div>
                            </div>
                            {showSearchList && search && searchList && searchList.length > 0 &&
                                <div className='search-list position-absolute d-flex flex-column top-100'>
                                    {
                                        searchList.map(item => {
                                            return (
                                                <div
                                                    key={`search-item-${item.id}`}
                                                    className={item.isSelected ? 'search-item selected' : 'search-item'}
                                                    onClick={() => handleSearchBookDetail(item.id, item.name)}
                                                >
                                                    <CiSearch /> {item.name}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                        <div className='col-3 d-none d-md-block d-md-flex justify-content-between'>
                            <div className='shoppingCart d-flex justify-content-end align-items-center position-relative'>
                                {booksCount !== 0 &&
                                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success mt-2">
                                        {booksCount}
                                    </span>
                                }
                                <div className='cartBorder p-2' onClick={() => setShowShoppingCart(!showShoppingCart)}>
                                    <BsCart3 className='cart-icon' />
                                </div>
                                {showShoppingCart === true &&
                                    <div className='book-cart position-absolute mt-1 start-50 top-100 translate-middle-x'>
                                        {bookList && bookList.length > 0 ?
                                            <>
                                                <table className='table table-borderless'>
                                                    <tbody>
                                                        {bookList.map(item => {
                                                            return (
                                                                <tr key={`book-cart-item-${item.id}`} className='book-item'>
                                                                    <td className='cart-item-image'>
                                                                        <img src={`data:image/jpeg;base64,${item.image}`} alt='' onClick={() => handleViewBookDetail(item.id)} />
                                                                    </td>
                                                                    <td className='cart-item-content'>
                                                                        <div className='cart-item-title' onClick={() => handleViewBookDetail(item.id)}>
                                                                            {item.title}
                                                                        </div>
                                                                        <div className='cart-item-price'>
                                                                            {item.amount} x <span className='current_price'>{NumberFormat(item.current_price)}</span>
                                                                        </div>
                                                                    </td>
                                                                    <td className='cart-item-remove-icon'>
                                                                        <div className='remove-icon-box d-flex justify-content-center'>
                                                                            <span
                                                                                className='remove-icon'
                                                                                title='delete'
                                                                                onClick={() => handleDeleteBookFromShoppingCart(item.id)}
                                                                            >
                                                                                <TiDelete />
                                                                            </span>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                                <div className='d-flex justify-content-end'>
                                                    <button className='btn btn-warning view-cart-btn me-4' onClick={handleViewShoppingCart}>VIEW CART</button>
                                                </div>
                                            </>
                                            :
                                            <div className='d-flex justify-content-center'>
                                                <span>Empty cart</span>
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                            <div className='login-logout d-flex justify-content-center align-items-center'>
                                {isAuthenticated === false ?
                                    <>
                                        <div className='login'>
                                            <a href='/login'>Login</a>
                                        </div>
                                        <div className='register'>
                                            <a href='/register'>Register</a>
                                        </div>
                                    </>
                                    :
                                    <div className='login-success position-relative'>
                                        <div className='profile-username'>Welcome {account.username} !</div>
                                        <div className='profile position-absolute'>
                                            <div className='profile-item' onClick={handleViewProfile}>
                                                <span>My Account</span>
                                            </div>
                                            <div className='profile-item' onClick={handleViewPurchase}>
                                                <span>My Purchase</span>
                                            </div>
                                            <div className='profile-item' onClick={handleUserLogout}>
                                                <span>Logout</span>
                                            </div>
                                        </div>

                                    </div>

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='navigation d-none d-md-block d-md-flex align-items-md-center'>
                <div className='content container d-flex'>
                    <div className='menu col-3 d-flex justify-content-between' onClick={handleShowBookCategory}>
                        <HiOutlineMenuAlt2 className='menu-icon' />
                        <span className='menu-title d-none d-lg-block'>Book Category</span>
                        <div className='arrow-icon'>
                            {showBookCategory === false ?
                                <SlArrowDown className='downside-arrow-icon' />
                                :
                                <SlArrowUp className='downside-arrow-icon' />
                            }
                        </div>

                    </div>
                    <div className='contact col-9 d-flex align-items-center justify-content-end'>
                        <div className='hotline pe-3'>
                            <IoCallSharp className='icon pe-1' />
                            <span className='text'>Hotline: <strong>1900 0080</strong></span>
                        </div>
                        <div className='online-support ps-3'>
                            <RiWechatFill className='icon pe-1' />
                            <span className='text'>Online Support</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container position-absolute book-category-container'>
                <div className='book-category-section d-none d-md-flex flex-md-row' onMouseLeave={MouseLeave}>
                    <BookCategory
                        show={showBookCategory}
                        setShowBookCategory={setShowBookCategory}
                        showDetailBookCategory={showDetailBookCategory}
                        setShowDetailBookCategory={setShowDetailBookCategory}
                    />
                </div>
            </div>

        </>
    )
}

export default Header;