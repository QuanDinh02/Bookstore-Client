import {
    Route,
    Switch
} from "react-router-dom";
import BookCategoryDetail from "../components/Content/BookCategoryDetail/BookCategoryDetail";
import HomepageContent from "../components/Content/Homepage/HomepageContent";
import BookDetail from "../components/Content/Book/BookDetail";
import Cart from "../components/Content/ShoppingCart/Cart";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import AdminRoutes from "./AdminRoutes";
import { useState } from "react";
import { ProSidebarProvider } from 'react-pro-sidebar';
import UserProfile from "../components/Content/UserProfile/UserProfile";
import Login from "../components/Authentication/Login";
import Register from "../components/Authentication/Register";
import PrivateRoute from "./PrivateRoute";
import ProfileRoute from "./ProfileRoute";
import PageNotFound from "../components/Content/ErrorPage/PageNotFound";

const AppRoutes = () => {

    const [showHeaderFooter, setShowHeaderFooter] = useState(true);

    return (
        <>
            {showHeaderFooter &&
                <Header
                    setShow={setShowHeaderFooter}
                />
            }
            <Switch>
                <Route path="/" exact>
                    <HomepageContent />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/admin">
                    <PrivateRoute>
                        <ProSidebarProvider>
                            <AdminRoutes />
                        </ProSidebarProvider>
                    </PrivateRoute>
                </Route>
                <Route path="/book-category/:id">
                    <BookCategoryDetail />
                </Route>
                <Route path="/book/:id">
                    <BookDetail />
                </Route>
                <Route path="/cart">
                    <ProfileRoute>
                        <Cart />
                    </ProfileRoute>
                </Route>
                <Route path="/user">
                    <ProfileRoute>
                        <UserProfile />
                    </ProfileRoute>
                </Route>
                <Route path="*">
                    <PageNotFound />
                </Route>
            </Switch>
            {showHeaderFooter && <Footer />}

        </>
    );
}

export default AppRoutes;