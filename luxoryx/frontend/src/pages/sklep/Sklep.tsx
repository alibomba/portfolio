import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { FaFilter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { SklepCategories, OffersSection } from '../../sections';
import Filters from '../../components/filters/Filters';
import styles from './sklep.module.css';

const Sklep = () => {
    const [search, setSearch] = useState<Search>({});
    const [isFiltersModalActive, setIsFiltersModalActive] = useState<boolean>(false);
    const navigate = useNavigate();

    function submitSearch(e: React.FormEvent): void {
        e.preventDefault();
        const url = new URL(`${process.env.REACT_APP_URL}/wyszukiwarka`);
        if (search.name) {
            url.searchParams.set('name', search.name);
        }
        if (search.minPrice) {
            url.searchParams.set('minPrice', search.minPrice);
        }
        if (search.maxPrice) {
            url.searchParams.set('maxPrice', search.maxPrice);
        }
        if (search.category) {
            url.searchParams.set('category', search.category);
        }
        navigate(url.pathname + url.search);
    }

    return (
        <main className={styles.main}>
            <form onSubmit={submitSearch} className={styles.search}>
                <input className={styles.search__input} type="text" placeholder='Wyszukaj' aria-label='Wyszukaj' />
                <button className={styles.search__button}>
                    <BsSearch />
                </button>
                <button onClick={() => setIsFiltersModalActive(true)} type='button' className={styles.search__filtersToggle}>
                    <FaFilter />
                </button>
            </form>
            <SklepCategories />
            <OffersSection
                heading='Zyskujące popularność'
                offersCondition='popular'
            />
            <OffersSection
                heading='Najnowsze'
                offersCondition='new'
            />
            <Filters search={search} setSearch={setSearch} isFiltersModalActive={isFiltersModalActive} setIsFiltersModalActive={setIsFiltersModalActive} />
        </main>
    )
}

export default Sklep
