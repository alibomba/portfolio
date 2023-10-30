import { useState } from 'react';
import Error from '../error/Error';
import { MdEdit } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axiosClient from '../../axiosClient';

import styles from './serviceTile.module.css';

interface Props {
    id: string;
    title: string;
    price: string;
    image: string;
    setServices: React.Dispatch<React.SetStateAction<Service[]>>;
}

const ServiceTile = ({ id, title, price, image, setServices }: Props) => {
    const [error, setError] = useState<string | null>(null);

    async function deleteService() {
        const confirmation = window.confirm('Czy na pewno chcesz usunąć usługę?');
        if (confirmation) {
            try {
                await axiosClient({
                    method: 'delete',
                    url: `/services/${id}`
                });
                setServices(prev => {
                    const newValue = prev.filter(item => item.id !== id);
                    return newValue;
                })
            } catch (err) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <article className={styles.service}>
            <div className={styles.service__data}>
                <h3 className={styles.service__name}>{title}</h3>
                <p className={styles.service__price}>{price} PLN</p>
            </div>
            <img className={styles.service__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/services/${image}`} alt="obraz usługi" />
            <Link to={`/uslugi/${id}`} className={`${styles.service__button} ${styles.service__edit}`}>
                <MdEdit />
            </Link>
            <button onClick={deleteService} className={`${styles.service__button} ${styles.service__delete}`}>
                <AiFillDelete />
            </button>
        </article>
    )
}

export default ServiceTile
