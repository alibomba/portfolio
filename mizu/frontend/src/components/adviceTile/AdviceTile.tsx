

import styles from './adviceTile.module.css';

interface Props {
    heading: string;
    content: string;
    color: 'primary' | 'secondary'
}

const AdviceTile = ({ heading, content, color }: Props) => {
    return (
        <article style={{ backgroundColor: `var(--${color})` }} className={styles.advice}>
            <h2 className={styles.advice__heading}>{heading}</h2>
            <p className={styles.advice__text}>{content}</p>
        </article>
    )
}

export default AdviceTile
