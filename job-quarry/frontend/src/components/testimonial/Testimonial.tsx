


import styles from './testimonial.module.css';

const Testimonial = ({ image, fullName, position, content }: Testimonial) => {
    return (
        <article className={styles.testimonial}>
            <img className={styles.testimonial__img} src={`${import.meta.env.VITE_API_URL}/storage/testimonials/${image}`} alt={fullName} />
            <h3 className={styles.testimonial__fullname}>{fullName}</h3>
            <p className={styles.testimonial__position}>{position}</p>
            <p className={styles.testimonial__content}>{content}</p>
        </article>
    )
}

export default Testimonial
