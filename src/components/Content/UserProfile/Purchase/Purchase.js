import { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import {
    Switch,
    Route,
    useRouteMatch,
    useHistory,
    Redirect,
    useLocation
} from "react-router-dom";
import PurchaseDetail from './PurchaseDetail';

const Purchase = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState(1);
    const { path, url } = useRouteMatch();

    const history = useHistory();
 
    const handleAccesRoute = (route) => {
        setStatus(+route);
        history.push(`${url}/${route}`);
    }

    useEffect(() => {  
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);

    return (
        <>
            {
                isLoading === true ?
                    <ThreeDots
                        height="80"
                        width="80"
                        radius="9"
                        color="#4fa94d"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{ 'justifyContent': 'center', 'alignItems': 'center', "height": '25rem' }}
                        wrapperClassName=""
                        visible={true}
                    />
                    :

                    <div className='user-purchase-container '>
                        <div className='purchase-navigation d-flex mb-5' >
                            <div className={status === 1 ? 'tab active-navigation-link' : 'tab'} onClick={() => handleAccesRoute('1')}>
                                <a className='navigation-link'>All</a >
                            </div>
                            <div className={status === 2 ? 'tab active-navigation-link' : 'tab'} onClick={() => handleAccesRoute('2')}>
                                <a className='navigation-link'>Processing</a >
                            </div>
                            <div className={status === 3 ? 'tab active-navigation-link' : 'tab'} onClick={() => handleAccesRoute('3')}>
                                <a className='navigation-link'>Delivered</a >
                            </div>
                            <div className={status === 4 ? 'tab active-navigation-link' : 'tab'} onClick={() => handleAccesRoute('4')}>
                                <a className='navigation-link'>Completed</a >
                            </div>
                            <div className={status === 5 ? 'tab active-navigation-link' : 'tab'} onClick={() => handleAccesRoute('5')}>
                                <a className='navigation-link'>Canceled</a >
                            </div>
                        </div>
                        <div className='user-purchase-detail'>
                            <Switch>
                                <Route path={path} exact>
                                    <Redirect to={`${url}/1`} />
                                </Route>
                                <Route path={`${path}/:id`}>
                                    <PurchaseDetail />
                                </Route>

                            </Switch>
                        </div>
                    </div>
            }
        </>
    )
}

export default Purchase;