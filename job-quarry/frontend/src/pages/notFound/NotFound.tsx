import { Link } from 'react-router-dom';


import styles from './notFound.module.css';

const NotFound = () => {
    return (
        <div className={styles.main}>
            <p className={styles.main__status}>404</p>
            <Link to='/' className={styles.main__button}>Strona Główna</Link>
        </div>
    )
}

export default NotFound
