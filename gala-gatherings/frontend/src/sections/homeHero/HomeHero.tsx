import { useState } from 'react';
import { Link } from 'react-router-dom';


import styles from './homeHero.module.css';

const HomeHero = () => {
    const [heroImgNumber, setHeroImgNumber] = useState<1 | 2 | 3>(1);

    return (
        <section style={{ backgroundImage: `url('${process.env.REACT_APP_BACKEND_URL}/storage/assets/hero-${heroImgNumber}.webp')` }} className={styles.hero}>
            <h2 className={styles.hero__heading}>Tworzymy<br />Niezapomniane Chwile</h2>
            <p className={styles.hero__text}>Tworzymy niezapomniane chwile. GalaGatherings to firma, która zamienia zwykłe wydarzenia w wyjątkowe przeżycia, pełne emocji i piękna. Razem z nami tworzysz wspomnienia, które zostaną na zawsze.</p>
            <Link to='/cennik' className={styles.hero__button}>Zobacz ofertę</Link>
            <div className={styles.hero__slider}>
                <button onClick={() => setHeroImgNumber(1)} className={`${styles.hero__sliderButton} ${heroImgNumber === 1 && styles.hero__sliderButton_active}`} title='Pierwsze zdjęcie'></button>
                <button onClick={() => setHeroImgNumber(2)} className={`${styles.hero__sliderButton} ${heroImgNumber === 2 && styles.hero__sliderButton_active}`} title='Drugie zdjęcie'></button>
                <button onClick={() => setHeroImgNumber(3)} className={`${styles.hero__sliderButton} ${heroImgNumber === 3 && styles.hero__sliderButton_active}`} title='Trzecie zdjęcie'></button>
            </div>
        </section>
    )
}

export default HomeHero
