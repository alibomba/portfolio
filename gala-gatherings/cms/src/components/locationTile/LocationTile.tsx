import { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import Error from '../error/Error';

import styles from './locationTile.module.css';

interface Props extends LocationDB {
    setLocations: React.Dispatch<React.SetStateAction<LocationDB[]>>;
}

const LocationTile = ({ id, image, name, standard, setLocations }: Props) => {
    const [error, setError] = useState<string | null>(null);

    async function deleteLocation() {
        const confirmation = window.confirm('Czy na pewno chcesz usunąć lokację?');
        if (confirmation) {
            try {
                await axiosClient({
                    method: 'delete',
                    url: `/locations/${id}`
                });
                setLocations(prev => {
                    const newValue = prev.filter(item => item.id !== id);
                    return newValue;
                });
            } catch (err) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <article className={styles.location}>
            <div className={styles.location__text}>
                <h3 className={styles.location__name}>{name}</h3>
                <p className={styles.location__standard}>Gwiazdek: {standard}</p>
            </div>
            <img className={styles.location__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/locations/${image}`} alt="miniatura lokacji" />
            <Link to={`/lokacje/${id}`} className={`${styles.location__button} ${styles.location__edit}`}>
                <MdEdit />
            </Link>
            <button onClick={deleteLocation} className={`${styles.location__button} ${styles.location__delete}`}>
                <AiFillDelete />
            </button>
        </article>
    )
}

export default LocationTile
