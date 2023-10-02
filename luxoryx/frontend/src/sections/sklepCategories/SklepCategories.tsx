import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './sklepCategories.module.css';
import axiosClient from '../../axiosClient';
import axios from 'axios';
import Error from '../../components/error/Error';

interface Category {
    id: string;
    name: string;
    image: string;
}

const SklepCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: '/categories',
            cancelToken: source.token
        })
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'))

        return () => {
            source.cancel();
        }

    }, []);

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <section className={styles.categories}>
            <h2 className={styles.categories__heading}>Kategorie</h2>
            <div className={styles.categories__row}>
                {
                    categories.length > 0 &&
                    categories.map(category => {
                        return (
                            <Link key={category.id} className={styles.category} to={`/wyszukiwarka?category=${category.name}`}>
                                <img className={styles.category__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/categories/${category.image}`} alt="obraz kategorii" />
                                <p className={styles.category__name}>{category.name}</p>
                            </Link>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default SklepCategories
