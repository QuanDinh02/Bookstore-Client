import { useState } from "react";
import { IoIosStar } from "react-icons/io";
import './StarRating.scss';

const StarRating = (props) => {

    const { rate, size, onClickStar } = props;
    const [ratings, setRatings] = useState(0);

    const handleStarRatings = (index) => {
        setRatings(index + 1);
    }

    return (
        <>
            {!onClickStar ?
                <>
                    {rate > 0 &&
                        [...Array(rate)].map((item, index) => {
                            return (
                                <IoIosStar key={`star-${index}`} className={`star ${size}`} />
                            )
                        })
                    }

                    {(rate === 0 || (rate < 5 && rate > 0)) &&
                        [...Array(5 - rate)].map((item, index) => {
                            return (
                                <IoIosStar key={`no-star-${index}`} className={`no-star ${size}`} />
                            )
                        })
                    }
                </>
                :
                <>
                    {
                        [...Array(5)].map((item, index) => {
                            if (index < ratings) {
                                return (
                                    <IoIosStar
                                        key={`star-onClick-${index}`}
                                        className={`star onClick ${size}`}
                                        onClick={() => handleStarRatings(index)}
                                    />
                                )
                            }
                            return (
                                <IoIosStar
                                    key={`no-star-onClick-${index}`}
                                    className={`no-star onClick ${size}`}
                                    onClick={() => handleStarRatings(index)}
                                />
                            )
                        })
                    }
                </>
            }

        </>
    )
}

export default StarRating;