import {
    Switch,
    Route,
} from "react-router-dom";
import BookCategoryDetail from "../components/Content/BookCategoryDetail/BookCategoryDetail";

import HomepageContent from "../components/Content/Homepage/HomepageContent";

const AppRoutes = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <HomepageContent />
            </Route>
            <Route path="/book-category/:id">
                <BookCategoryDetail />
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