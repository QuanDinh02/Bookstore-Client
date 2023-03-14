import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import AdminHomepage from "../components/Admin/AdminHomepage";
import Manager from "../components/Admin/Manager/Manager";

const AdminRoutes = () => {

    const { path} = useRouteMatch();

    return (
        <Switch>
            <Route path={path} exact>
                <AdminHomepage />
            </Route>
            <Route path={`${path}/manager`} exact>
                <Manager/>
            </Route>
        </Switch>
    )
}

export default AdminRoutes;