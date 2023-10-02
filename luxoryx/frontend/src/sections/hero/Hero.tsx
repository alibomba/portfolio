
import { Link } from 'react-router-dom';
import styles from './hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.hero__content}>
                <h2 className={styles.hero__heading}>Twój Styl, Twoja Biżuteria</h2>
                <p className={styles.hero__text}>Nasza biżuteria i zegarki to wyjątkowe dzieła sztuki, które dodają niepowtarzalnego blasku Twojemu stylowi. Zanurz się w świecie elegancji i odkryj naszą kolekcję już teraz.</p>
                <Link className={styles.hero__button} to='/sklep'>Zobacz ofertę</Link>
            </div>
            <img className={styles.hero__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/assets/hero-watch.png`} alt="złoty zegarek" />
        </section>
    )
}

export default Hero
