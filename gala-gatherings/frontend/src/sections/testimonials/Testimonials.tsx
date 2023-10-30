
import Testimonial from '../../components/testimonial/Testimonial';
import styles from './testimonials.module.css';

interface Props {
    heading: string;
}

const Testimonials = ({ heading }: Props) => {
    return (
        <section className={styles.testimonials}>
            <h2 className={styles.testimonials__heading}>{heading}</h2>
            <div className={styles.testimonials__row}>
                <Testimonial image='adam-nowak.webp' firstName='Adam' lastName='Nowak'>
                    Nasz ślub był absolutnie magiczny, dzięki GalaGatherings. Ich dbałość o najmniejsze detale i wyjątkowy gust sprawiły, że to był dzień, o którym zawsze marzyliśmy.
                </Testimonial>
                <Testimonial image='natalia-wierzbicka.webp' firstName='Natalia' lastName='Wierzbicka'>
                    GalaGatherings zorganizowało dla nas firmową imprezę, która przerosła nasze oczekiwania. Profesjonalizm, kreatywność i zaangażowanie w każdym detalu. Polecamy!
                </Testimonial>
                <Testimonial image='anna-pietrzyk.webp' firstName='Anna' lastName='Pietrzyk'>
                    Nigdy nie byłam bardziej zrelaksowana na swoim urodzinowym przyjęciu. GalaGatherings zadbało o wszystko, od dekoracji po obsługę kelnerską.
                </Testimonial>
            </div>
        </section>
    )
}

export default Testimonials
