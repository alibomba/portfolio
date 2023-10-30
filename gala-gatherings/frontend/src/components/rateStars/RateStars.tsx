import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { useEffect, useState } from 'react';


import styles from './rateStars.module.css';

interface Props {
    howMany: number;
}

const RateStars = ({ howMany }: Props) => {
    const [stars, setStars] = useState<React.ReactNode[] | undefined>(undefined);


    useEffect(() => {
        const starsTemp: React.ReactNode[] = [
            <AiOutlineStar className={styles.star} key={1} />,
            <AiOutlineStar className={styles.star} key={2} />,
            <AiOutlineStar className={styles.star} key={3} />,
            <AiOutlineStar className={styles.star} key={4} />,
            <AiOutlineStar className={styles.star} key={5} />
        ]
        for (let i = 0; i < howMany; i++) {
            starsTemp[i] = <AiFillStar key={i + 1} className={styles.star} />;
        }
        setStars(starsTemp);
    }, [howMany]);

    return (
        <div className={styles.stars}>
            {
                stars && stars.map(star => star)
            }
        </div>
    )
}

export default RateStars