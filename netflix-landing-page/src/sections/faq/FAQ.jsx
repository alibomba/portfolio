import { useState } from 'react';
import Question from '../../components/question/Question';
import CTA from '../../components/cta/CTA';
import data from '../../data';

import styles from './faq.module.css';

const FAQ = () => {

    const [accordionsState, setAccordionsState] = useState([
        false,
        false,
        false,
        false,
        false,
        false
    ]);


    return (
        <section className={styles.section}>
            <h2 className={styles.section__heading}>Często zadawane pytania</h2>
            <div className={styles.section__questions}>
                {data.map((item) => {
                    return (
                        <Question
                            key={item.id}
                            id={item.id}
                            question={item.question}
                            state={accordionsState}
                            setState={setAccordionsState}
                        >
                            {item.answer.map(paragraph => <p>{paragraph}</p>)}
                        </Question>
                    );
                })}
            </div>
            <p className={styles.section__paragraph}>Zaczynamy oglądać? Wprowadź adres e‑mail, aby utworzyć lub odnowić konto.</p>
            <CTA classes={[styles.section__cta]} />
        </section>
    )
}

export default FAQ
