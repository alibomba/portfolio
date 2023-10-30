import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {format} from 'date-fns';
import Error from '../../components/error/Error';
import Loading from '../../components/loading/Loading';
import Popup from '../../components/popup/Popup';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import axiosClient from '../../axiosClient';
import axios from 'axios';


import styles from './reservation.module.css';

interface ReservationFormData {
    service: string,
    price: number,
    date: string
}

const Reservation = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup>({ content: null, active: false, type: 'good' });
    const [reservationData, setReservationData] = useState<ReservationFormData>({ service: '', price: 0, date: '' });

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: `/reservations/${id}`,
            cancelToken: source.token
        })
            .then(res => {
                const data: Reservation = res.data;
                setReservationData({ service: data.service, price: data.price, date: format(new Date(data.date), 'yyyy-MM-dd') });
            })
            .catch(err => {
                if (err?.response?.status === 404) {
                    setError('Rezerwacja nie istnieje');
                }
                else {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
            })
            .finally(() => setLoading(false));

        return () => {
            source.cancel();
        }

    }, [id]);

    function changeService(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement;
        setReservationData(prev => { return { ...prev, service: input.value } });
    }

    function changePrice(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement;
        setReservationData(prev => { return { ...prev, price: parseInt(input.value) } });
    }

    function changeDate(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement;
        setReservationData(prev => { return { ...prev, date: input.value } });
    }

    async function submit(e: React.FormEvent) {
        e.preventDefault();

        try {
            await axiosClient({
                method: 'put',
                url: `/reservations/${id}`,
                data: {
                    service: reservationData.service,
                    price: reservationData.price,
                    date: reservationData.date
                }
            });
            setPopup({ content: 'Rezerwacja zapisana', active: true, type: 'good' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
        } catch (err: any) {
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
        <form onSubmit={submit} className={styles.form}>
            <Input
                id='serviceName'
                ariaLabel='Nazwa usługi'
                placeholder='Nazwa usługi'
                type='text'
                maxLength={255}
                onChange={changeService}
                value={reservationData.service}
            />
            <Input
                id='price'
                ariaLabel='Cena'
                placeholder='Cena'
                type='number'
                min={0}
                onChange={changePrice}
                value={reservationData.price}
            />
            <Input
                id='date'
                ariaLabel='Data'
                type='date'
                onChange={changeDate}
                value={reservationData.date}
            />
            <Button>Zapisz</Button>
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </form>
    )
}

export default Reservation
