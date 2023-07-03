import { useEffect, useState, FormEvent } from 'react';
import Button from '../../components/button/Button';
import styles from './messages.module.css';
import axiosClient from '../../axiosClient';
import axios from 'axios';

const Messages = () => {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [notification, setNotification] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: '/email',
            cancelToken: source.token
        })
            .then(res => {
                setEmail(res.data.email);
            })
            .catch(err => console.error(err));

        return () => {
            source.cancel();
        }
    }, []);

    const changeEmail = (e: FormEvent<HTMLFormElement>) => {
        setNotification(null);
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const emailInput = form.querySelector('#email') as HTMLInputElement;
        axiosClient({
            method: 'post',
            url: '/email',
            data: {
                email: emailInput?.value
            }
        })
            .then(res => {
                setNotification(res.data.message);
                setTimeout(() => setNotification(null), 5000);
                setError(null);
                setEmail(emailInput?.value);
            })
            .catch(err => {
                if (err?.response.status === 422) {
                    setError(err.response.data.message);
                }
                else {
                    console.error(err);
                }
            });
    }

    return (
        <main className={styles.main}>
            <form onSubmit={changeEmail} className={styles.main__form}>
                <label htmlFor="email" className={styles.form__label}>Docelowy adres e-mail</label>
                <input id='email' type="text" className={styles.form__input} placeholder={email} />
                {error && <p className={styles.form__error}>{error}</p>}
                {notification && <p className={styles.form__notification}>{notification}</p>}
                <Button
                    backgroundColor='var(--secondary)'
                    as='button'
                    href=''
                    className={styles.form__button}
                >
                    Zapisz
                </Button>
            </form>
        </main>
    )
}

export default Messages
