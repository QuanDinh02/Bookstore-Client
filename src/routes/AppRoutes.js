import {
    Switch,
    Route,
} from "react-router-dom";
import BookCategoryDetail from "../components/Content/BookCategoryDetail/BookCategoryDetail";
import HomepageContent from "../components/Content/Homepage/HomepageContent";
import BookDetail from "../components/Content/Book/BookDetail";
import Cart from "../components/Content/ShoppingCart/Cart";

const AppRoutes = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <HomepageContent />
            </Route>
            <Route path="/book-category/:id">
                <BookCategoryDetail />
            </Route>
            <Route path="/book/:id">
                <BookDetail />
            </Route>
            <Route path="/cart">
                <Cart/>
            </Route>
            <Route path="*">
                <div className="container">
                    404 Page Not Found
                </div>
            </Route>
        </Switch>
    );
}

export default AppRoutes;