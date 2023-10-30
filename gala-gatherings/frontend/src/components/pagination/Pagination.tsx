
import { AiOutlineCaretLeft, AiOutlineCaretRight } from 'react-icons/ai';

import styles from './pagination.module.css';

interface Props {
    page: number,
    lastPage: number | undefined,
    setPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination = ({ page, lastPage, setPage }: Props) => {
    function prevPage() {
        if (page !== 0) {
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
            <button onClick={prevPage} disabled={page === 1} className={`${styles.pagination__button} ${page === 1 && styles.pagination__button_disabled}`} title='Poprzednia strona'>
                <AiOutlineCaretLeft />
            </button>
            <p className={styles.pagination__text}>{page} z {lastPage}</p>
            <button onClick={nextPage} disabled={page === lastPage} className={`${styles.pagination__button} ${page === lastPage && styles.pagination__button_disabled}`} title='Następna strona'>
                <AiOutlineCaretRight />
            </button>
        </div>
    )
}

export default Pagination
