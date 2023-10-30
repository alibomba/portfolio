

import { Link } from 'react-router-dom';

import styles from './messageTile.module.css';


interface Props {
    id: string,
    author: string,
    subject: string,
    opened: boolean
}

const MessageTile = ({ id, author, subject, opened }: Props) => {
    return (
        <article className={`${styles.message} ${!opened && styles.message_unread}`}>
            <div className={styles.message__text}>
                <h3 className={styles.message__author}>{author}</h3>
                <p className={styles.message__subject}>{subject}</p>
            </div>
            <Link to={`/wiadomosci/${id}`} className={styles.message__link}>Otwórz</Link>
        </article>
    )
}

export default MessageTile
