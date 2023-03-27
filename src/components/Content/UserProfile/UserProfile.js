import './UserProfile.scss';
import {
    Switch, Redirect,
    Route,
    useRouteMatch
} from "react-router-dom";

import UserAccount from './UserAccount/UserAccount';
import Purchase from './Purchase/Purchase';
import ProfileSidebar from './ProfileSidebar/ProfileSidebar';
import ChangePassword from './ChangePassword';
import UserAddress from './UserAccount/UserAddress';

const UserProfile = () => {

    const { path } = useRouteMatch();

    return (
        <div className='user-profile-containter pt-4 pb-5'>
            <div className='user-profile-detail container d-flex'>
                <div className='profile-sidebar pt-3 col-2'>
                    <ProfileSidebar />
                </div>
                <div className='profile-content col-10'>
                    <Switch>
                        <Route path={path} exact>
                            <Redirect to={`${path}/account`} />
                        </Route>
                        <Route path={`${path}/account`}>
                            <UserAccount />
                        </Route>
                        <Route path={`${path}/purchase`}>
                            <Purchase />
                        </Route>
                        <Route path={`${path}/password`}>
                            <ChangePassword />
                        </Route>
                        <Route path={`${path}/address`}>
                            <UserAddress />
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;