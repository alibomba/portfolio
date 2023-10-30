import { useState } from 'react';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { IoMdMail } from 'react-icons/io';
import Error from '../../components/error/Error';
import Popup from '../../components/popup/Popup';
import axiosClient from '../../axiosClient';

import styles from './contact.module.css';

const Contact = () => {
    const [validationError, setValidationError] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup>({ content: null, active: false, type: 'good' });

    async function send(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const fullName = form.querySelector('#fullName') as HTMLInputElement;
        const company = form.querySelector('#company') as HTMLInputElement;
        const email = form.querySelector('#email') as HTMLInputElement;
        const phoneNumber = form.querySelector('#phoneNumber') as HTMLInputElement;
        const subject = form.querySelector('#subject') as HTMLSelectElement;
        const details = form.querySelector('#details') as HTMLTextAreaElement;

        try {
            const res = await axiosClient({
                method: 'post',
                url: '/contact',
                data: {
                    fullName: fullName.value,
                    company: company.value,
                    email: email.value,
                    phoneNumber: phoneNumber.value,
                    subject: subject.value,
                    details: details.value
                }
            });
            form.reset();
            setValidationError(null);
            setPopup({ content: res.data.message, active: true, type: 'good' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
        } catch (err: any) {
            if (err?.response?.status === 422) {
                setValidationError(err?.response?.data?.message);
            } else {
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
                <h1 className={styles.header__heading}>Zarezerwuj termin lub wyślij zapytanie</h1>
                <p className={styles.header__text}>Chcielibyśmy usłyszeć od Ciebie! Niezależnie od tego, czy chcesz zarezerwować termin na swoje wydarzenie, uzyskać więcej informacji o naszych usługach, czy po prostu podzielić się swoimi pomysłami - jesteśmy tu, aby Ci pomóc. Skontaktuj się z nami już teraz, a my odpowiemy na Twoje pytania i postaramy się zrealizować Twoje marzenia na Twoim wydarzeniu.</p>
            </header>
            <form onSubmit={send} className={styles.main__form}>
                <div className={styles.form__grid}>
                    <input id='fullName' required maxLength={200} placeholder='Imię i nazwisko' aria-label='Imię i nazwisko' type="text" className={styles.form__input} />
                    <input id='company' maxLength={255} placeholder='Firma (opcjonalnie)' aria-label='Firma (opcjonalnie)' type="text" className={styles.form__input} />
                    <input id='email' required maxLength={55} placeholder='E-mail' aria-label='E-mail' type="email" className={styles.form__input} />
                    <input id='phoneNumber' required maxLength={30} placeholder='Nr telefonu' aria-label='Numer telefonu' type="text" className={styles.form__input} />
                </div>
                <select id='subject' required defaultValue='' aria-label='Temat' className={styles.form__select}>
                    <option value="">Temat</option>
                    <option value="Złożenie zamówienia">Złożenie zamówienia</option>
                    <option value="Zapytanie o dostępność terminu">Zapytanie o dostępność terminu</option>
                    <option value="Cena i oferty">Cena i oferty</option>
                    <option value="Doradztwo i konsultacja">Doradztwo i konsultacja</option>
                    <option value="Reklamacje i uwagi">Reklamacje i uwagi</option>
                    <option value="Zapytanie o szczegóły usług">Zapytanie o szczegóły usług</option>
                    <option value="Inne zapytania i informacje">Inne zapytania i informacje</option>
                </select>
                <textarea required id='details' maxLength={1000} className={styles.form__textarea} cols={30} rows={10} placeholder='Szczegóły' aria-label='Szczegóły'></textarea>
                {
                    validationError && <p role='alert' aria-live='assertive' className={styles.form__error}>{validationError}</p>
                }
                <button className={styles.form__button}>Wyślij</button>
            </form>
            <section className={styles.contactInfo}>
                <article className={styles.contactInfo__tile}>
                    <BsFillTelephoneFill className={styles.tile__icon} />
                    <p className={styles.tile__text}>Chcesz porozmawiać z nami? Jesteśmy tu, aby odpowiedzieć na Twoje pytania i omówić Twoje potrzeby. Daj nam znać i nawiążemy kontakt.</p>
                    <a className={styles.tile__button} href="tel:123 123 123">Zadzwoń</a>
                </article>
                <article className={styles.contactInfo__tile}>
                    <IoMdMail className={styles.tile__icon} />
                    <p className={styles.tile__text}>Wolisz komunikować się mailowo? To również świetny sposób na kontakt z nami. Wyślij nam wiadomość, a my odpowiemy jak najszybciej.</p>
                    <a className={styles.tile__button} href="mailto:help@gala-gatherings.pl">Wyślij maila</a>
                </article>
            </section>
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </main>
    )
}

export default Contact
