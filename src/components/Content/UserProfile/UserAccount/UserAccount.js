import { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import User from '../../../../assets/image/user.png';

const UserAccount = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [loadingImage, setLoadingImage] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const handleImageChange = (value) => {
        setLoadingImage(true);

        setTimeout(() => {
            setPreviewImage(URL.createObjectURL(value));
            setLoadingImage(false);
        }, 1500);
    }

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
                    wrapperClassName="three-dots"
                    visible={true}
                />
                :
                <div className="user-account-container">
                    <div className="account-header d-flex flex-column">
                        <span className="account-title">My Profile</span>
                        <span className='attention'>Manage and protect your account</span>
                    </div>
                    <div className="account-content mt-4 d-flex">
                        <div className="account-information col-8">
                            <div className="d-flex align-items-center item">
                                <label className="form-label col-3 text-end pe-4 main-label">Username</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="d-flex align-items-center item">
                                <label className="form-label col-3 text-end pe-4 main-label">Name</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="d-flex align-items-center item">
                                <label className="form-label col-3 text-end pe-4 main-label">Email</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="d-flex align-items-center item">
                                <label className="form-label col-3 text-end pe-4 main-label">Phone Number</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="d-flex align-items-center item">
                                <label className="form-label col-3 text-end pe-4 main-label">Gender</label>
                                <div className='d-flex gap-3'>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="MaleCheck" />
                                        <label className="form-check-label" htmlFor="MaleCheck">
                                            Male
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="FemaleCheck" />
                                        <label className="form-check-label" htmlFor="MaleCheck">
                                            Female
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="OtherCheck" />
                                        <label className="form-check-label" htmlFor="OtherCheck">
                                            Other
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex align-items-center item">
                                <label className="form-label col-3 text-end pe-4 main-label">Date of birth</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className='d-flex align-items-center item'>
                                <div className='col-3 hidden-text'>Hidden</div>
                                <button className='btn btn-success col-2'>Save</button>
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
                                        wrapperStyle={{ 'justify-content': 'center','align-items' : 'center'}}
                                        wrapperClassName=""
                                        visible={true}
                                    />
                                    :
                                    <>
                                        {
                                            previewImage ?
                                                <img src={previewImage} alt='' />
                                                :
                                                <img src={User} alt='profile-image' />
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
                                    onChange={(event) => handleImageChange(event.target.files[0])}
                                />
                            </div>
                            <div className='img-hint d-flex flex-column'>
                                <span>File size: maximum 1 MB</span>
                                <span>File extension: .JPEG, .PNG</span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default UserAccount;