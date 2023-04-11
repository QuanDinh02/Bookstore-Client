import { useHistory } from 'react-router-dom';
import './PageNotFound.scss';
const PageNotFound = () => {

    const history = useHistory();

    const backToHomepage = () => {
        history.push('/');
        window.location.reload();
    }

    return (
        <div className="page-not-found">
            <div className='container'>
                <div className='page-content'>
                    <h3>Page Not Found</h3>
                    <div className='mt-4'>
                        Unfortunately the page you're looking for doesn't exist (anymore) or there was an error in the link you followed or typed
                    </div>
                    <div className='mt-4'>
                        <button className='btn btn-success' onClick={backToHomepage}>Go to Homepage</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default PageNotFound;