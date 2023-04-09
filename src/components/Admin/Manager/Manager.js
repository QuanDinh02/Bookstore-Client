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
import OrderDetail from "../OrderManagement/OrderDetail";
import { useState } from "react";

const Manager = () => {

    const { path } = useRouteMatch();
    const [title, setTitle] = useState('');

    return (
        <div className="manager-container d-flex">
            <div className="manager-sidebar">
                <Sidebars />
            </div>
            <div className="manager-content position-relative">
                <AdminHeader title={title} />
                <Switch>
                    <Route path={path} exact>
                        <Dashboard setTitle={setTitle}/>
                    </Route>
                    <Route path={`${path}/book-category`}>
                        <BookCategories setTitle={setTitle}/>
                    </Route>
                    <Route path={`${path}/book-author`}>
                        <Authors setTitle={setTitle}/>
                    </Route>
                    <Route path={`${path}/book-publisher`}>
                        <Publishers setTitle={setTitle}/>
                    </Route>
                    <Route path={`${path}/books`}>
                        <BookList setTitle={setTitle}/>
                    </Route>
                    <Route path={`${path}/user-list`}>
                        <UserTable setTitle={setTitle}/>
                    </Route>
                    <Route path={`${path}/user-add-new`}>
                        <UserAddNew setTitle={setTitle}/>
                    </Route>
                    <Route path={`${path}/order`}>
                        <OrderTable setTitle={setTitle}/>
                    </Route>
                    <Route path={`${path}/order-detail/:id`}>
                        <OrderDetail setTitle={setTitle}/>
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default Manager;