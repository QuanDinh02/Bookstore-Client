import './HomepageContent.scss';
import poster from '../../../assets/image/poster.png';
import HighlightBook from './HighlightBook/HighlightBook';
import BookGroup from './BookGroup/BookGroup';

const HomepageContent = () => {
    return (
        <div className="homepage-content-container container">
            <div className="poster-section d-flex">
                <div className="col-3">
                </div>
                <div className="poster col-9">
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
                <div className='content-left tomato col-9'>
                    <HighlightBook/>
                    <BookGroup/>
                </div>
                <div className='content-right green col-3'>
                    
                </div>
            </div>
        </div>
    )
}

export default HomepageContent;