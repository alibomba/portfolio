import { useState } from 'react';
import data from './data';
import { IoMdClose } from 'react-icons/io';

import styles from './howItWorks.module.css';

const HowItWorks = () => {
    const [stepActive, setStepActive] = useState<number | null>(null);

    return (
        <section className={styles.section}>
            <h2 className={styles.section__heading}>Jak to działa</h2>
            <div className={styles.section__row}>
                {
                    data.map((__, index) => {
                        return <button key={index} className={styles.section__button} onClick={() => setStepActive(index)}>{index + 1}</button>
                    })
                }
            </div>
            {
                stepActive !== null &&
                <div className={styles.section__modal}>
                    <p className={styles.modal__heading}>{data[stepActive].heading}</p>
                    <p className={styles.modal__content}>{data[stepActive].content}</p>
                    <button onClick={() => setStepActive(null)} title='Zamknij okienko' className={styles.modal__button}>
                        <IoMdClose />
                    </button>
                </div>
            }
        </section>
    )
}

export default HowItWorks
