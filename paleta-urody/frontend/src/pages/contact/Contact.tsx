import { useRef, FormEvent, useState } from 'react';
import { AiFillHome, AiFillPhone, AiFillMail } from 'react-icons/ai';
import Button from '../../components/button/Button';
import axiosClient from '../../axiosClient';

import styles from './contact.module.css';

const Contact = () => {

    const [validationError, setValidationError] = useState<string | null>(null);
    const [notification, setNotification] = useState<string | null>(null);

    const showNotification = (): void => {
        setNotification('Pomyślnie wysłano wiadomość');
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    }

    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const topicRef = useRef<HTMLInputElement>(null);
    const messageRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setValidationError(null);
        const form = e.target as HTMLFormElement;
        const email: string | undefined = emailRef.current?.value;
        const phone: string | undefined = phoneRef.current?.value;
        const topic: string | undefined = topicRef.current?.value;
        const message: string | undefined = messageRef.current?.value;

        // email validation
        if (!email) {
            setValidationError('Podaj adres e-mail!');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setValidationError('Podaj poprawny adres e-mail!');
            return;
        }

        // phone validation
        if (!phone) {
            setValidationError('Podaj numer telefonu!');
            return;
        }

        if (!/^[+0-9][-0-9 ()]*[0-9]$/.test(phone)) {
            setValidationError('Podaj poprawny numer telefonu!');
            return;
        }

        // topic validation
        if (!topic) {
            setValidationError('Podaj temat!');
            return;
        }

        if (topic.length > 30) {
            setValidationError('Temat może mieć maksymalnie 30 znaków!');
            return;
        }

        // message validation
        if (!message) {
            setValidationError('Napisz wiadomość!');
            return;
        }

        if (message.length > 1500) {
            setValidationError('Wiadomość może mieć maksymalnie 1500 znaków!');
            return;
        }

        const data = {
            email,
            phone_number: phone,
            topic,
            message
        };

        axiosClient({
            method: 'post',
            url: '/contact',
            data
        })
            .then(res => {
                showNotification();
                form.reset();
            })
            .catch(err => console.log(err));

    }


    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.top}>
                <div className={styles.top__info}>
                    <div className={styles.info}>
                        <AiFillHome className={styles.info__icon} />
                        Bielsko-Biała 43-300 ul.Partyzantów, 28H
                    </div>
                    <div className={styles.info}>
                        <AiFillPhone className={styles.info__icon} />
                        +48123123123
                    </div>
                    <div className={styles.info}>
                        <AiFillMail className={styles.info__icon} />
                        paleta-urody@gmail.com
                    </div>
                </div>
                <fieldset className={styles.top__inputs}>
                    <div className={styles.inputs__container}>
                        <label htmlFor="email" className={styles.inputs__label}>Email</label>
                        <input ref={emailRef} id='email' type="text" className={styles.inputs__input} />
                    </div>
                    <div className={styles.inputs__container}>
                        <label htmlFor="phone_number" className={styles.inputs__label}>Nr telefonu</label>
                        <input ref={phoneRef} id='phone_number' type="text" className={styles.inputs__input} />
                    </div>
                    <div className={styles.inputs__container}>
                        <label htmlFor="topic" className={styles.inputs__label}>Temat</label>
                        <input ref={topicRef} id='topic' type="text" className={styles.inputs__input} />
                    </div>
                </fieldset>
            </div>
            <div className={styles.content}>
                <label htmlFor="message" className={styles.content__label}>Treść</label>
                <textarea ref={messageRef} className={styles.content__message} id="message" rows={10}></textarea>
            </div>
            {
                validationError &&
                <p className={styles.validationError}>{validationError}</p>
            }
            <Button
                backgroundColor='var(--secondary)'
                as='button'
                href=''
                className={styles.button}
            >
                Wyślij
            </Button>
            <p role='alert' aria-live={notification ? 'assertive' : 'off'} className={`${styles.notification} ${notification && styles.notification_active}`}>{notification && notification}</p>
        </form>
    )
}

export default Contact
