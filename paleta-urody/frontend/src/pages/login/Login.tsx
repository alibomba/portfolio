import { useContext, useState, FormEvent } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import axiosClient from '../../axiosClient';
import Button from '../../components/button/Button';
import styles from './login.module.css';
import { Navigate } from 'react-router-dom';

const Login = () => {
    const auth = useContext(AuthContext);
    const [validationError, setValidationError] = useState<string | null>(null);

    if (auth?.isLoggedIn === null) {
        return <img src="/img/loading.gif" alt="loading" style={{ display: 'block', margin: '0 auto' }} />
    }
    else if (auth?.isLoggedIn === true) {
        return <Navigate to='/admin/wiadomosci' />
    }

    const login = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const loginInput = form.querySelector('#login') as HTMLInputElement;
        const passwordInput = form.querySelector('#password') as HTMLInputElement;

        const data = {
            login: loginInput?.value,
            password: passwordInput?.value
        };

        axiosClient({
            method: 'post',
            url: '/login',
            data
        })
            .then(res => {
                localStorage.setItem('token', res.data.token);
                auth?.setIsLoggedIn(true);
                return <Navigate to='/admin/wiadomosci' />
            })
            .catch(err => {
                if (err?.response.status === 401) {
                    setValidationError(err.response.data.error);
                }
            });
    }


    return (
        <form onSubmit={login} className={styles.form}>
            <div className={styles.inputContainer}>
                <label htmlFor="login" className={styles.form__label}>Login</label>
                <input id='login' type="text" className={styles.form__input} />
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="password" className={styles.form__label}>Hasło</label>
                <input id='password' type="password" className={styles.form__input} />
            </div>
            <p className={styles.form__error}>{validationError && validationError}</p>
            <Button
                backgroundColor='var(--secondary)'
                as='button'
                href=''
                className={styles.form__button}
            >
                Zaloguj się
            </Button>
        </form>
    )
}

export default Login
