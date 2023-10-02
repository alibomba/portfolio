import { useState } from 'react';
import axiosClient from '../../axiosClient';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import styles from './contact.module.css';
import Error from '../../components/error/Error';
import Popup from '../../components/popup/Popup';

const Contact = () => {
    const [error, setError] = useState<string | null>(null);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [popup, setPopup] = useState<string | null>(null);

    async function sendMessage(e: React.FormEvent): Promise<void> {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const name = form.querySelector('#name') as HTMLInputElement;
        const email = form.querySelector('#email') as HTMLInputElement;
        const subject = form.querySelector('#subject') as HTMLSelectElement;
        const content = form.querySelector('#message') as HTMLTextAreaElement;

        try {
            const res = await axiosClient({
                method: 'post',
                url: '/contact',
                data: {
                    name: name.value,
                    email: email.value,
                    subject: subject.value,
                    content: content.value
                }
            });
            setValidationError(null);
            setPopup('Wysłano wiadomość');
            setTimeout(() => setPopup(null), 4000);
            form.reset();
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
            <iframe className={styles.googleMaps} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5938.626393502821!2d20.98331760104854!3d52.22170220505122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc871c4decbf%3A0x76b3a7b992d747df!2sBia%C5%82a%2027%2C%2000-895%20Warszawa!5e1!3m2!1spl!2spl!4v1694952156447!5m2!1spl!2spl" width="600" height="450" loading="lazy"></iframe>
            <form onSubmit={sendMessage} className={styles.form}>
                <h2 className={styles.form__heading}>Wyślij wiadomość</h2>
                <div className={styles.form__row}>
                    <input required id='name' className={styles.form__input} placeholder='Imię' aria-label='Imię' type="text" />
                    <input required id='email' className={styles.form__input} placeholder='E-mail' aria-label='E-mail' type="email" />
                </div>
                <select required className={styles.form__input} aria-label='Temat' id="subject">
                    <option value="">Temat</option>
                    <option value="Zapytanie o produkt">Zapytanie o produkt</option>
                    <option value="Status zamówienia">Status zamówienia</option>
                    <option value="Zwroty i Wymiany">Zwroty i Wymiany</option>
                    <option value="Zapytanie o Personalizację">Zapytanie o Personalizację</option>
                    <option value="Naprawy i Konserwacja">Naprawy i Konserwacja</option>
                    <option value="Dostawa i Poczta">Dostawa i Poczta</option>
                    <option value="Płatności i Rachunki">Płatności i Rachunki</option>
                    <option value="Rozmiary i Dopasowanie">Rozmiary i Dopasowanie</option>
                    <option value="Opinie i Sugestie">Opinie i Sugestie</option>
                    <option value="Zapytania o Współpracę">Zapytania o Współpracę</option>
                    <option value="Media i Prasa">Media i Prasa</option>
                    <option value="Inne">Inne</option>
                </select>
                <textarea required maxLength={1000} id="message" placeholder='Treść' aria-label='Treść' className={styles.form__textarea} cols={30} rows={10}></textarea>
                {
                    validationError && <p role='alert' aria-live='assertive' className={styles.form__error}>{validationError}</p>
                }
                <button className={styles.form__button}>Wyślij</button>
                <Popup type='good' active={popup ? true : false}>{popup}</Popup>
            </form>
            <section className={styles.contact}>
                <h2 className={styles.contact__heading}>Skontaktuj się z nami</h2>
                <p className={styles.contact__text}>Jesteśmy dostępni, aby odpowiedzieć na Twoje pytania i potrzeby. Czekamy na Twój kontakt i chętnie pomożemy. Masz pytania dotyczące naszych produktów, zamówień lub innych kwestii? Napisz do nas lub zadzwoń, jesteśmy tu dla Ciebie. Twoja satysfakcja jest naszym priorytetem.</p>
                <div className={styles.contact__grid}>
                    <div className={styles.contact__group}>
                        <p className={styles.contact__group__heading}>Adres</p>
                        <p className={styles.contact__group__text}>Warszawa,<br />ul.Biała, 27</p>
                    </div>
                    <div className={styles.contact__group}>
                        <p className={styles.contact__group__heading}>Telefon</p>
                        <p className={styles.contact__group__text}>123 123 123</p>
                    </div>
                    <div className={styles.contact__group}>
                        <p className={styles.contact__group__heading}>E-mail</p>
                        <p className={styles.contact__group__text}>office@luxoryx.com</p>
                    </div>
                    <div className={styles.contact__groupRow}>
                        <a className={styles.contact__socialLink} href='#' target='_blank'>
                            <FaFacebookF className={styles.contact__socialIcon} />
                        </a>
                        <a className={styles.contact__socialLink} href='#' target='_blank'>
                            <FaInstagram className={styles.contact__socialIcon} />
                        </a>
                        <a className={styles.contact__socialLink} href='#' target='_blank'>
                            <FaTwitter className={styles.contact__socialIcon} />
                        </a>
                        <a className={styles.contact__socialLink} href='#' target='_blank'>
                            <FaLinkedinIn className={styles.contact__socialIcon} />
                        </a>
                    </div>
                </div>
            </section>
            <section className={styles.faq}>
                <h2 className={styles.faq__heading}>Często zadawane pytania</h2>
                <div className={styles.faq__grid}>
                    <article className={styles.faq__article}>
                        <h3 className={styles.article__heading}>Czy oferujecie międzynarodową wysyłkę?</h3>
                        <p className={styles.article__text}>Tak, wysyłamy produkty międzynarodowo. Koszty i czas dostawy mogą się różnić w zależności od lokalizacji.</p>
                    </article>
                    <article className={styles.faq__article}>
                        <h3 className={styles.article__heading}>Jaki jest czas dostawy?</h3>
                        <p className={styles.article__text}>Czas dostawy zależy od Twojej lokalizacji i wybranej metody wysyłki. Zazwyczaj staramy się dostarczyć zamówienie w ciągu 3 dni roboczych.</p>
                    </article>
                    <article className={styles.faq__article}>
                        <h3 className={styles.article__heading}>Czy oferujecie gwarancję na produkty?</h3>
                        <p className={styles.article__text}>Tak, wszystkie nasze produkty objęte są gwarancją. Szczegółowe informacje na ten temat znajdziesz w naszej polityce gwarancji.</p>
                    </article>
                    <article className={styles.faq__article}>
                        <h3 className={styles.article__heading}>Czy można dokonać zwrotu produktu?</h3>
                        <p className={styles.article__text}>Tak, jeśli nie jesteś zadowolony z produktu, masz 14 dni na dokonanie zwrotu. Szczegóły znajdziesz w sekcji zwrotów i reklamacji.</p>
                    </article>
                    <article className={styles.faq__article}>
                        <h3 className={styles.article__heading}>Czy produkty są pakowane na prezent?</h3>
                        <p className={styles.article__text}>Tak, wszystkie nasze produkty są starannie pakowane i nadają się na prezent. Jeśli potrzebujesz dodatkowej opakowania prezentowego, skontaktuj się z nami.</p>
                    </article>
                    <article className={styles.faq__article}>
                        <h3 className={styles.article__heading}>Jakie są dostępne metody płatności?</h3>
                        <p className={styles.article__text}>Oferujemy różnorodne metody płatności, w tym karty kredytowe (Visa, MasterCard), PayPal, Apple Pay oraz BLIK. Wybierz tę, która Ci odpowiada.</p>
                    </article>
                </div>
            </section>
        </main>
    )
}

export default Contact
