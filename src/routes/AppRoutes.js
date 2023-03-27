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
                <Route path="/admin">
                    <ProSidebarProvider>
                        <AdminRoutes />
                    </ProSidebarProvider>
                </Route>
                <Route path="/book-category/:id">
                    <BookCategoryDetail />
                </Route>
                <Route path="/book/:id">
                    <BookDetail />
                </Route>
                <Route path="/cart">
                    <Cart />
                </Route>
                <Route path="/user">
                    <UserProfile/>
                </Route>
                <Route path="*">
                    <div className="container">
                        404 Page Not Found
                    </div>
                </Route>
            </Switch>
            {showHeaderFooter && <Footer />}

        </>
    );
}

export default AppRoutes;