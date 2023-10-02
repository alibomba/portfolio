
import TestimonialsSlider from '../../components/testimonialsSlider/TestimonialsSlider';
import styles from './homeTestimonials.module.css';

const HomeTestimonials = () => {
    return (
        <section className={styles.section}>
            <h2 className={styles.section__heading}>Opinie klientów</h2>
            <p className={styles.section__text}>Nasza firma dąży do doskonałości, a opinie naszych klientów są naszym najlepszym odzwierciedleniem. Poznaj ich doświadczenia i przekonaj się, dlaczego warto nam zaufać.</p>
            <TestimonialsSlider />
        </section>
    )
}

export default HomeTestimonials
