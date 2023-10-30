
import { BiSolidQuoteRight } from 'react-icons/bi';

import styles from './testimonial.module.css';

interface Props {
    image: string;
    firstName: string;
    lastName: string;
    children: string;
}

const Testimonial = ({ image, firstName, lastName, children }: Props) => {
    return (
        <article className={styles.testimonial}>
            <img className={styles.testimonial__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/assets/testimonials/${image}`} alt={`${firstName} ${lastName}`} />
            <h3 className={styles.testimonial__author}>{firstName} <br /> {lastName}</h3>
            <BiSolidQuoteRight className={styles.testimonial__icon} aria-label='ikona cudzysłowu' />
            <p className={styles.testimonial__text}>{children}</p>
        </article>
    )
}

export default Testimonial
