

import { useEffect } from 'react';
import styles from './service.module.css';

const Service = ({ heading, description, textFirst, children }) => {
    useEffect(() => {
        const videos = document.querySelectorAll('video');
        videos.forEach((video) => video.play());
    }, [])

    return (
        <section className={styles.section}>
            {textFirst || children}
            <div className={styles.section__first}>
                <h2 className={styles.section__heading}>{heading}</h2>
                <p className={styles.section__text}>{description}</p>
            </div>
            {textFirst && children}
        </section>
    )
}

export default Service
