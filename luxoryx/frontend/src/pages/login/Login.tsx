import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { AuthContext, ContextType } from '../../contexts/AuthProvider';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Error from '../../components/error/Error';
import styles from './login.module.css';
import axiosClient from '../../axiosClient';
import Loading from '../../components/loading/Loading';

interface Testimonial {
    author: string;
    text: string;
}

const Login = () => {
    const navigate = useNavigate();
    const { isLoading, isAuthorized, setIsAuthorized } = useContext<ContextType>(AuthContext);
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [currentInterval, setCurrentInterval] = useState<number>(7000);
    const [intervalVariable, setIntervalVariable] = useState<NodeJS.Timer | null>(null);
    const [currentSlide, setCurrentSlide] = useState<number>(1);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (intervalVariable) {
            clearInterval(intervalVariable);
        }
        setIntervalVariable(setInterval(() => {
            setCurrentSlide(prev => {
                if (prev < 6) {
                    return prev + 1;
                }
                else {
                    return 1;
                }
            })
        }, currentInterval))
    }, [currentInterval]);

    function changeSlide(slide: number): void {
        setCurrentSlide(slide);
        setCurrentInterval(7000);
    }

    async function login(e: React.FormEvent): Promise<void> {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const email = form.querySelector('#email') as HTMLInputElement;
        const password = form.querySelector('#password') as HTMLInputElement;

        try {
            const res = await axiosClient({
                method: 'post',
                url: '/login',
                data: {
                    email: email.value,
                    password: password.value
                }
            });
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            setIsAuthorized(true);
            navigate('/');
            if (localStorage.getItem('cart')) {
                const cart = JSON.parse(localStorage.getItem('cart')!) as LocalCartElement[];
                if (cart.length > 0) {
                    cart.forEach(async (cartElement) => {
                        try {
                            await axiosClient({ method: 'post', url: `/add-to-cart/${cartElement.product_id}`, data: { quantity: cartElement.quantity } });
                        } catch (err: any) {
                            if (err?.response?.status !== 422) {
                                setError('Coś poszło nie tak, spróbuj ponownie później...');
                            }
                        }
                    });
                }
            }
        } catch (err: any) {
            if (err?.response?.status === 401) {
                setLoginError(err?.response?.data?.message);
            }
            else {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
    }

    const testimonials: Testimonial[] = [
        {
            author: 'Joanna Wójcik',
            text: 'Jestem ogromnie zadowolona z zakupów w Luxoryx. Moja nowa biżuteria jest wyjątkowa pod każdym względem. Każdy detal jest starannie wykonany, a jakość jest po prostu niesamowita. Wspaniała obsługa klienta i szybka dostawa sprawiły, że wrócę tu na pewno!'
        },
        {
            author: 'Tomasz Kowalczyk',
            text: 'Moje doświadczenia z Luxoryx są zawsze niezwykłe. Ich zegarki są prawdziwymi dziełami sztuki, a biżuteria zawsze przyciąga uwagę. To miejsce, gdzie luksus i elegancja spotykają się z doskonałością. Polecam każdemu poszukującemu wyjątkowych produktów.'
        },
        {
            author: ' Magdalena Łukasik',
            text: 'Kupiłam obrączki ślubne w Luxoryx, i jestem zachwycona! Są pięknie wykonane i idealnie pasują do naszej historii miłości. To nie tylko zakupy, to również emocje i wspomnienia. Dziękujemy za tak wyjątkowy produkt!'
        },
        {
            author: 'Marek Nowicki',
            text: 'W Luxoryx zawsze znajduję coś, co doskonale pasuje do mojego stylu. Ich zegarki są zarówno eleganckie, jak i funkcjonalne. To nie tylko sklep, to prawdziwe źródło inspiracji dla miłośników biżuterii i zegarków.'
        },
        {
            author: 'Jan Kowal',
            text: 'Nie mogę wyrazić, jak bardzo doceniam jakość i wyjątkowość produktów z Luxoryx. Każdy zegarek czy naszyjnik, który noszę, przyciąga uwagę i dodaje pewności siebie. To naprawdę miejsce dla osób, które cenią wyjątkowość.'
        },
        {
            author: 'Adam Nowak',
            text: 'Dzięki Luxoryx znalazłem idealny prezent dla mojej córki. Jej urodziny były niezapomniane dzięki pięknemu naszyjnikowi. Produkty są nie tylko piękne, ale też doskonale zapakowane na prezent. To idealne miejsce na zakupy.'
        },
    ];

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            {(isAuthorized && !isLoading) ? <Navigate to='/' /> :
                <main className={styles.main}>
                    <div style={{ backgroundImage: `url('/img/login-testimonials/${currentSlide}.jpg')` }} className={styles.main__testimonial}>
                        <p className={styles.testimonial__author}>{testimonials[currentSlide - 1].author}</p>
                        <p className={styles.testimonial__text}>{testimonials[currentSlide - 1].text}</p>
                        <div className={styles.testimonial__buttons}>
                            <button onClick={() => changeSlide(1)} title='pierwszy slajd' className={`${styles.testimonial__button} ${currentSlide === 1 && styles.testimonial__button_active}`}></button>
                            <button onClick={() => changeSlide(2)} title='drugi slajd' className={`${styles.testimonial__button} ${currentSlide === 2 && styles.testimonial__button_active}`}></button>
                            <button onClick={() => changeSlide(3)} title='trzeci slajd' className={`${styles.testimonial__button} ${currentSlide === 3 && styles.testimonial__button_active}`}></button>
                            <button onClick={() => changeSlide(4)} title='czwarty slajd' className={`${styles.testimonial__button} ${currentSlide === 4 && styles.testimonial__button_active}`}></button>
                            <button onClick={() => changeSlide(5)} title='piąty slajd' className={`${styles.testimonial__button} ${currentSlide === 5 && styles.testimonial__button_active}`}></button>
                            <button onClick={() => changeSlide(6)} title='szósty slajd' className={`${styles.testimonial__button} ${currentSlide === 6 && styles.testimonial__button_active}`}></button>
                        </div>
                    </div>
                    <form onSubmit={login} className={styles.main__form}>
                        <h2 className={styles.form__heading}>Zaloguj się</h2>
                        <div className={styles.form__controls}>
                            <input type="text" placeholder='Adres e-mail' aria-label='Adres e-mail' className={styles.form__input} id='email' />
                            <div className={styles.form__inputContainer}>
                                <input type={isPasswordVisible ? 'text' : 'password'} placeholder='Hasło' aria-label='Hasło' className={styles.form__input} id='password' />
                                <button onClick={() => setIsPasswordVisible(prev => !prev)} type='button' className={styles.form__passwordToggle}>
                                    {
                                        isPasswordVisible ? <AiFillEye /> : <AiFillEyeInvisible />
                                    }
                                </button>
                            </div>
                            {loginError && <p className={styles.form__error}>{loginError}</p>}
                            <button className={styles.form__button}>Zaloguj się</button>
                        </div>
                        <Link className={styles.form__link} to='/rejestracja'>Załóż konto</Link>
                        <Link className={styles.form__link} to='/'>Strona główna</Link>
                    </form>
                </main>}
        </>
    )
}

export default Login
