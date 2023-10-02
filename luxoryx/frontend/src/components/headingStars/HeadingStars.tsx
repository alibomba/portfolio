
import { AiOutlineStar } from 'react-icons/ai';
import styles from './headingStars.module.css';

const HeadingStars = () => {
    return (
        <div className={styles.stars}>
            <AiOutlineStar className={styles.star} />
            <AiOutlineStar className={styles.star} />
            <AiOutlineStar className={styles.star} />
        </div>
    )
}

export default HeadingStars
