import { FC } from 'react';

import styles from './postHeader.module.css';
import getPostDate from '../../components/getPostDate';

interface Props {
    postedAt: string;
    thumbnail: string;
    title: string;
    children: string;
}

const PostHeader: FC<Props> = ({ postedAt, thumbnail, title, children }) => {
    return (
        <header className={styles.header}>
            <img className={styles.header__img} src={thumbnail} alt="miniatura bloga" />
            <div className={styles.header__right}>
                <h1 className={styles.header__heading}>{title}</h1>
                <p className={styles.header__description}>{children}</p>
                <p className={styles.header__date}>{getPostDate(new Date(postedAt))}</p>
            </div>
        </header>
    )
}

export default PostHeader
