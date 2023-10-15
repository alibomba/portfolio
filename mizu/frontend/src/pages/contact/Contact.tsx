import { useState } from 'react';
import { BsFacebook, BsYoutube, BsInstagram } from 'react-icons/bs';
import { FaSquareXTwitter } from 'react-icons/fa6';
import Error from '../../components/error/Error';
import Popup from '../../components/popup/Popup';
import axiosClient from '../../axiosClient';

import styles from './contact.module.css';

const Contact = () => {
    const [validationError, setValidationError] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup>({ active: false, type: 'good', content: null });

    async function sendMessage(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const fullName = form.querySelector('#fullName') as HTMLInputElement;
        const email = form.querySelector('#email') as HTMLInputElement;
        const phoneNumber = form.querySelector('#phoneNumber') as HTMLInputElement;
        const subject = form.querySelector('#subject') as HTMLSelectElement;
        const content = form.querySelector('#content') as HTMLTextAreaElement;

        try {
            await axiosClient({
                method: 'post',
                url: '/contact',
                data: {
                    fullName: fullName.value,
                    email: email.value,
                    phoneNumber: phoneNumber.value,
                    subject: subject.value,
                    content: content.value
                }
            });
            form.reset();
            setValidationError(null);
            setPopup({ content: 'Wysłano wiadomość', active: true, type: 'good' });
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
        <main className={styles.main}>
            <header className={styles.main__header}>
                <h1 className={styles.header__heading}>Skontaktuj się z nami</h1>
                <p className={styles.header__text}>Jesteśmy dostępni dla Ciebie. Jeśli masz pytania, sugestie lub chcesz się z nami skontaktować w sprawie współpracy lub wolontariatu, prosimy o kontakt.</p>
            </header>
            <main className={styles.main__main}>
                <form onSubmit={sendMessage} className={styles.main__form}>
                    <div className={styles.form__grid}>
                        <input id='fullName' required maxLength={255} aria-label='Imię i nazwisko' className={styles.form__input} type="text" placeholder='Imię i nazwisko' />
                        <input id='email' required maxLength={55} aria-label='E-mail' type="email" className={styles.form__input} placeholder='E-mail' />
                        <input id='phoneNumber' required maxLength={30} aria-label='Numer telefonu' className={styles.form__input} type="text" placeholder='Nr telefonu' />
                        <select id='subject' required defaultValue={''} aria-label='Temat' className={styles.form__input}>
                            <option value="">Temat</option>
                            <option value="Zapytanie ogólne">Zapytanie ogólne</option>
                            <option value="Propozycja współpracy">Propozycja współpracy</option>
                            <option value="Zgłoszenie zanieczyszczenia środowiska">Zgłoszenie zanieczyszczenia środowiska</option>
                            <option value="Informacje dotyczące wolontariatu">Informacje dotyczące wolontariatu</option>
                            <option value="Pytania dotyczące projektów organizacji">Pytania dotyczące projektów organizacji</option>
                            <option value="Prośba o informacje na temat edukacji ekologicznej">Prośba o informacje na temat edukacji ekologicznej</option>
                            <option value="Skarga">Skarga</option>
                            <option value="Inne">Inne</option>
                        </select>
                    </div>
                    <textarea id='content' required maxLength={700} aria-label='Treść' placeholder='Treść' className={styles.form__textarea} cols={30} rows={10}></textarea>
                    {
                        validationError && <p role='alert' aria-live='assertive' className={styles.form__error}>{validationError}</p>
                    }
                    <button className={styles.form__button}>Wyślij</button>
                </form>
                <aside className={styles.main__info}>
                    <div className={styles.info__group}>
                        <p className={styles.group__heading}>Adres</p>
                        <p className={styles.group__text}>ul. Leśna 4<br />00-001 Warszawa</p>
                    </div>
                    <div className={styles.info__group}>
                        <p className={styles.group__heading}>Wsparcie</p>
                        <p className={styles.group__text}>Nr tel: 123 123 123<br />E-mail: help@mizu.pl</p>
                    </div>
                    <div className={styles.info__group}>
                        <p className={styles.group__heading}>Social media</p>
                        <div className={styles.group__row}>
                            <a title='Facebook' href="https://www.facebook.com/" target='_blank'>
                                <BsFacebook className={styles.group__socialLink} />
                            </a>
                            <a title='YouTube' href="https://www.youtube.com/" target='_blank'>
                                <BsYoutube className={styles.group__socialLink} />
                            </a>
                            <a title='Instagram' href="https://www.instagram.com/" target='_blank'>
                                <BsInstagram className={styles.group__socialLink} />
                            </a>
                            <a title='Twitter' href="https://twitter.com" target='_blank'>
                                <FaSquareXTwitter className={styles.group__socialLink} />
                            </a>
                        </div>
                    </div>
                </aside>
            </main>
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </main>
    )
}

export default Contact
