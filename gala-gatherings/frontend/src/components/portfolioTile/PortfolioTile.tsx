import { Link } from 'react-router-dom';

import styles from './portfolioTile.module.css';
import formatDate from '../../utilities/formatDate';


interface Props {
    id: string,
    image: string,
    title: string,
    description: string,
    date: string
}

const PortfolioTile = ({ id, image, title, description, date }: Props) => {
    return (
        <article className={styles.article}>
            <Link className={styles.article__imgLink} to={`/projekt/${id}`}>
                <img className={styles.article__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/portfolio/${image}`} alt="miniatura projektu" />
            </Link>
            <div className={styles.article__data}>
                <h3 className={styles.article__title}><Link className={styles.article__title__link} to={`/projekt/${id}`}>{title}</Link></h3>
                <p className={styles.article__description}>{description.length > 140 ? `${description.slice(0, 140)}...` : description}</p>
                <p className={styles.article__date}>{formatDate(date)}</p>
            </div>
        </article>
    )
}

export default PortfolioTile
