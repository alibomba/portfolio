import { useState, createContext, Dispatch, SetStateAction, EventHandler, SyntheticEvent, useRef } from 'react';

import DatePicker from '../../components/datePicker/DatePicker';
import VisitHours from '../../components/visitHours/VisitHours';
import Button from '../../components/button/Button';

import styles from './reservation.module.css';
import axiosClient from '../../axiosClient';
interface ContextValue {
    selectedDate: Date
    updateDate: Dispatch<SetStateAction<Date>>
}

const ReservationContext = createContext<ContextValue | null>(null);

const Reservation = () => {

    const notificationRef = useRef<HTMLParagraphElement>(null);

    const [validationError, setValidationError] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [notification, setNotification] = useState<string>('');

    const ContextValue: ContextValue = {
        selectedDate: selectedDate,
        updateDate: setSelectedDate
    }

    const showNotification = async (message: string) => {
        const notification = notificationRef.current as HTMLParagraphElement;
        setNotification(message);
        notification.classList.add(styles.notification_active);
        notification.focus();
        setTimeout(() => {
            notification.classList.remove(styles.notification_active);
            setTimeout(() => setNotification(''), 1000);
        }, 3000);
    }

    const handleSubmit: EventHandler<SyntheticEvent<HTMLFormElement>> = (e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const selectedInput = form.querySelector('input[name="hour"]:checked') as HTMLInputElement;
        const selectedHour = selectedInput?.value;
        const phoneInput = form.querySelector('input[name="phone_number"]') as HTMLInputElement;
        const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement;

        //client side validation
        if (!/^[+0-9][-0-9 ()]*[0-9]$/.test(phoneInput.value) || !phoneInput.value) {
            setValidationError('Podaj poprawny numer telefonu!');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value) || !emailInput.value) {
            setValidationError('Podaj poprawny adres e-mail!');
            return;
        }

        if (!selectedHour) {
            setValidationError('Wybierz godzinę wizyty!');
            return;
        }

        if (!selectedDate) {
            setValidationError('Wybierz datę wizyty!');
            return;
        }

        const dateFormatted = `${selectedDate?.getFullYear()}-${selectedDate?.getMonth() && selectedDate.getMonth() + 1}-${selectedDate?.getDate()}`;

        const data = {
            date: dateFormatted,
            hour: selectedHour,
            phoneNumber: phoneInput.value,
            email: emailInput.value
        };


        axiosClient({
            method: 'post',
            url: '/appointments',
            data
        })
            .then(res => {
                selectedInput.closest('div')?.classList.add('hour_disabled');
                selectedInput.setAttribute('disabled', 'true');
                selectedInput.setAttribute('aria-disabled', 'true');
                setValidationError(null);
                form.reset();
                const resDateObject = new Date(res.data.date.date);
                showNotification(`Pomyślnie zarezerwowano datę wizyty na ${resDateObject.getDate() < 10 ? '0' + resDateObject.getDate() : resDateObject.getDate()}.${resDateObject.getMonth() + 1 < 10 ? '0' + (resDateObject.getMonth() + 1) : resDateObject.getMonth() + 1}.${resDateObject.getFullYear()} ${resDateObject.getHours() < 10 ? '0' + resDateObject.getHours() : resDateObject.getHours()}:00`);
            })
            .catch(err => setValidationError(err.response.data.message));
    }

    return (
        <>
            <ReservationContext.Provider value={ContextValue}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.main__top}>
                        <DatePicker />
                        <VisitHours />
                    </div>
                    <div className={`${styles.main__bottom} ${validationError && styles.main__bottom_error}`}>
                        <input name='phone_number' type="text" placeholder='Nr telefonu' aria-label='numer telefonu' className={styles.main__input} />
                        <input name='email' type="text" placeholder='Adres e-mail' aria-label='adres e-mail' className={styles.main__input} />
                        <Button
                            backgroundColor='var(--primary)'
                            as='button'
                            href=''
                            className={styles.main__button}
                        >Zarezerwuj</Button>
                    </div>
                    {validationError && <p role='alert' className={styles.validationError}>{validationError}</p>}
                    {<p tabIndex={-1} role='alert' ref={notificationRef} className={styles.notification}>{notification}</p>}
                </form>
            </ReservationContext.Provider>
        </>
    )
}

export { Reservation, ReservationContext }
