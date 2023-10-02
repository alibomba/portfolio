import { useState, useEffect, useContext } from 'react';
import { ContextType, AuthContext } from '../../contexts/AuthProvider';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import Popup from '../../components/popup/Popup';
import axiosClient from '../../axiosClient';
import axios from 'axios';
import styles from './returnPage.module.css';
import formatDate from '../../utilities/formatDate';

const ReturnPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthorized, isLoading } = useContext<ContextType>(AuthContext);
    const [returnData, setReturnData] = useState<ReturnData | null>(null);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
    const [popup, setPopup] = useState<Popup>({ content: '', active: false, type: 'good' });

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: `/return-data/${id}`,
            cancelToken: source.token
        })
            .then(res => {
                setReturnData(res.data);
            })
            .catch(err => {
                if (err?.response?.status === 404) {
                    navigate('/404');
                }
                else {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
            })
            .finally(() => setIsPageLoading(false));

        return () => {
            source.cancel();
        }

    }, [id]);

    async function submitReturn(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const select = form.querySelector('select') as HTMLSelectElement;
        const content = form.querySelector('textarea') as HTMLTextAreaElement;

        try {
            await axiosClient({
                method: 'post',
                url: `/submit-return/${id}`,
                data: {
                    reason: select.value,
                    details: content.value || ''
                }
            });
            form.reset();
            setValidationError(null);
            setPopup({ content: 'Wysłano prośbę o zwrot', active: true, type: 'good' });
            setTimeout(() => {
                setPopup(prev => { return { ...prev, active: false } });
                setTimeout(() => navigate('/konto?tab=myOrders'), 500);
            }, 3000);
        } catch (err: any) {
            if (err?.response?.status === 422) {
                setValidationError(err?.response?.data?.message);
            }
            else {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
    }

    if (!isLoading && !isAuthorized) {
        return <Navigate to='/' />
    }

    if (isLoading || isPageLoading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            {returnData &&
                <main className={styles.main}>
                    <h1 className={styles.main__heading}>Zwracany przedmiot</h1>
                    <header className={styles.main__header}>
                        <img className={styles.header__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/offers/${returnData.product.images[0].url}`} alt="miniatura oferty" />
                        <div className={styles.header__right}>
                            <h2 className={styles.header__title}>{returnData.product.name}</h2>
                            <p className={styles.header__text}>{returnData.product.category.name}</p>
                            <p className={styles.header__text}>{returnData.quantity}x{returnData.sold_at_price}zł</p>
                            <p className={styles.header__text}>Kupiono: {formatDate(returnData.bought_at)}</p>
                        </div>
                    </header>
                    <form onSubmit={submitReturn} className={styles.main__form}>
                        <select required aria-label='Powód zwrotu' className={styles.form__select}>
                            <option value="">Powód zwrotu</option>
                            <option value="Niezgodność z Opisem">Niezgodność z Opisem</option>
                            <option value="Uszkodzenie w Transporcie">Uszkodzenie w Transporcie</option>
                            <option value="Niewłaściwy Rozmiar">Niewłaściwy Rozmiar</option>
                            <option value="Niezadowolenie z Produktu">Niezadowolenie z Produktu</option>
                            <option value="Błąd w Zamówieniu">Błąd w Zamówieniu</option>
                            <option value="Zegarek Nie Działa Poprawnie">Zegarek Nie Działa Poprawnie</option>
                            <option value="Przesyłka Zgubiła Się">Przesyłka Zgubiła Się</option>
                            <option value="Niepotrzebny Produk">Niepotrzebny Produk</option>
                            <option value="Zmiana Zdania">Zmiana Zdania</option>
                            <option value="Inny Powód">Inny Powód</option>
                        </select>
                        <textarea maxLength={500} className={styles.form__textarea} placeholder='Szczegóły (opcjonalnie)' aria-label='Szczegóły (opcjonalnie)' cols={40} rows={10}></textarea>
                        {
                            validationError && <p role='alert' aria-live='assertive' className={styles.form__error}>{validationError}</p>
                        }
                        <button className={styles.form__button}>Zwróć</button>
                    </form>
                    <section className={styles.main__address}>
                        <h2 className={styles.address__heading}>Adres zwrotu</h2>
                        <p className={styles.address__text}>Warszawa, ul.Biała 27</p>
                    </section>
                    <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
                </main>
            }
        </>
    )
}

export default ReturnPage
