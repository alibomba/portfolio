

import { Link } from 'react-router-dom';
import styles from './myApplicationCompany.module.css';

interface Props {
    application: MyApplicationCompany;
}

const MyApplicationCompany = ({ application: { _id, name, surname, email, offer: { title } } }: Props) => {
    return (
        <article className={styles.application}>
            <h3 className={styles.application__name}>{name} {surname}</h3>
            <p className={styles.application__email}>{email}</p>
            <p className={styles.application__offerTitle}>{title}</p>
            <Link className={styles.application__button} to={`/aplikacja/${_id}`}>Zobacz szczegóły</Link>
        </article>
    )
}

export default MyApplicationCompany
