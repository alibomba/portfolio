import { Link } from 'react-router-dom';

import styles from './notFound.module.css';

const NotFound = () => {
    return (
        <main className={styles.main}>
            <p className={styles.status}><span>4</span><span>0</span><span>4</span></p>
            <h1 className={styles.heading}>Nie znaleziono strony</h1>
            <p className={styles.subheading}>Upewnij się, że adres jest poprawny i spróbuj ponownie</p>
            <Link to='/' className={styles.button}>Strona główna</Link>
        </main>
    )
}

export default NotFound
