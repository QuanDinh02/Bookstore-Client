import StarRating from "../StarRatings/StarRating";
import userImage from '../../../assets/image/user.png';

const BookReview = (props) => {

    const { image, title, rate, commentor_name, content, time } = props;

    return (
        <div key={`commentor-${commentor_name}`}className='comment-container d-flex mt-3 gap-3 pb-3'>
            <div className='commentor-image'>
                <img src={image ? `data:image/jpeg;base64,${image}`: userImage} alt='' />
            </div>
            <div className='main'>
                <div className='comment-title'>
                    <span>{title}</span>
                </div>
                <div className='comment-rate'>
                    <StarRating rate={+rate}/>
                </div>
                <div className='commentor-name mt-2'>
                    By <span className="user-name">{commentor_name}</span> {time}
                </div>
                <div className='comment-content mt-2'>
                    <span>{content}</span>
                </div>
                <div className='product-review'>

                </div>
            </div>
        </div>
    )
}

export default BookReview;