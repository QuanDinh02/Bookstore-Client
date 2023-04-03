import { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdModeEditOutline } from 'react-icons/md';
import ModalAddress from '../Modal/ModalAddress';
import { fetchUserAddresses } from '../../../Services/userServices';
import { useSelector } from 'react-redux';

const UserAddress = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [addressList, setAddressList] = useState([]);

    const account = useSelector(state => state.user.account);

    const [moddifiedData, setModifiedData] = useState({
        name: '',
        phone: '',
        address: '',
        user_id: ''
    });

    const handleShowModal = (action, data = {}) => {

        setModalType(action);
        if (action === 'CREATE') {
            setModifiedData({
                name: '',
                phone: '',
                address: '',
                default: 'FALSE',
                user_id: account?.id,
            })
        }
        else if (action === 'UPDATE') {
            setModifiedData({
                address_id: data?.id,
                name: data?.name,
                phone: data?.phone,
                address: data?.address
            })
        } else if (action === 'SET_DEFAULT') {
            let defaultAddress = addressList.filter(item => item.default === 'TRUE')[0];

            setModifiedData({
                default_address_id: defaultAddress.id,
                address_id: data?.id,
                default: 'TRUE'
            })
        } else {
            setModifiedData({
                address_id: data?.id
            })
        }

        setShowModal(true);
    }

    const fetchAllAddresses = async () => {
        if (account) {
            let result = await fetchUserAddresses(account.id);
            if (result && result.EC === 0) {
                setAddressList(result.DT);
            }
        }
    }

    useEffect(() => {
        fetchAllAddresses();
    }, [account]);

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
                    <>
                        <div className='user-address-container'>
                            <div className="address-header d-flex align-items-center justify-content-between">
                                <span className="address-title">My Addresses</span>
                                <button className='btn btn-success'>
                                    <div className='d-flex align-items-center gap-2' onClick={() => handleShowModal('CREATE')}>
                                        <span className='plus-icon'>+</span> Add New Address
                                    </div>
                                </button>
                            </div>
                            <div className='address-main mt-4'>
                                {addressList && addressList.length > 0 &&
                                    addressList.map(item => {
                                        return (
                                            <div className='address-item mb-4 d-flex justify-content-between'>
                                                <div className='address-info col-4'>
                                                    <div className='align-items-center d-flex pb-1 gap-3'>
                                                        <span className='name'>{item.name}</span>
                                                        <span className='phone'>{item.phone}</span>
                                                    </div>
                                                    <div className='address-content d-flex flex-column'>
                                                        <span className='address pb-1'>{item.address}</span>
                                                        {item.default === 'TRUE' && <span className='default-label'>Default</span>}
                                                    </div>
                                                </div>
                                                <div className='address-actions d-flex flex-column align-items-end col-4'>
                                                    <div className='pb-2'>
                                                        <MdModeEditOutline className='edit-icon me-2' title='Edit' onClick={() => handleShowModal('UPDATE', item)} />
                                                        <FaRegTrashAlt className='delete-icon' title='Delete' onClick={() => handleShowModal('DELETE', item)} />
                                                    </div>
                                                    <div>
                                                        <button
                                                            className='btn btn-outline-secondary'
                                                            disabled={(addressList.length === 1 || item.default === 'TRUE') ? true : false}
                                                            onClick={() => handleShowModal('SET_DEFAULT', item)}
                                                        >
                                                            Set as default
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <ModalAddress
                            show={showModal}
                            setShow={setShowModal}
                            data={moddifiedData}
                            type={modalType}
                            fetchAddress={fetchAllAddresses}
                        />
                    </>


            }
        </>
    )
}

export default UserAddress;