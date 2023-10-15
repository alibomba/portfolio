import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';

import styles from './pagination.module.css';

interface Props {
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    lastPage: number | undefined
}

const Pagination = ({ page, setPage, lastPage }: Props) => {
    function prevPage() {
        if (page !== 1) {
            setPage(prev => prev - 1);
        }
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    function nextPage() {
        if (page !== lastPage) {
            setPage(prev => prev + 1);
        }
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <div className={styles.pagination}>
            <button title='Poprzednia strona' onClick={prevPage} disabled={page === 1} className={`${styles.pagination__button} ${page === 1 && styles.pagination__button_disabled}`}>
                <FaLongArrowAltLeft />
            </button>
            <p className={styles.pagination__text}>{page} z {lastPage}</p>
            <button title='Następna strona' onClick={nextPage} disabled={page === lastPage} className={`${styles.pagination__button} ${page === lastPage && styles.pagination__button_disabled}`}>
                <FaLongArrowAltRight />
            </button>
        </div>
    )
}

export default Pagination
