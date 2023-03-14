import { FiChevronsRight, FiChevronsLeft } from "react-icons/fi";
import {
    useProSidebar
} from "react-pro-sidebar";
import './AdminHeader.scss';

const AdminHeader = () => {

    const { collapseSidebar, collapsed } = useProSidebar();

    return (
        <div className="admin-header-container red">
            <div className="sidebar-collapsed-icon">
                {collapsed ?
                    <FiChevronsRight className="sidebar-icon" onClick={() => collapseSidebar()} />
                    :
                    <FiChevronsLeft className="sidebar-icon" onClick={() => collapseSidebar()} />
                }
            </div>
        </div>
    )
}

export default AdminHeader;