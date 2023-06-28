
import styles from './whyUs.module.css';

const WhyUs = () => {
    return (
        <section className={styles.whyUs}>
            <div className={styles.whyUs__left}>
                <h2 className={styles.whyUs__heading}>Dlaczego my</h2>
                <p className={styles.whyUs__text}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa dolore nulla harum explicabo sunt fugiat beatae itaque suscipit id ducimus provident placeat, numquam expedita reprehenderit nesciunt eveniet quo tempore distinctio.</p>
            </div>
            <img src="img/dlaczego-my.jpg" alt="kobieca dłoń z polamowanymi paznokciami" className={styles.whyUs__img} />
        </section>
    )
}

export default WhyUs
