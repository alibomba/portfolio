
import { ReactNode } from 'react';
import styles from './testimonial.module.css';

interface Props {
    author: string;
    profilePicture: string,
    children: ReactNode
}

const Testimonial = ({ author, profilePicture, children }: Props) => {
    return (
        <article className={styles.testimonial}>
            <p className={styles.testimonial__content}>{children}</p>
            <div className={styles.testimonial__bottom}>
                <img src={`img/testimonials/${profilePicture}`} alt={author} className={styles.testimonial__pfp} />
                <p className={styles.testimonial__author}>{author}</p>
            </div>
        </article>
    )
}

export default Testimonial
