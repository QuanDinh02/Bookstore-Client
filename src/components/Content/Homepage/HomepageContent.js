import './HomepageContent.scss';
import poster from '../../../assets/image/poster.png';
import HighlightBook from './HighlightBook/HighlightBook';
import BookGroup from './BookGroup/BookGroup';
import ColumnBookGroup from './ColumnBookGroup/ColumnBookGroup';

const HomepageContent = () => {

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
                    <div className='content-left col-12 col-xl-9 pe-xxl-3'>
                        <HighlightBook
                            book_title='Best New Book'
                            backgroud_color='dark-green'
                            book_id={2}
                        />
                        <BookGroup 
                            group_title='Best Sale Book'
                            book_group_id={4}
                        />
                        <HighlightBook
                            book_title='Comic'
                            backgroud_color='red-pink'
                            book_id={3}
                        />
                        <BookGroup 
                            group_title='Science Book'
                            book_group_id={2}
                        />
                    </div>
                    <div className='content-right d-none d-xl-block col-xl-3'>
                        <ColumnBookGroup 
                            group_title='Best Sale Book In Week'
                            book_group_id={2}
                        />
                        <ColumnBookGroup 
                            group_title='New Imported Books'
                            book_group_id={3}
                        />
                        <ColumnBookGroup 
                            group_title='Best Sale Book In Week'
                            book_group_id={4}
                        />
                        <ColumnBookGroup 
                            group_title='Best Sale Book In Week'
                            book_group_id={5}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomepageContent;