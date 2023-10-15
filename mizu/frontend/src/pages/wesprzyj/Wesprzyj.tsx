import { useEffect, useState, useRef } from 'react';
import { BsArrowLeftSquareFill, BsArrowRightSquareFill, BsFacebook } from 'react-icons/bs';
import { FaXTwitter, FaLink } from 'react-icons/fa6';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import Popup from '../../components/popup/Popup';
import axios from 'axios';
import axiosClient from '../../axiosClient';

import styles from './wesprzyj.module.css';
import getPercentage from '../../utilities/getPercentage';

const Wesprzyj = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    const [funds, setFunds] = useState<Fund[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup>({ active: false, type: 'good', content: null });
    const moneyAmountRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        async function fetchData() {
            try {
                const res = await axiosClient({
                    method: 'get',
                    url: '/funds',
                    cancelToken: source.token
                });
                const resFunds: Fund[] = res.data;
                if (id) {
                    try {
                        await axiosClient({
                            method: 'get',
                            url: `/fund/${id}`,
                            cancelToken: source.token
                        });
                    } catch (err: any) {
                        if (err?.response?.status === 404) {
                            setError(err?.response?.data?.message);
                        }
                        else {
                            setError('Coś poszło nie tak, spróbuj ponownie później...');
                        }
                    }
                    const index = resFunds.findIndex(element => element.id === id);
                    if (index !== -1) {
                        const targetElement = resFunds.splice(index, 1)[0];
                        resFunds.unshift(targetElement);
                    }
                    setFunds(resFunds);
                }
                else {
                    setFunds(resFunds);
                }
            } catch (err: any) {
                if (err?.response?.status === 404) {
                    setError(err?.response?.data?.message);
                }
                else {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
            }
            setLoading(false);
        }

        fetchData();

        return () => {
            source.cancel();
        }
    }, []);

    async function nextFund() {
        if (funds.length !== currentIndex + 1) {
            setCurrentIndex(prev => prev + 1);
        }
    }

    function prevFund() {
        if (currentIndex !== 0) {
            setCurrentIndex(prev => prev - 1);
        }
    }

    function shareOnFacebook() {
        const url = encodeURIComponent(`${process.env.REACT_APP_URL}/wesprzyj?id=${funds[currentIndex].id}`);
        const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        window.open(facebookShareURL, '_blank');
    }

    function shareOnTwitter() {
        const url = encodeURIComponent(`${process.env.REACT_APP_URL}/wesprzyj?id=${funds[currentIndex].id}`);
        const twitterShareURL = `https://twitter.com/intent/tweet?url=${url}`;
        window.open(twitterShareURL, '_blank');
    }

    function copyLink() {
        navigator.clipboard.writeText(`${process.env.REACT_APP_URL}/wesprzyj?id=${funds[currentIndex].id}`)
            .then(() => {
                setPopup({ active: true, type: 'good', content: 'Link został skopiowany' });
                setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
            })
            .catch(err => {
                setPopup({ active: true, type: 'bad', content: 'Błąd kopiowania' });
                setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
            });
    }

    async function support() {
        const input = moneyAmountRef.current;
        if (input) {
            if (!input.value) {
                setPopup({ content: 'Kwota jest wymagana', active: true, type: 'bad' });
                setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
            }
            if (parseFloat(input.value) < 2) {
                setPopup({ content: 'Kwota nie może być mniejsza niż 2zł', active: true, type: 'bad' });
                setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
            }
            try {
                const res = await axiosClient({
                    method: 'post',
                    url: `/support/${funds[currentIndex].id}`,
                    data: {
                        amountParam: input.value
                    }
                });
                window.location.href = res.data.url;
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
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <main>
            {
                loading ? <Loading /> :
                    <section style={{ backgroundImage: `url('${process.env.REACT_APP_BACKEND_URL}/storage/zbiorki/${funds[currentIndex].image}')` }} className={styles.fund}>
                        <header className={styles.fund__header_mobile}>
                            <h2 className={styles.fund__title}>{funds[currentIndex].title}</h2>
                            <div className={styles.fund__header_mobile__bottom}>
                                {
                                    currentIndex !== 0 &&
                                    <button onClick={prevFund} className={styles.fund__arrow}>
                                        <BsArrowLeftSquareFill />
                                    </button>
                                }
                                {
                                    funds.length !== currentIndex + 1 &&
                                    <button onClick={nextFund} className={styles.fund__arrow}>
                                        <BsArrowRightSquareFill />
                                    </button>
                                }
                            </div>
                        </header>
                        <header className={styles.fund__header}>
                            {
                                currentIndex !== 0 &&
                                <button onClick={prevFund} className={styles.fund__arrow}>
                                    <BsArrowLeftSquareFill />
                                </button>
                            }
                            <h2 className={styles.fund__title}>{funds[currentIndex].title}</h2>
                            {
                                funds.length !== currentIndex + 1 &&
                                <button onClick={nextFund} className={styles.fund__arrow}>
                                    <BsArrowRightSquareFill />
                                </button>
                            }
                        </header>
                        <main className={styles.fund__main}>
                            <div className={styles.fund__progress}>
                                <div className={styles.fund__progress__top}>
                                    <p aria-label='Zebrana kwota' className={styles.fund__progress__number}>{funds[currentIndex].currentAmount}zł</p>
                                    <p aria-label='Potrzebna kwota' className={styles.fund__progress__number}>{funds[currentIndex].targetAmount}zł</p>
                                </div>
                                <div className={styles.fund__progress__bar}>
                                    <div style={{ width: getPercentage(funds[currentIndex].currentAmount, funds[currentIndex].targetAmount) <= 100 ? `${getPercentage(funds[currentIndex].currentAmount, funds[currentIndex].targetAmount)}%` : '100%' }} className={styles.fund__progress__currentBar}></div>
                                </div>
                            </div>
                            <div className={styles.fund__data}>
                                <p className={styles.fund__description}>{funds[currentIndex].description}</p>
                                <div className={styles.fund__data__right}>
                                    <div className={styles.fund__data__group}>
                                        <p className={styles.group__heading}>Udostępnij</p>
                                        <div className={styles.group__row}>
                                            <button onClick={shareOnFacebook} className={styles.group__shareButton}>
                                                <BsFacebook className={styles.group__facebook} />
                                            </button>
                                            <button onClick={shareOnTwitter} className={styles.group__shareButton}>
                                                <FaXTwitter className={styles.group__x} />
                                            </button>
                                            <button onClick={copyLink} className={styles.group__shareButton}>
                                                <FaLink className={styles.group__link} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.fund__data__group}>
                                        <p className={styles.group__heading}>Wesprzyj</p>
                                        <input ref={moneyAmountRef} type="number" step={0.01} className={styles.group__input} aria-label='Kwota do wpłacenia' placeholder='Kwota' min={2} />
                                        <button onClick={support} className={styles.group__button}>Płacę</button>
                                    </div>
                                </div>
                            </div>
                        </main>
                        <div className={styles.fund__overlay}></div>
                    </section>
            }
            <section className={styles.content}>
                <h2 className={styles.content__heading}>Razem Możemy Zmieniać Świat!</h2>
                <p className={styles.content__text}>Witaj na naszej stronie zbiórek, miejscu, gdzie możesz dołączyć do nas w działaniach na rzecz ochrony środowiska i innych ważnych celów. Nasza organizacja non-profit działa na wielu frontach, aby tworzyć pozytywne zmiany na naszej planecie, ale nie możemy tego zrobić sami. Twoje wsparcie, niezależnie od formy, ma ogromne znaczenie. Dzięki Twoim darom, udziałowi w zbiórkach i aktywnościom, możemy kontynuować naszą misję i realizować projekty, które mają wpływ na naszą planetę i przyszłe pokolenia. Zapraszamy do zapoznania się z naszymi aktualnymi zbiórkami i dołączenia do nas w tworzeniu pozytywnych zmian dla naszej planety! Dziękujemy za Twoje wsparcie i zaangażowanie w sprawy, które są dla nas ważne. Razem możemy osiągnąć wielkie rzeczy.</p>
            </section>
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </main>
    )
}

export default Wesprzyj
