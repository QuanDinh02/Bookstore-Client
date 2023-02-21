import './HomepageContent.scss';

const HomepageContent = () => {
    return (
        <div className="homepage-content-container container">
            <div className="d-flex">
                <div className="col-3">

                </div>
                <div className="poster col-9 green">
                    <div className='poster-top'>
                        <div className='poster-top-left blue'>
                            Poster Top Left
                        </div>
                        <div className='poster-top-right tomato'>
                            Poster Top Right
                        </div>
                    </div>
                    <div className='poster-bottom gray'>
                        <div className='poster-bottom-left'>
                            <div className='first blue'>
                                Poster Bottom Left
                            </div>
                            <div className='second red'>
                                Poster Bottom Middle
                            </div>
                        </div>

                        <div className='poster-bottom-right green'>
                            Poster Bottom Right
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default HomepageContent;