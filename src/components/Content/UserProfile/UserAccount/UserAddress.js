import { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdModeEditOutline } from 'react-icons/md';
import ModalAddress from '../Modal/ModalAddress';

const UserAddress = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');

    const [moddifiedData, setModifiedData] = useState({
        name: '',
        phone: '',
        address: ''
    });

    const handleShowModal = (action, data = {}) => {

        setModalType(action);
        if (action === 'CREATE') {
            setModifiedData({
                name: '',
                phone: '',
                address: ''
            })
        }
        else if (action === 'UPDATE') {
            setModifiedData({
                name: data?.name,
                phone: data?.phone,
                address: data?.address
            })
        } else {
            setModifiedData({
                address_id: ''
            })
        }

        setShowModal(true);
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
                                <div className='address-item mb-4 d-flex justify-content-between'>
                                    <div className='address-info col-4'>
                                        <div className='align-items-center d-flex pb-1 gap-3'>
                                            <span className='name'>Kevin Oliver</span>
                                            <span className='phone'>0907523321</span>
                                        </div>
                                        <div className='address-content d-flex flex-column'>
                                            <span className='address pb-1'>10, Tran Phu, Hiep Hoa Disctrict, California</span>
                                            <span className='default-label'>Default</span>
                                        </div>
                                    </div>
                                    <div className='address-actions d-flex flex-column align-items-end col-4'>
                                        <div className='pb-2'>
                                            <MdModeEditOutline className='edit-icon me-2' title='Edit' onClick={() => handleShowModal('UPDATE', {})}/>
                                            <FaRegTrashAlt className='delete-icon' title='Delete' onClick={() => handleShowModal('DELETE',{})} />
                                        </div>
                                        <div>
                                            <button className='btn btn-outline-secondary'>Set as default</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ModalAddress
                            show={showModal}
                            setShow={setShowModal}
                            data={moddifiedData}
                            type={modalType}
                        />
                    </>


            }
        </>
    )
}

export default UserAddress;