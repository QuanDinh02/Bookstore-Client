import { useState, useEffect } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { AiOutlineUser } from 'react-icons/ai';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

const ProfileSidebar = () => {

    const [toggle, setToggle] = useState(false);
    const location = useLocation();

    const history = useHistory();
    const { url } = useRouteMatch();

    const handleAccesRoute = (route) => {
        history.push(`${url}${route}`);
    }

    return (
        <>
            <div className='sidebar-item'>
                <span
                    className='user-account-section d-flex align-items-center gap-2'
                    onClick={() => {
                        handleAccesRoute('/account');
                        setToggle(!toggle);
                    }}
                >
                    <AiOutlineUser className='user-icon' /> My Account
                </span>
                <Collapse in={toggle}>
                    <div className='account-selection'>
                        <ul>
                            <li
                                className={location.pathname === '/user/account' ? 'mt-2 active-section' : 'mt-2'}
                                onClick={() => handleAccesRoute('/account')}
                            >
                                Profile
                            </li>
                            <li
                                className={location.pathname === '/user/password' ? 'mt-1 active-section' : 'mt-1'}
                                onClick={() => handleAccesRoute('/password')}
                            >
                                Change Password
                            </li>
                            <li
                                className={location.pathname === '/user/address' ? 'mt-1 active-section' : 'mt-1'}
                                onClick={() => handleAccesRoute('/address')}
                            >
                                Addresses
                            </li>
                        </ul>
                    </div>
                </Collapse>
            </div>
            <div className='sidebar-item' onClick={() => handleAccesRoute('/purchase')}>
                <span
                    className=
                    {location.pathname === '/user/purchase' ?
                        'user-purchase-section d-flex align-items-center gap-2 active-section'
                        :
                        'user-purchase-section d-flex align-items-center gap-2'
                    }
                >
                    <HiOutlineClipboardList className='purchase-icon' /> My Purchase
                </span>
            </div>
        </>
    );
}

export default ProfileSidebar;