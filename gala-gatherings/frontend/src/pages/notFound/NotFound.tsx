import { Link } from 'react-router-dom';

import styles from './notFound.module.css';

const NotFound = () => {
    return (
        <main className={styles.main}>
            <p className={styles.status}>404</p>
            <h1 className={styles.heading}>Nie znaleziono strony</h1>
            <Link to='/' className={styles.button}>Home</Link>
        </main>
    )
}

export default NotFound
