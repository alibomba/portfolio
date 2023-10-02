import { useState, useEffect } from 'react';
import ProductTile from '../../components/productTile/ProductTile';
import axiosClient from '../../axiosClient';
import axios from 'axios';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

import styles from './kontoFavorites.module.css';

interface Props {
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const KontoMyFavorites = ({ setError }: Props) => {
  const [favorites, setFavorites] = useState<PaginationResponse<Favorite> | null>(null);
  const [noResults, setNoResults] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const source = axios.CancelToken.source();

    axiosClient({
      method: 'get',
      url: `/my-favorites?page=${page}`,
      cancelToken: source.token
    })
      .then(res => {
        setFavorites(res.data);
        setNoResults(false);
      })
      .catch(err => {
        if (err?.response?.status === 404 && err?.response?.data?.message === 'Brak ulubionych') {
          setNoResults(true);
        }
        else {
          setError('Coś poszło nie tak, spróbuj ponownie później...');
        }
      });

    return () => {
      source.cancel();
    }

  }, [page]);

  function prevPage(): void {
    if (favorites?.currentPage !== 1) {
      setPage(prev => prev - 1);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  function nextPage(): void {
    if (favorites?.currentPage !== favorites?.lastPage) {
      setPage(prev => prev + 1);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }


  return (
    <main className={styles.main}>
      {
        noResults === true && <p className={styles.noResults}>Brak zamówień</p>
      }
      {
        (noResults === false && favorites && favorites.data.length !== 0) &&
        <>
          <div className={styles.main__grid}>
            {
              favorites.data.map(favorite => {
                const product = favorite.product;
                return (
                  <ProductTile
                    key={product.id}
                    className={styles.main__productTile}
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
            favorites.lastPage !== 1 &&
            <div className={styles.pagination}>
              <button onClick={prevPage} aria-disabled={favorites.currentPage === 1} disabled={favorites.currentPage === 1} className={`${styles.pagination__button} ${favorites.currentPage === 1 && styles.pagination__button_disabled}`}>
                <BsArrowLeft />
              </button>
              <div className={styles.pagination__numbers}>
                <p className={`${styles.pagination__number} ${styles.pagination__number_current}`}>{favorites.currentPage}</p>
                <div className={styles.pagination__line}></div>
                <p className={`${styles.pagination__number} ${styles.pagination__number_total}`}>{favorites.lastPage}</p>
              </div>
              <button onClick={nextPage} aria-disabled={favorites.currentPage === favorites.lastPage} disabled={favorites.currentPage === favorites.lastPage} className={`${styles.pagination__button} ${favorites.currentPage === favorites.lastPage && styles.pagination__button_disabled}`}>
                <BsArrowRight />
              </button>
            </div>
          }
        </>
      }
    </main>
  )
}

export default KontoMyFavorites
