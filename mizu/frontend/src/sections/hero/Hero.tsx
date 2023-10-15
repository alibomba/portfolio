import { Link } from 'react-router-dom';

import styles from './hero.module.css';

const Hero = () => {
    return (
        <section style={{ backgroundImage: `url('${process.env.REACT_APP_BACKEND_URL}/storage/assets/hero-img.webp')` }} className={styles.hero}>
            <div className={styles.hero__bg}></div>
            <h2 className={styles.hero__heading}>Nasza misja</h2>
            <p className={styles.hero__text}>Nasza misja to ochrona środowiska dla przyszłych pokoleń. Działamy, by stworzyć zrównoważoną i ekologiczną przyszłość. Dołącz do nas w naszym walce o lepszy świat.</p>
            <Link className={styles.hero__button} to='/wesprzyj'>Wesprzyj</Link>
        </section>
    )
}

export default Hero
