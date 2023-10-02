
import { useState, useEffect } from 'react';
import styles from './filters.module.css';
import axiosClient from '../../axiosClient';
import axios from 'axios';
import Error from '../error/Error';
interface Props {
    search: Search;
    setSearch: React.Dispatch<React.SetStateAction<Search>>;
    isFiltersModalActive: boolean;
    setIsFiltersModalActive: React.Dispatch<React.SetStateAction<boolean>>
}

const Filters = ({ search, setSearch, isFiltersModalActive, setIsFiltersModalActive }: Props) => {
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
        <>
            <div style={{ display: isFiltersModalActive ? 'block' : 'none' }} className={styles.overlay}></div>
            <div style={{ display: isFiltersModalActive ? 'flex' : 'none' }} className={styles.filters}>
                <div className={styles.filters__row}>
                    <input min={0} onChange={(e) => { setSearch(prev => { return { ...prev, minPrice: e.target.value } }) }} value={search.minPrice && search.minPrice} className={styles.filters__input} aria-label='Cena od' placeholder='Cena od' step={0.01} type="number" />
                    <input min={0} onChange={(e) => { setSearch(prev => { return { ...prev, maxPrice: e.target.value } }) }} value={search.maxPrice && search.maxPrice} className={styles.filters__input} aria-label='Cena do' placeholder='Cena do' step={0.01} type="number" />
                    <select aria-label='Kategoria' value={search.category && search.category} onChange={(e) => { setSearch(prev => { return { ...prev, category: e.target.value } }) }} className={styles.filters__input}>
                        <option value=''>Wybierz kategorię</option>
                        {
                            categories.length > 0 &&
                            categories.map(category => {
                                return <option className={styles.filters__option} key={category.id} value={category.name.charAt(0).toUpperCase() + category.name.slice(1).toLowerCase()}>{category.name.charAt(0).toUpperCase() + category.name.slice(1).toLowerCase()}</option>
                            })
                        }
                    </select>
                </div>
                <button type='button' onClick={() => setIsFiltersModalActive(false)} className={styles.filters__button}>Zapisz</button>
            </div>
        </>
    )
}

export default Filters
