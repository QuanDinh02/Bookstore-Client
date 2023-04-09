import { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import User from '../../../../assets/image/user.png';
import { useImmer } from 'use-immer';
import { getUserProfile } from '../../../Services/userServices';
import { useSelector } from 'react-redux';
import ModalProfile from '../Modal/ModalProfile';
import { putUpdateUserProfile } from '../../../Services/userServices';
import { successToast, errorToast } from '../../../Toast/Toast';

const UserAccount = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [loadingImage, setLoadingImage] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const account = useSelector(state => state.user.account);

    const [userData, setUserData] = useImmer({});

    const fetchUserProfile = async () => {
        if (account && account?.id) {
            let result = await getUserProfile(account.id);
            if (result && result.EC === 0) {
                console.log(result.DT);
                setUserData(result.DT);
            }
        }
    }

    const showToast = (result) => {
        if (result.EC === 0) {
            setShowModal(false);
            successToast(result.EM);
            fetchUserProfile();
        }
        if (result.EC === 1) {
            errorToast(result.EM);
        }
    }

    const handleOnChange = (type, value) => {
        if (type === 'image') {

            setLoadingImage(true);
            setUserData(draft => {
                draft['image'] = value;
            })

            setTimeout(() => {
                setPreviewImage(URL.createObjectURL(value));
                setLoadingImage(false);
            }, 1500);
        }

        setUserData(draft => {
            draft[type] = value;
        })
    }

    const handleEditProfile = async () => {
        const result = await putUpdateUserProfile(userData);

        if (result && result.EC === 0) {
            showToast(result);
        }
    }

    useEffect(() => {
        fetchUserProfile();
    }, [account]);

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
                    wrapperStyle={{ 'justifyContent': 'center', 'alignItems': 'center', "height": '25rem' }}
                    wrapperClassName="three-dots"
                    visible={true}
                />
                :
                <>
                    <div className="user-account-container">
                        <div className="account-header d-flex flex-column">
                            <span className="account-title">My Profile</span>
                            <span className='attention'>Manage and protect your account</span>
                        </div>
                        <div className="account-content mt-4 d-flex">
                            <div className="account-information col-8">
                                <div className="d-flex align-items-center item">
                                    <label className="form-label col-3 text-end pe-4 main-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={userData?.username}
                                        disabled
                                    />
                                </div>
                                <div className="d-flex align-items-center item">
                                    <label className="form-label col-3 text-end pe-4 main-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={userData?.fullname}
                                        onChange={(event) => handleOnChange('fullname', event.target.value)}
                                    />
                                </div>
                                <div className="d-flex align-items-center item">
                                    <label className="form-label col-3 text-end pe-4 main-label">Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={userData?.email}
                                        disabled
                                    />
                                </div>
                                <div className="d-flex align-items-center item">
                                    <label className="form-label col-3 text-end pe-4 main-label">Phone Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={userData?.phone}
                                        onChange={(event) => handleOnChange('phone', event.target.value)}
                                    />
                                </div>
                                <div className="d-flex align-items-center item">
                                    <label className="form-label col-3 text-end pe-4 main-label">Gender</label>
                                    <div className='d-flex gap-3'>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="MaleCheck"
                                                value="Male"
                                                checked={userData?.gender === "Male" ? true : false}
                                                onChange={(event) => handleOnChange('gender', event.target.value)}
                                            />
                                            <label className="form-check-label" htmlFor="MaleCheck">
                                                Male
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="FemaleCheck"
                                                value="Female"
                                                checked={userData?.gender === "Female" ? true : false}
                                                onChange={(event) => handleOnChange('gender', event.target.value)}
                                            />
                                            <label className="form-check-label" htmlFor="FemaleCheck">
                                                Female
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="OtherCheck"
                                                value="Other"
                                                checked={userData?.gender === "Other" ? true : false}
                                                onChange={(event) => handleOnChange('gender', event.target.value)}
                                            />
                                            <label className="form-check-label" htmlFor="OtherCheck">
                                                Other
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center item">
                                    <label className="form-label col-3 text-end pe-4 main-label">Date of birth</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={userData?.dob}
                                        onChange={(event) => handleOnChange('dob', event.target.value)}
                                    />
                                </div>
                                <div className='d-flex align-items-center item'>
                                    <div className='col-3 hidden-text'>Hidden</div>
                                    <button className='btn btn-success col-2' onClick={() => setShowModal(true)}>Save</button>
                                </div>
                            </div>
                            <div className="account-image col-4 d-flex flex-column align-items-center">
                                <div className='image'>
                                    {loadingImage === true ?
                                        <ThreeDots
                                            height="60"
                                            width="60"
                                            radius="9"
                                            color="#4fa94d"
                                            ariaLabel="three-dots-loading"
                                            wrapperStyle={{ 'justify-content': 'center', 'align-items': 'center' }}
                                            wrapperClassName=""
                                            visible={true}
                                        />
                                        :
                                        <>
                                            {previewImage ?
                                                <img src={previewImage} alt='profile-image' />
                                                :
                                                (userData?.image ?
                                                    <img src={`data:image/jpeg;base64,${userData.image}`} alt='profile-image' />
                                                    :
                                                    <img src={User} alt='profile-image' />
                                                )
                                            }
                                        </>
                                    }
                                </div>
                                <div className='upload-img-btn my-3'>
                                    <label htmlFor="formFile" className="form-label d-flex align-items-center gap-2 file_upload">Select Image</label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        id="formFile"
                                        hidden
                                        onChange={(event) => handleOnChange('image', event.target.files[0])}
                                    />
                                </div>
                                <div className='img-hint d-flex flex-column'>
                                    <span>File size: maximum 1 MB</span>
                                    <span>File extension: .JPEG, .PNG</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ModalProfile
                        show={showModal}
                        setShow={setShowModal}
                        handleEditProfile={handleEditProfile}
                    />
                </>
            }
        </>
    )
}

export default UserAccount;