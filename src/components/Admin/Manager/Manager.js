import Sidebars from '../SideBar/SideBars';
import './Manager.scss';
import { FiChevronsRight, FiChevronsLeft } from "react-icons/fi";
import {
    useProSidebar
} from "react-pro-sidebar";

const Manager = () => {

    const { collapseSidebar, collapsed } = useProSidebar();

    return (
        <div className="manager-container d-flex">
            <div className="manager-sidebar">
                <Sidebars />
            </div>
            <div className="manager-content">
                {collapsed ?
                    <FiChevronsRight className="sidebar-icon" onClick={() => collapseSidebar()} />
                    :
                    <FiChevronsLeft className="sidebar-icon" onClick={() => collapseSidebar()}/>
                }


                <main style={{ padding: 10 }}> Main content</main>
            </div>
        </div>
    )
}

export default Manager;