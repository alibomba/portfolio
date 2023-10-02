import { useState, useEffect } from 'react';
import { BsSearch, BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { FaFilter } from 'react-icons/fa';
import { AiOutlineSortDescending } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import Filters from '../../components/filters/Filters';
import axiosClient from '../../axiosClient';
import axios from 'axios';
import Error from '../../components/error/Error';


import styles from './wyszukiwarka.module.css';
import ProductTile from '../../components/productTile/ProductTile';

const Wyszukiwarka = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const urlTemp = new URL('https://test.com');
    if (searchParams.get('name') || searchParams.get('minPrice') || searchParams.get('maxPrice') || searchParams.get('category')) {
        urlTemp.pathname = '/products-search';
        if (searchParams.get('name')) {
            urlTemp.searchParams.set('name', searchParams.get('name') as string);
        }
        if (searchParams.get('minPrice')) {
            urlTemp.searchParams.set('minPrice', searchParams.get('minPrice') as string);
        }
        if (searchParams.get('maxPrice')) {
            urlTemp.searchParams.set('maxPrice', searchParams.get('maxPrice') as string);
        }
        if (searchParams.get('category')) {
            urlTemp.searchParams.set('category', searchParams.get('category') as string);
        }
    }
    else {
        urlTemp.pathname = '/products';
    }
    const [isFiltersModalActive, setIsFiltersModalActive] = useState<boolean>(false);
    const [products, setProducts] = useState<PaginationResponse<ProductTile> | null>(null);
    const [noResults, setNoResults] = useState<boolean>(false);
    const [url, setUrl] = useState<string>(urlTemp.toString());
    const [search, setSearch] = useState<Search>({});
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        const urlTemp = new URL(url);

        axiosClient({
            method: 'get',
            url: `${urlTemp.pathname}${urlTemp.search}`,
            cancelToken: source.token
        })
            .then(res => {
                setNoResults(false);
                if (res.data.data.length === 0) {
                    return setNoResults(true);
                }
                setProducts(res.data);
            })
            .catch(err => {
                if (err?.response?.status === 404) {
                    setNoResults(true);
                }
                else {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
            })

        return () => {
            source.cancel();
        }

    }, [url]);

    function submitSearch(e: React.FormEvent): void {
        e.preventDefault();
        setUrl(prev => {
            const urlTemp = new URL(prev);
            urlTemp.pathname = '/products-search';
            if (search.name || searchParams.get('name')) {
                urlTemp.searchParams.set('name', search.name || searchParams.get('name') as string);
            }
            else {
                urlTemp.searchParams.delete('name');
            }
            if (search.minPrice || searchParams.get('minPrice')) {
                urlTemp.searchParams.set('minPrice', search.minPrice || searchParams.get('minPrice') as string);
            }
            else {
                urlTemp.searchParams.delete('minPrice');
            }
            if (search.maxPrice || searchParams.get('maxPrice')) {
                urlTemp.searchParams.set('maxPrice', search.maxPrice || searchParams.get('maxPrice') as string);
            }
            else {
                urlTemp.searchParams.delete('maxPrice');
            }
            if (search.category || searchParams.get('category')) {
                urlTemp.searchParams.set('category', search.category || searchParams.get('category') as string);
            }
            else {
                urlTemp.searchParams.delete('category');
            }
            if (search.sort) {
                if (search.sort === 'cheap') {
                    urlTemp.searchParams.delete('sortExpensive');
                    urlTemp.searchParams.set('sortCheap', 'true');
                }
                if (search.sort === 'expensive') {
                    urlTemp.searchParams.delete('sortCheap');
                    urlTemp.searchParams.set('sortExpensive', 'true');
                }
            }
            else {
                urlTemp.searchParams.delete('sortCheap');
                urlTemp.searchParams.delete('sortExpensive');
            }
            urlTemp.searchParams.set('page', '1');
            return urlTemp.toString();
        });
    }

    function nextPage(): void {
        if (products) {
            if (products.currentPage !== products.lastPage) {
                setUrl(prev => {
                    const urlTemp = new URL(prev);
                    urlTemp.searchParams.set('page', (products.currentPage + 1).toString())

                    return urlTemp.toString();
                })
            }
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    function prevPage(): void {
        if (products) {
            if (products.currentPage !== 1) {
                setUrl(prev => {
                    const urlTemp = new URL(prev);
                    urlTemp.searchParams.set('page', (products.currentPage - 1).toString())

                    return urlTemp.toString();
                })
            }
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <main className={styles.main}>
            <form onSubmit={submitSearch} className={styles.search}>
                <div className={styles.search__top}>
                    <input onChange={(e) => setSearch(prev => { return { ...prev, name: e.target.value } })} className={styles.search__input} type="text" placeholder='Wyszukaj' aria-label='Wyszukaj' />
                    <button className={styles.search__button}>
                        <BsSearch />
                    </button>
                    <button onClick={() => setIsFiltersModalActive(true)} type='button' className={styles.search__filtersToggle}>
                        <FaFilter />
                    </button>
                </div>
                <div className={styles.search__bottom}>
                    <select onChange={(e) => setSearch(prev => { return { ...prev, sort: e.target.value as 'cheap' | 'expensive' | undefined } })} className={styles.search__select}>
                        <option value=''>Od najnowszych</option>
                        <option value="cheap">Od najtańszych</option>
                        <option value="expensive">Od nadroższych</option>
                    </select>
                    <AiOutlineSortDescending className={styles.search__sortIcon} />
                </div>
                <Filters
                    search={search}
                    setSearch={setSearch}
                    isFiltersModalActive={isFiltersModalActive}
                    setIsFiltersModalActive={setIsFiltersModalActive}
                />
            </form>
            <section className={styles.offers}>
                {
                    noResults ? <p className={styles.noResults}>Brak wyników</p> :
                        <>
                            <div className={styles.offers__grid}>
                                {
                                    products && products.data.map(product => {
                                        return (
                                            <ProductTile
                                                key={product.id}
                                                id={product.id}
                                                name={product.name}
                                                price={product.price}
                                                stock={product.stock}
                                                images={product.images}
                                                discount={product.discount}
                                            />
                                        )
                                    })
                                }
                            </div>
                            {
                                (products && products.lastPage > 1) &&
                                <div className={styles.offers__pagination}>
                                    <button onClick={prevPage} aria-disabled={products.currentPage === 1} disabled={products.currentPage === 1} className={`${styles.pagination__button} ${products.currentPage === 1 && styles.pagination__button_disabled}`}>
                                        <BsArrowLeft />
                                    </button>
                                    <div className={styles.pagination__numbers}>
                                        <p className={`${styles.pagination__number} ${styles.pagination__number_current}`}>{products.currentPage}</p>
                                        <div className={styles.pagination__line}></div>
                                        <p className={`${styles.pagination__number} ${styles.pagination__number_total}`}>{products.lastPage}</p>
                                    </div>
                                    <button onClick={nextPage} aria-disabled={products.currentPage === products.lastPage} disabled={products.currentPage === products.lastPage} className={`${styles.pagination__button} ${products.currentPage === products.lastPage && styles.pagination__button_disabled}`}>
                                        <BsArrowRight />
                                    </button>
                                </div>
                            }
                        </>
                }
            </section>
        </main>
    )
}

export default Wyszukiwarka
