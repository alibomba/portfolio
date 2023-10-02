import { useState, useContext } from 'react';
import { AuthContext, ContextType } from '../../contexts/AuthProvider';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link, Navigate } from 'react-router-dom';
import styles from './register.module.css';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import Popup from '../../components/popup/Popup';
import axiosClient from '../../axiosClient';

interface Passwords {
    first: boolean;
    second: boolean;
}

const Register = () => {
    const { isAuthorized, isLoading } = useContext<ContextType>(AuthContext);
    const [arePasswordsVisible, setArePasswordsVisible] = useState<Passwords>({ first: false, second: false });
    const [validationError, setValidationError] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [popup, setPopup] = useState<string | null>(null);

    async function register(e: React.FormEvent): Promise<void> {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const username = form.querySelector('#username') as HTMLInputElement;
        const email = form.querySelector('#email') as HTMLInputElement;
        const phoneNumber = form.querySelector('#phoneNumber') as HTMLInputElement;
        const password = form.querySelector('#password') as HTMLInputElement;
        const passwordConfirmation = form.querySelector('#passwordConfirmation') as HTMLInputElement;

        try {
            const res = await axiosClient({
                method: 'post',
                url: '/register',
                data: {
                    username: username.value,
                    email: email.value,
                    phoneNumber: phoneNumber.value,
                    password: password.value,
                    passwordConfirmation: passwordConfirmation.value
                }
            });
            form.reset();
            setValidationError(null);
            setPopup('Utworzono użytkownika');
            setTimeout(() => setPopup(null), 4000);
        } catch (err: any) {
            if (err?.response?.status === 422) {
                setValidationError(err?.response?.data?.message);
            }
            else {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
    }

    if (isLoading) {
        return <Loading />
    }

    if (!isLoading && isAuthorized) {
        return <Navigate to='/' />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <main className={styles.main}>
            <form onSubmit={register} className={styles.main__form}>
                <h2 className={styles.form__heading}>Zarejestruj się</h2>
                <div className={styles.form__controls}>
                    <input type="text" className={styles.form__input} id='username' placeholder='Nazwa użytkownika' aria-label='Nazwa użytkownika' />
                    <input type="email" className={styles.form__input} id='email' placeholder='E-mail' aria-label='E-mail' />
                    <input type="text" className={styles.form__input} id='phoneNumber' placeholder='Numer telefonu' aria-label='Numer telefonu' />
                    <div className={styles.form__inputContainer}>
                        <input type={arePasswordsVisible.first ? 'text' : 'password'} className={styles.form__input} id='password' placeholder='Hasło' aria-label='Hasło' />
                        <button onClick={() => setArePasswordsVisible(prev => { return { ...prev, first: !prev.first } })} type='button' className={styles.form__passwordToggle}>
                            {arePasswordsVisible.first ? <AiFillEye /> : <AiFillEyeInvisible />}
                        </button>
                    </div>
                    <div className={styles.form__inputContainer}>
                        <input type={arePasswordsVisible.second ? 'text' : 'password'} className={styles.form__input} id='passwordConfirmation' placeholder='Powtórz hasło' aria-label='Powtórz hasło' />
                        <button onClick={() => setArePasswordsVisible(prev => { return { ...prev, second: !prev.second } })} type='button' className={styles.form__passwordToggle}>
                            {arePasswordsVisible.second ? <AiFillEye /> : <AiFillEyeInvisible />}
                        </button>
                    </div>
                    {
                        validationError && <p className={styles.form__error}>{validationError}</p>
                    }
                    <button className={styles.form__button}>Zarejestruj się</button>
                </div>
                <Link className={styles.form__link} to='/logowanie'>Zaloguj się</Link>
                <Link className={styles.form__link} to='/'>Strona główna</Link>
            </form>
            <div style={{ backgroundImage: `url('${process.env.REACT_APP_BACKEND_URL}/storage/assets/register-img.jpg')` }} className={styles.main__img}></div>
            <Popup active={popup ? true : false} type='good'>{popup}</Popup>
        </main>
    )
}

export default Register
