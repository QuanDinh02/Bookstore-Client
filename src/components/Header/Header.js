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
import BookCategory from '../Content/BookCategory/BookCategory';
import { useState } from 'react';

const Header = () => {

    const [showBookCategory, setShowBookCategory] = useState(true);

    const handleShowBookCategory = () => {
        setShowBookCategory(!showBookCategory);
    }

    return (
        <div className='header-container blue'>
            <div className='title'>
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
            <div className='main d-flex align-items-center'>
                <div className='content container d-flex'>
                    <div className='brand-box col-3'>
                        Mega<span className='brand'>book</span>.com
                    </div>
                    <div className='searchBar col-6'>
                        <div className='search-box flex-grow-1 py-1 ms-1'>
                            <div className='icon d-flex justify-content-center align-items-center'><CiSearch /></div>
                            <div className='search'>
                                <input placeholder='Search books, author' />
                            </div>

                            <div className='search-btn green d-flex justify-content-center align-items-center me-1'>
                                Search
                            </div>
                        </div>

                    </div>
                    <div className='shoppingCart col-1 d-flex justify-content-end align-items-center'>
                        <div className='cartBorder red p-2'>
                            <BsCart3 className='icon' />
                        </div>

                    </div>
                    <div className='login-logout col-2 d-flex justify-content-center align-items-center'>
                        <div className='login px-1'>
                            <a href='/'>Login | </a>
                        </div>
                        <div className='register px-1'>
                            <a href='/'>Register</a>
                        </div>

                    </div>
                </div>
            </div>
            <div className='navigation d-flex align-items-center'>
                <div className='content container d-flex'>
                    <div className='menu col-3 d-flex justify-content-between' onClick={handleShowBookCategory}>
                        <HiOutlineMenuAlt2 className='menu-icon' />
                        <span className='menu-title'>Book Category</span>
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
            <div className='bookCategory container d-flex'>
                <BookCategory
                    show={showBookCategory}
                />
            </div>
        </div>
    )
}

export default Header;