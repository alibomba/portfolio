import { FC } from 'react';
import { Link } from 'react-router-dom';
import getPostDate from '../getPostDate';

import styles from './postTile.module.css';

interface Props {
    id: number;
    postedAt: string;
    thumbnail: string;
    title: string;
    children: string;
}

const PostTile: FC<Props> = ({ id, postedAt, thumbnail, title, children }) => {
    return (
        <article className={styles.post}>
            <p className={styles.post__date}>{getPostDate(new Date(postedAt))}</p>
            <img src={thumbnail} alt="miniatura posta" className={styles.post__img} />
            <h3 className={styles.post__title}>
                <Link to={`/blog/${id}`} className={styles.post__link}>{title}</Link>
            </h3>
            <p className={styles.post__description}>
                {
                    children.length > 150 ? children.slice(0, 150) + '...'
                        : children
                }
            </p>
        </article>
    )
    // jezeli opis ma wiecej niz 150 znakow to utnij pierwsze 150 i dodaj ...
}

export default PostTile
