
import RateStars from '../rateStars/RateStars';

import styles from './locationTile.module.css';

interface Props {
    name: string,
    standard: number,
    image: string
}

const LocationTile = ({ name, standard, image }: Props) => {
    return (
        <article className={styles.location}>
            <header className={styles.location__header}>
                <h3 className={styles.location__name}>{name}</h3>
                <RateStars howMany={standard} />
            </header>
            <img className={styles.location__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/locations/${image}`} alt="zdjęcie lokacji" />
        </article>
    )
}

export default LocationTile
