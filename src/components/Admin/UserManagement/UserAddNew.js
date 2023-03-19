import User from '../../../assets/image/user.png';
import { FiUpload } from 'react-icons/fi';

const UserAddNew = () => {

    return (
        <div className="user-add-new-container d-flex justify-content-between">
            <div className="left-content">
                <div className="content-title px-4 py-3">
                    <span className="table-title">Add New User</span>
                </div>
                <div className="main-content px-4 py-3">
                    <div className='w-100 d-flex justify-content-center'>
                        <div className="image">
                            <img src={User} alt='' />
                        </div>
                    </div>
                    <div className='image-upload my-3 pt-1 px-2'>
                        <label for="formFile" class="form-label d-flex align-items-center gap-2 fileUpload"><FiUpload /> Image</label>
                        <input class="form-control" type="file" id="formFile" hidden />
                    </div>
                    <div className='file-upload-allow my-3'>
                        <span>Only .jpg .png .jpeg allowed</span>
                    </div>
                    <div>
                        <div className='mb-3'>
                            <label className='form-label'>Facebook Url:</label>
                            <input className='form-control' type='text' placeholder='Facebook Url' />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Twitter Url:</label>
                            <input className='form-control' type='text' placeholder='Twitter Url' />
                        </div>
                    </div>
                </div>
            </div>
            <div className="right-content">
                <div className="content-title px-4 py-3">
                    <span className="table-title">New User Information</span>
                </div>
                <div className="main-content px-4 py-3">
                    <div className='user-info mb-4'>
                        <div className='row'>
                            <div className='mb-3 col-6'>
                                <label className='form-label'>Full Name:</label>
                                <input className='form-control' type='text' placeholder='Full Name' />
                            </div>
                            <div className='mb-3 col-6'>
                                <label className='form-label'>Date of birth:</label>
                                <input className='form-control' type='text' placeholder='Birthday' />
                            </div>
                        </div>
                        <div className='mb-3 col-12'>
                            <label className='form-label'>Address:</label>
                            <input className='form-control' type='text' placeholder='Address' />
                        </div>
                        <div className='row'>
                            <div className='mb-3 col-4'>
                                <label className='form-label'>Phone:</label>
                                <input className='form-control' type='text' placeholder='Phone number' />
                            </div>
                            <div className='mb-3 col-4'>
                                <label className='form-label'>Gender:</label>
                                <select className="form-select">
                                    <option defaultValue=''>Select...</option>
                                    <option value="Man">Man</option>
                                    <option value="Woman">Woman</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className='mb-3 col-4'>
                                <label className='form-label'>User role:</label>
                                <select className="form-select">
                                    <option defaultValue=''>Select...</option>
                                    <option value="0">Manager</option>
                                    <option value="1">Staff</option>
                                    <option value="2">Customer</option>
                                </select>
                            </div>
                        </div>
                        <div className='pb-4 col-6'>
                            <label className='form-label'>Email:</label>
                            <input className='form-control' type='text' placeholder='Email' />
                        </div>
                    </div>
                    <div className='user-account-info'>
                        <div className="section-title mb-3">
                            <span>Account</span>
                        </div>
                        <div className='mb-3 col-12'>
                            <label className='form-label'>Username:</label>
                            <input className='form-control' type='text' placeholder='Username' />
                        </div>
                        <div className='row'>
                            <div className='mb-3 col-6'>
                                <label className='form-label'>Password:</label>
                                <input className='form-control' type='password' placeholder='Password' />
                            </div>
                            <div className='mb-3 col-6'>
                                <label className='form-label'>Repeat Password:</label>
                                <input className='form-control' type='password' placeholder='Repeat Password' />
                            </div>
                            <div>
                                <button className='btn btn-warning'>Add New User</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAddNew;
