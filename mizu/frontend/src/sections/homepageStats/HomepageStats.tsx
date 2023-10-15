import {useEffect, useState} from 'react';

import styles from './homepageStats.module.css';

const HomepageStats = () => {
    const [background, setBackground] = useState<string>('');

    function assignBackground(){
        const width = window.innerWidth;
        if(width>905){
            setBackground(`${process.env.REACT_APP_BACKEND_URL}/storage/assets/blob-bg-stats.svg`);
        }
        else if(width < 905 && width > 680){
            setBackground(`${process.env.REACT_APP_BACKEND_URL}/storage/assets/blob-bg-stats-medium.svg`);
        }
        else if(width < 680){
            setBackground(`${process.env.REACT_APP_BACKEND_URL}/storage/assets/blob-bg-stats-small.svg`);
        }
    }

    useEffect(() => {
        assignBackground();
    }, []);

    window.onresize = assignBackground;

    return (
        <section className={styles.stats}>
            <img className={styles.stats__bg} src={background} alt="" />
            <div className={styles.stats__grid}>    
                <div className={styles.stats__group}>
                    <p className={styles.stats__number}>1 000 000</p>
                    <p className={styles.stats__text}>Posadzonych<br/>drzew</p>
                </div>
                <div className={styles.stats__group}>
                    <p className={styles.stats__number}>300</p>
                    <p className={styles.stats__text}>Edukacyjnych<br/>wydarzeń</p>
                </div>
                <div className={styles.stats__group}>
                    <p className={styles.stats__number}>750</p>
                    <p className={styles.stats__text}>Wydanych<br/>publikacji</p>
                </div>
                <div className={styles.stats__group}>
                    <p className={styles.stats__number}>430</p>
                    <p className={styles.stats__text}>Akcji<br/>czystości</p>
                </div>
                <div className={styles.stats__group}>
                    <p className={styles.stats__number}>30 000</p>
                    <p className={styles.stats__text}>Zebranych<br/>plastikowych butelek</p>
                </div>
                <div className={styles.stats__group}>
                    <p className={styles.stats__number}>600</p>
                    <p className={styles.stats__text}>Kampanii<br/>ekologicznych</p>
                </div>
            </div>
        </section>
    )
}

export default HomepageStats
