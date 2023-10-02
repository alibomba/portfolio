

import styles from './testimonial.module.css';

interface Props {
    scrollX: number;
    imgUrl: string;
    text: string;
    author: string;
}

const Testimonial = ({ imgUrl, text, author, scrollX }: Props) => {
    return (
        <article style={{ transform: `translateX(-${scrollX}em)` }} className={styles.testimonial}>
            <img className={styles.testimonial__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/assets/testimonials/${imgUrl}`} alt={author} />
            <p className={styles.testimonial__text}>{text}</p>
            <p className={styles.testimonial__author}>{author}</p>
        </article>
    )
}

export default Testimonial
