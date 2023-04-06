import { fetchAccount } from '../components/Services/userServices';
import React from 'react';
import { useHistory } from 'react-router-dom';

const ProfileRoute = (props) => {

    const history = useHistory();

    const fetchAccountInfo = async () => {
        let result = await fetchAccount();
        if (!(result && result.EC === 0)) {
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

export default ProfileRoute;