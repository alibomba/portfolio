import {FaHandshake} from 'react-icons/fa6';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './success.module.css';

const Success = () => {

    useEffect(() => {
        document.body.classList.add(styles.body);
        return () => {
            document.body.classList.remove(styles.body);
        }
    }, []);

  return (
    <main className={styles.main}>
        <h1 className={styles.heading}>Dziękujemy za zakupy w naszym sklepie</h1>
        <FaHandshake className={styles.icon} />
        <Link to='/' className={styles.button}>Strona główna</Link>
    </main>
  )
}

export default Success
