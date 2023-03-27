import { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';

const ChangePassword = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);

    return (
        <>
            {isLoading === true ?
                <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="#4fa94d"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{ 'justifyContent': 'center' , 'alignItems': 'center',"height" : '25rem'}}
                    wrapperClassName=""
                    visible={true}
                />
                :
                <div className='password-account-container'>
                    <div className="password-header d-flex flex-column">
                        <span className="password-title">Set Password</span>
                        <span className='attention'>For your account's security, do not share your password with anyone else</span>
                    </div>
                    <div className='password-content mt-4'>
                        <div className='password-wrapper'>
                            <div className="d-flex align-items-center col-9 item">
                                <label className="form-label text-end col-4 pe-4 main-label">Old Password</label>
                                <input type="password" className="form-control" />
                            </div>
                            <div className="d-flex align-items-center col-9 item">
                                <label className="form-label text-end col-4 pe-4 main-label">New Password</label>
                                <input type="password" className="form-control" />
                            </div>
                            <div className="d-flex align-items-center col-9 item">
                                <label className="form-label text-end col-4 pe-4 main-label">Confirm Password</label>
                                <input type="password" className="form-control" />
                            </div>
                            <div className='d-flex align-items-center col-9 item'>
                                <div className='col-4 hidden-text'>Hidden</div>
                                <button className='btn btn-success px-3'>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ChangePassword;