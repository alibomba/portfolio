import { useContext, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import axiosClient from '../../axiosClient';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import { AuthContext, ContextType } from '../../contexts/AuthProvider';

import styles from './login.module.css';

const Login = () => {
    const { isAuthorized, setIsAuthorized, isLoading } = useContext<ContextType>(AuthContext);
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function login(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const login = form.querySelector('#login') as HTMLInputElement;
        const password = form.querySelector('#password') as HTMLInputElement;

        try {
            const res = await axiosClient({
                method: 'post',
                url: '/login',
                data: {
                    login: login.value,
                    password: password.value
                }
            });
            const { accessToken, refreshToken } = res.data;
            form.reset();
            setLoginError(null);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            setIsAuthorized(true);
            navigate('/rezerwacje');
        } catch (err: any) {
            if (err?.response?.status === 401) {
                setLoginError(err?.response?.data?.message);
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
        <form onSubmit={login} className={styles.form}>
            <input required placeholder='Login' aria-label='Login' id='login' type="text" className={styles.form__input} />
            <div className={styles.form__inputContainer}>
                <input required placeholder='Hasło' aria-label='Hasło' type={isPasswordVisible ? 'text' : 'password'} id='password' className={styles.form__input} />
                <button onClick={() => setIsPasswordVisible(prev => !prev)} type='button' className={styles.form__passwordToggle}>
                    {isPasswordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
                </button>
            </div>
            {loginError && <p role='alert' aria-live='assertive' className={styles.form__error}>{loginError}</p>}
            <button className={styles.form__button}>Zaloguj</button>
        </form>
    )
}

export default Login
