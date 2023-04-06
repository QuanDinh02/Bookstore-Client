import { fetchAccount } from '../components/Services/userServices';
import { UserLogin } from '../redux/action/actions';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const PrivateRoute = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const fetchAccountInfo = async () => {
        let result = await fetchAccount();
        if (result && result.EC === 0) {
            if (result.DT.group === 'Admin') {
                let buildData = {
                    isAuthenticated: result.DT.isAuthenticated,
                    account: {
                        email: result.DT.email,
                        username: result.DT.username,
                        id: result.DT.id,
                        user_group: result.DT.group
                    }
                }
                dispatch(UserLogin(buildData));
            } else {
                history.push('/');
                window.location.reload();
            }
        } else {
            history.push('/login');
        }
    }

    React.useEffect(() => {
        fetchAccountInfo();
    }, []);

    return (
        <div>
            {props.children}
        </div>
    )
}

export default PrivateRoute;