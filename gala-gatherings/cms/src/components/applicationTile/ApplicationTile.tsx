

import { Link } from 'react-router-dom';

import styles from './applicationTile.module.css';

interface Props {
    id: string,
    author: string,
    position: string
}

const ApplicationTile = ({ id, author, position }: Props) => {
    return (
        <article className={styles.application}>
            <div className={styles.application__text}>
                <h3 className={styles.application__author}>{author}</h3>
                <p className={styles.application__position}>{position}</p>
            </div>
            <Link to={`/aplikacje/${id}`} className={styles.application__link}>Zobacz więcej</Link>
        </article>
    )
}

export default ApplicationTile
