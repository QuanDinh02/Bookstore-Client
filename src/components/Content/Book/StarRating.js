import { IoIosStar } from "react-icons/io";

const StarRating = (props) => {

    const { rate } = props;
    return (
        <>
            {rate && rate > 0 &&
                [...Array(rate)].map(item => {
                    return (
                        <IoIosStar className='star' />
                    )
                })
            }
            {rate < 5 && rate > 0 &&
                [...Array(5 - rate)].map(item => {
                    return (
                        <IoIosStar/>
                    )
                })
            }
        </>
    )
}

export default StarRating;