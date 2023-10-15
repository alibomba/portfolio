import { useState } from 'react';
import Error from '../../components/error/Error';
import axiosClient from '../../axiosClient';

import styles from './newsletter.module.css';
import Popup from '../../components/popup/Popup';

const Newsletter = () => {
    const [validationError, setValidationError] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup>({ active: false, type: 'good', content: null });

    async function register(e: React.FormEvent): Promise<void> {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const input = form.querySelector('input') as HTMLInputElement;

        try {
            await axiosClient({
                method: 'post',
                url: '/newsletter',
                data: {
                    email: input.value
                }
            });
            form.reset();
            setValidationError(null);
            setPopup({ active: true, type: 'good', content: 'Dziękujemy' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
        } catch (err: any) {
            if (err?.response?.status === 422) {
                setValidationError(err?.response?.data?.message);
            }
            else {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <section className={styles.section}>
            <h2 className={styles.section__heading}>Śledź naszą działalność</h2>
            <p className={styles.section__subheading}>Otrzymuj powiadomienia o naszych projektach i kampaniach</p>
            <form onSubmit={register} className={styles.section__form}>
                <input required maxLength={55} type="email" className={styles.section__input} placeholder='Adres e-mail' aria-label='Adres e-mail' />
                <button className={styles.section__button}>Wyślij</button>
            </form>
            {
                validationError && <p role='alert' aria-live='assertive' className={styles.section__error}>{validationError}</p>
            }
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </section>
    )
}

export default Newsletter
