import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";

import AdminHeader from '../AdminHeader/AdminHeader';
import Authors from '../BookManagement/Authors';
import Publishers from '../BookManagement/Publishers';
import BookCategories from '../BookManagement/BookCategories';
import Dashboard from '../Dashboard/Dashboard';
import Sidebars from '../SideBar/SideBars';
import BookList from '../BookManagement/BookList';

import './Manager.scss';
import UserTable from "../UserManagement/UserTable";
import UserAddNew from "../UserManagement/UserAddNew";
import OrderTable from "../OrderManagement/OrderTable";
import AccessLinksTable from "../Access/AccessLinksTable";
import UserGroup from "../Access/UserGroup";

const Manager = () => {

    const { path } = useRouteMatch();

    return (
        <div className="manager-container d-flex">
            <div className="manager-sidebar">
                <Sidebars />
            </div>
            <div className="manager-content position-relative">
                <AdminHeader />
                <Switch>
                    <Route path={path} exact>
                        <Dashboard />
                    </Route>
                    <Route path={`${path}/book-category`}>
                        <BookCategories />
                    </Route>
                    <Route path={`${path}/book-author`}>
                        <Authors />
                    </Route>
                    <Route path={`${path}/book-publisher`}>
                        <Publishers/>
                    </Route>
                    <Route path={`${path}/books`}>
                        <BookList />
                    </Route>
                    <Route path={`${path}/user-list`}>
                        <UserTable />
                    </Route>
                    <Route path={`${path}/user-add-new`}>
                        <UserAddNew />
                    </Route>
                    <Route path={`${path}/order`}>
                        <OrderTable />
                    </Route>
                    <Route path={`${path}/access`}>
                        <AccessLinksTable />
                    </Route>
                    <Route path={`${path}/user-group`}>
                        <UserGroup />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default Manager;