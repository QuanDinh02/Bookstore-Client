import {
    Switch,
    Route,
    useRouteMatch,
    Redirect
} from "react-router-dom";
import Manager from "../components/Admin/Manager/Manager";
import PageNotFound from "../components/Content/ErrorPage/PageNotFound";

const AdminRoutes = () => {

    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={path} exact>
                <Redirect to={`${path}/manager`} />
            </Route>
            <Route path={`${path}/manager`}>
                <Manager />
            </Route>
            <Route path="*">
                <PageNotFound />
            </Route>
        </Switch>
    )
}

export default AdminRoutes;