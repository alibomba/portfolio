import { useState, useEffect } from 'react';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import ReservationTile from '../../components/reservationTile/ReservationTile';
import Error from '../../components/error/Error';
import Loading from '../../components/loading/Loading';
import Popup from '../../components/popup/Popup';
import axiosClient from '../../axiosClient';
import axios from 'axios';


import styles from './reservations.module.css';

const Reservations = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [howMany, setHowMany] = useState<number>(5);
    const [isMore, setIsMore] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup>({ content: null, active: false, type: 'good' });

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: `/reservations?howManyParam=${howMany}`,
            cancelToken: source.token
        })
            .then(res => {
                const data = res.data;
                setIsMore(data.isMore);
                setReservations(data.reservations);
            })
            .catch(err => {
                if (err?.response?.status === 404) {
                    setIsMore(false);
                }
                else {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
            })
            .finally(() => setLoading(false));

        return () => {
            source.cancel();
        }

    }, [howMany]);

    async function addReservation(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const serviceName = form.querySelector('#serviceName') as HTMLInputElement;
        const price = form.querySelector('#price') as HTMLInputElement;
        const date = form.querySelector('#date') as HTMLInputElement;

        try {
            const res = await axiosClient({
                method: 'post',
                url: '/reservations',
                data: {
                    service: serviceName.value,
                    price: price.value,
                    date: date.value
                }
            });
            const newReservation: Reservation = res.data;
            form.reset();
            setReservations(prev => {
                prev.unshift(newReservation);
                return prev;
            });
            setPopup({ content: 'Rezerwacja dodana', active: true, type: 'good' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
        } catch (err: any) {
            console.log(err);
            if (err?.response?.status === 422) {
                setPopup({ content: err?.response?.data?.message, active: true, type: 'bad' });
                setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
            }
            else {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
    }


    if (loading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <main className={styles.main}>
            <form onSubmit={addReservation} className={styles.main__form}>
                <Input
                    id='serviceName'
                    ariaLabel='Nazwa usługi'
                    placeholder='Nazwa usługi'
                    type='text'
                    maxLength={255}
                />
                <Input
                    id='price'
                    ariaLabel='Cena'
                    placeholder='Cena'
                    type='number'
                    min={0}
                />
                <Input
                    id='date'
                    ariaLabel='Data'
                    type='date'
                />
                <Button>Dodaj</Button>
            </form>
            <section className={styles.main__reservations}>
                {
                    reservations.length > 0 ?
                        reservations.map(item => {
                            return (
                                <ReservationTile
                                    key={item.id}
                                    id={item.id}
                                    service={item.service}
                                    price={item.price}
                                    date={item.date}
                                    setReservations={setReservations}
                                />
                            )
                        })
                        :
                        <p className={styles.main__noResults}>Brak rezerwacji</p>
                }
            </section>
            {
                isMore && <button onClick={() => setHowMany(prev => prev + 3)} className={styles.main__showMore}>Pokaż więcej</button>
            }
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </main>
    )
}

export default Reservations
