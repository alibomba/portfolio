

import { BiSolidRightArrow, BiSolidLeftArrow } from 'react-icons/bi';
import styles from './pagination.module.css';

interface Props {
    lastPage: number,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination = ({ lastPage, page, setPage }: Props) => {
    const getPageNumbers = (): (number | '...')[] => {
        const pageNumbers: (number | '...')[] = [];
        const maxVisiblePages = 3;

        if (lastPage <= maxVisiblePages) {
            for (let i = 1; i <= lastPage; i++) {
                pageNumbers.push(i);
            }
        } else {
            const start = Math.max(1, page - Math.floor(maxVisiblePages / 2));
            const end = Math.min(lastPage, start + maxVisiblePages - 1);

            if (start > 1) {
                pageNumbers.push(1, '...');
            }

            for (let i = start; i <= end; i++) {
                pageNumbers.push(i);
            }

            if (end < lastPage) {
                pageNumbers.push('...', lastPage);
            }
        }

        return pageNumbers;
    };

    const handlePageClick = (pageNumber: number | '...') => {
        if (pageNumber !== '...') {
            setPage(pageNumber as number);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    function previousPage() {
        setPage(prev => prev - 1);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    function nextPage() {
        setPage(prev => prev + 1);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <div className={styles.pagination}>
            <button onClick={previousPage} title='Poprzednia strona' disabled={page === 1} className={`${styles.pagination__button} ${page === 1 && styles.pagination__button_disabled}`}>
                <BiSolidLeftArrow />
            </button>
            {getPageNumbers().map((pageNumber, index) => (
                <button
                    className={`${styles.pagination__number} ${pageNumber === page && styles.pagination__number_active}`}
                    key={index}
                    onClick={() => handlePageClick(pageNumber)}
                    style={{
                        cursor: pageNumber === '...' ? 'default' : 'pointer',
                    }}
                >
                    {pageNumber}
                </button>
            ))}
            <button onClick={nextPage} title='Następna strona' disabled={page === lastPage} className={`${styles.pagination__button} ${page === lastPage && styles.pagination__button_disabled}`}>
                <BiSolidRightArrow />
            </button>
        </div>
    );
}

export default Pagination
