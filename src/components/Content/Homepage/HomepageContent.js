import './HomepageContent.scss';
import poster from '../../../assets/image/poster.png';
import HighlightBook from './HighlightBook/HighlightBook';
import BookGroup from './BookGroup/BookGroup';
import ColumnBookGroup from './ColumnBookGroup/ColumnBookGroup';
import Footer from '../../Footer/Footer';
// import { postCreateABook } from '../../Services/apiServices';
// import { useState } from 'react';

const HomepageContent = () => {

    // const [test, setTest] = useState('');
    // const [previewImage, setPreviewImage]= useState('');

    // const handleTest = (event) => {
    //     setTest(event.target.files[0]);
    // }

    // const handleSave = async () => {
    //     let result = await postCreateABook(test);
    //     if(result && result.EC === 0) {
    //         setPreviewImage(`data:image/jpeg;base64,${result.DT.image}`);
    //     }
    // }

    return (
        <div className="homepage-content-container ">
            <div className='container'>
                <div className="poster-section d-flex">
                    <div className="col-md-3">
                    </div>
                    <div className="poster col-12 col-md-9">
                        <div className='poster-top'>
                            <div className='poster-top-left'>
                                <img src={poster} alt='poster' />
                            </div>
                            <div className='poster-top-right'>
                                <img src={poster} alt='poster' />
                            </div>
                        </div>
                        <div className='poster-bottom'>
                            <div className='poster-bottom-left'>
                                <div className='first'>
                                    <img src={poster} alt='poster' />
                                </div>
                                <div className='second'>
                                    <img src={poster} alt='poster' />
                                </div>
                            </div>

                            <div className='poster-bottom-right'>
                                <img src={poster} alt='poster' />
                            </div>
                        </div>

                    </div>
                </div>

                <div className='content-section d-flex justify-content-between'>
                    <div className='content-left tomato col-12 col-xl-9 pe-xxl-3'>
                        <HighlightBook />
                        <BookGroup />
                    </div>
                    <div className='content-right green d-none d-xl-block col-xl-3'>
                        <ColumnBookGroup />
                        <ColumnBookGroup />
                    </div>
                </div>
                {/* <div className='test-section'>
                    <div className='form-group'>
                        <label htmlFor='test' className='btn btn-primary'>Upload</label>
                        <input classname='form-control' type='file' id='test' onChange={(event) => handleTest(event)}/>
                    </div>
                    <div>
                        <img src={previewImage}/>
                    </div>
                    <div>
                        <button className='btn btn-warning mt-3' onClick={handleSave}>Save</button>
                    </div>
                </div> */}
            </div>
            <Footer />
        </div>
    )
}

export default HomepageContent;