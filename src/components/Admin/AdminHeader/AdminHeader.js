import {
    FiChevronsRight, FiChevronsLeft, FiMail
} from "react-icons/fi";
import { RiFileUserLine, RiAccountBoxLine } from "react-icons/ri";
import { BiNews } from "react-icons/bi";
import { HiOutlineLockClosed } from "react-icons/hi";
import { RxExit } from "react-icons/rx";

import {
    useProSidebar
} from "react-pro-sidebar";
import './AdminHeader.scss';
import User from '../../../assets/image/user.png';
import { Link } from "react-router-dom";

const AdminHeader = () => {

    const { collapseSidebar, collapsed } = useProSidebar();

    return (
        <div className="admin-header-container sticky-top d-flex gap-2">
            <div className="sidebar-collapsed-icon pt-2 px-2">
                {collapsed ?
                    <FiChevronsRight className="sidebar-icon" onClick={() => collapseSidebar()} />
                    :
                    <FiChevronsLeft className="sidebar-icon" onClick={() => collapseSidebar()} />
                }
            </div>
            <div className="admin-main flex-grow-1 d-flex justify-content-between align-items-center px-3 py-2">
                <div className="admin-left-content">
                    <div className="section mb-2">
                        <span>Category Lists</span>
                    </div>
                    <div className="breadcrumb-section">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to='/admin/manager'>Admin</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to='/admin/manager'>Category Lists</Link>
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="admin-right-content d-flex align-items-end">
                    <div className="mail position-relative me-4 pb-2">
                        <FiMail className="mail-icon" />
                        <div className="mail-box position-absolute end-0 top-100 mt-2">
                            <div className="mail-header d-flex justify-content-between align-items-center p-3">
                                <span>All Messages</span>
                                <div className="message-amount">5</div>
                            </div>
                            <div className="mail-main py-3">
                                {[...Array(4)].map(item => {
                                    return (
                                        <div className="mail-message d-flex align-items-center mb-3 px-3 gap-2">
                                            <div className="user-mail-image">
                                                <img src={User} alt='' />
                                            </div>
                                            <div className="mail-content d-flex flex-column">
                                                <span className="mail-username">Berry Emmma Watson</span>
                                                <span className="mail-time">12 Feb</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="profile d-flex align-items-center position-relative gap-3">
                        <div className="image">
                            <img src={User} alt='' />
                        </div>
                        <div className="account-info d-flex flex-column">
                            <span className="account-name">Beron Tech</span>
                            <span className="account-role">Manager</span>
                        </div>
                        <div className="settings-box position-absolute end-0 top-100 mt-2">
                            <div className="account-name d-flex justify-content-between align-items-center p-3">
                                <span>Hello Baron Tech</span>
                            </div>
                            <div className="settings py-3">
                                <div className="setting-item d-flex align-items-center mb-4 px-4 gap-4">
                                    <div className="setting-icon">
                                        <RiFileUserLine className="icon" />
                                    </div>
                                    <div className="item-content d-flex flex-column">
                                        <span className="item-title">My Profile</span>
                                        <span className="item-description">View personal profile details</span>
                                    </div>
                                </div>
                                <div className="setting-item d-flex align-items-center my-4 px-4 gap-4">
                                    <div className="setting-icon">
                                        <BiNews className="icon" />
                                    </div>
                                    <div className="item-content d-flex flex-column">
                                        <span className="item-title">Edit Profile</span>
                                        <span className="item-description">Modify your personal details</span>
                                    </div>
                                </div>
                                <div className="setting-item d-flex align-items-center my-4 px-4 gap-4">
                                    <div className="setting-icon">
                                        <RiAccountBoxLine className="icon" />
                                    </div>
                                    <div className="item-content d-flex flex-column">
                                        <span className="item-title">Account Settings</span>
                                        <span className="item-description">Manage your account parameters</span>
                                    </div>
                                </div>
                                <div className="setting-item d-flex align-items-center my-4 px-4 gap-4">
                                    <div className="setting-icon">
                                        <HiOutlineLockClosed className="icon" />
                                    </div>
                                    <div className="item-content d-flex flex-column">
                                        <span className="item-title">Privacy Settings</span>
                                        <span className="item-description">Control your privacy parameters</span>
                                    </div>
                                </div>
                                <div className="logout-btn my-2 mx-auto">
                                    <button className="btn">Sign out <RxExit/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminHeader;