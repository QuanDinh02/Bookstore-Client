import { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';

const UserAddress = () => {

    const [isLoading, setIsLoading] = useState(true);

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
                    <div className='user-address-container'>
                        <div className="address-header d-flex align-items-center justify-content-between">
                            <span className="address-title">My Addresses</span>
                            <button className='btn btn-success'>
                                <div className='d-flex align-items-center gap-2'>
                                    <span className='plus-icon'>+</span> Add New Address
                                </div>
                            </button>
                        </div>
                    </div>
            }
        </>
    )
}

export default UserAddress;