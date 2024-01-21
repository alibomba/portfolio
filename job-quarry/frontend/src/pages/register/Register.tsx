import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { Link, Navigate } from 'react-router-dom';
import UserRegister from '../../components/registerForms/UserRegister';
import CompanyRegister from '../../components/registerForms/CompanyRegister';
import Loading from '../../components/loading/Loading';

import styles from './register.module.css';

const Register = () => {
    const { isAuthorized, isLoading } = useSelector((state: RootState) => state.auth);
    const [currentTab, setCurrentTab] = useState<'user' | 'company'>('user');
    const forms = { "user": <UserRegister />, "company": <CompanyRegister /> };

    useEffect(() => {
        const body = document.querySelector('body');
        if (body) {
            body.style.backgroundColor = '#D2D2D2';
            return () => {
                body.style.backgroundColor = '#FFF';
            }
        }
    }, []);

    if (isLoading) {
        return <Loading />
    }

    if (!isLoading && isAuthorized) {
        return <Navigate to='/' />
    }

    return (
        <main className={styles.main}>
            <img className={styles.main__logo} src="/logo.png" alt="logo Job Quarry" />
            <div className={styles.main__tabs}>
                <button onClick={() => setCurrentTab('user')} className={`${styles.main__tab} ${currentTab === 'user' && styles.main__tab_active}`}>Użytkownik</button>
                <button onClick={() => setCurrentTab('company')} className={`${styles.main__tab} ${currentTab === 'company' && styles.main__tab_active}`}>Firma</button>
            </div>
            {
                forms[currentTab]
            }
            <p className={styles.main__login}>Masz już konto? <Link className={styles.main__login__link} to='/logowanie'>Zaloguj się</Link></p>
        </main>
    )
}

export default Register
