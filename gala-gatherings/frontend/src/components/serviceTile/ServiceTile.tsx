

import styles from './serviceTile.module.css';

interface Props {
    image: string
    title: string;
    children: string;
    price: string;
}

const ServiceTile = ({ image, title, children, price }: Props) => {
    return (
        <article style={{ backgroundImage: `url('${process.env.REACT_APP_BACKEND_URL}/storage/services/${image}')` }} className={styles.service}>
            <h3 className={styles.service__title}>{title}</h3>
            <p className={styles.service__description}>{children}</p>
            <p className={styles.service__price}>{price} PLN</p>
        </article>
    )
}

export default ServiceTile
