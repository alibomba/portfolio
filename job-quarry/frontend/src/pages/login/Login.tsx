import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthorized, setIsCompany } from '../../state/authSlice';
import { AppDispatch, RootState } from '../../state/store';
import { useMutation } from '@apollo/client';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Input from '../../components/input/Input';
import styles from './login.module.css';
import Error from '../../components/error/Error';
import Loading from '../../components/loading/Loading';
import { LOGIN } from '../../graphql/mutations';
import { GraphQLErrors } from '@apollo/client/errors';

interface LoginData {
    email: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate();
    const { isLoading, isAuthorized } = useSelector((state: RootState) => state.auth);
    const [loginData, setLoginData] = useState<LoginData>({ email: '', password: '' });
    const [loginError, setLoginError] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loginMutation] = useMutation(LOGIN);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const body = document.querySelector('body');
        if (body) {
            body.style.backgroundColor = '#D2D2D2';
            return () => {
                body.style.backgroundColor = '#FFF';
            }
        }
    }, []);

    function changeData(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement;
        const id = input.id;

        switch (id) {
            case 'email':
                setLoginData(prev => ({ ...prev, email: input.value }));
                break;
            case 'password':
                setLoginData(prev => ({ ...prev, password: input.value }));
                break;
        }
    }

    async function login(e: React.FormEvent) {
        e.preventDefault();
        try {
            const { data } = await loginMutation({
                variables: {
                    loginInput: {
                        email: loginData.email,
                        password: loginData.password
                    }
                }
            });
            const { accessToken, refreshToken, isCompany } = data.login;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            dispatch(setIsCompany(isCompany));
            dispatch(setIsAuthorized(true));
            navigate('/');
        } catch (err: any) {
            const error = err.graphQLErrors[0] as GraphQLErrors[0];
            if (error.extensions?.code === 'UNAUTHORIZED') {
                setLoginError(error.message);
            } else {
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
            <img className={styles.main__logo} src="/logo.png" alt="logo Job Quarry" />
            <form onSubmit={login} className={styles.form}>
                <div className={styles.form__container}>
                    <label htmlFor="email" className={styles.form__label}>E-mail</label>
                    <Input
                        id='email'
                        placeholder='johndoe@gmail.com'
                        type='email'
                        maxLength={40}
                        required
                        value={loginData.email}
                        onChange={changeData}
                    />
                </div>
                <div className={styles.form__container}>
                    <label htmlFor="password" className={styles.form__label}>Hasło</label>
                    <Input
                        id='password'
                        placeholder='Twoje hasło'
                        type='password'
                        minLength={8}
                        maxLength={60}
                        required
                        value={loginData.password}
                        onChange={changeData}
                    />
                </div>
                <button className={styles.form__button}>Zaloguj się</button>
                {
                    loginError && <p className={styles.form__error} role='alert' aria-live='assertive'>{loginError}</p>
                }
            </form>
            <p className={styles.main__paragraph}>Nie masz konta? <Link className={styles.main__link} to='/rejestracja'>Zarejestruj się</Link></p>
            <Link to='/' className={styles.main__link}>Kontynuuj bez konta</Link>
        </main>
    )
}

export default Login
