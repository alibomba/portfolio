import { useState } from 'react';

import { FaPlus, FaMinus } from 'react-icons/fa';
import styles from './skillAccordion.module.css';
import formatDate from '../../utils/formatDate';

interface Props {
    experience: Experience
}

const SkillAccordion = ({ experience: { title, company, startDate, endDate, description } }: Props) => {
    const [isActive, setIsActive] = useState<boolean>(false);

    return (
        <article className={`${styles.accordion} ${isActive && styles.accordion_active}`}>
            <div onClick={() => setIsActive(prev => !prev)} role='button' className={styles.accordion__header}>
                <h3 className={styles.accordion__title}>{title}</h3>
                {
                    isActive ? <FaMinus className={styles.accordion__icon} /> : <FaPlus className={styles.accordion__icon} />
                }

            </div>
            <div className={styles.accordion__content}>
                <p className={styles.accordion__subtitle}>{company}</p>
                <p className={styles.accordion__subtitle}>Start: {formatDate(startDate)}</p>
                {
                    endDate && <p className={styles.accordion__subtitle}>Koniec: {formatDate(endDate)}</p>
                }
                <p className={styles.accordion__text}>{description}</p>
            </div>
        </article>
    )
}

export default SkillAccordion
