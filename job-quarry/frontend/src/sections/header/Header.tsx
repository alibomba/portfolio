import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdNotifications } from 'react-icons/io';
import { MdMessage, MdLogout } from 'react-icons/md';
import { ImUser } from 'react-icons/im';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../state/store';
import { setIsAuthorized } from '../../state/authSlice';
import { useMutation, useApolloClient } from '@apollo/client';
import { LOGOUT } from '../../graphql/mutations';
import styles from './header.module.css';
import { GET_AUTH } from '../../graphql/queries';
import Error from '../../components/error/Error';
import useSetNotificationsToRead from '../../hooks/useSetNotificationsToRead';
import Notifications from '../../components/notifications/Notifications';

const Header = () => {
    const apolloClient = useApolloClient();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const setNotificationsToRead = useSetNotificationsToRead();
    const { isSomethingNew } = useSelector((state: RootState) => state.notification);
    const { isAuthorized, isLoading, isCompany } = useSelector((state: RootState) => state.auth);
    const [areNotificationsVisible, setAreNotificationsVisible] = useState<boolean>(false);
    const [isNavActive, setIsNavActive] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [logoutMutation] = useMutation(LOGOUT, {
        refetchQueries: [{ query: GET_AUTH }],
        onCompleted: () => {
            apolloClient.resetStore();
        }
    });

    async function logout() {
        try {
            await logoutMutation({
                variables: {
                    refreshToken: localStorage.getItem('refreshToken') || ''
                }
            });
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            dispatch(setIsAuthorized(false));
            navigate('/logowanie');
        } catch (err) {
            setError('Coś poszło nie tak, spróbuj ponownie później...');
        }
    }

    function toggleNotifications() {
        setAreNotificationsVisible(prev => {
            if (!prev) {
                setNotificationsToRead();
            }
            return !prev;
        });
    }

    if (isLoading) {
        return <></>
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <header className={styles.header}>
            <Link className={styles.header__singleLogo} to='/'>
                <img className={styles.header__logo} src={`${import.meta.env.VITE_API_URL}/storage/text-logo.png`} alt="logo Job Quarry" />
            </Link>
            <div className={styles.header_mobile__top}>
                <Link onClick={() => { setIsNavActive(false); setAreNotificationsVisible(false); }} to='/'>
                    <img className={styles.header__logo} src={`${import.meta.env.VITE_API_URL}/storage/text-logo.png`} alt="logo Job Quarry" />
                </Link>
                <button onClick={() => { setIsNavActive(prev => !prev); setAreNotificationsVisible(false); }} title='Przełącz menu' className={`${styles.header__navIcon} ${styles.header__hamburger} ${isNavActive && styles.header__hamburger_active}`}>
                    <GiHamburgerMenu />
                </button>
            </div>
            <nav className={`${styles.header__nav} ${isNavActive && styles.header__nav_active}`}>
                <Link onClick={() => { setIsNavActive(false); setAreNotificationsVisible(false); }} className={styles.header__navLink} to='/przegladaj'>Oferty</Link>
                {
                    isAuthorized ?
                        <>
                            <button onClick={toggleNotifications} className={`${styles.header__navIcon} ${isSomethingNew && styles.header__navIcon_unread}`} title='Powiadomienia'>
                                <IoMdNotifications />
                                {
                                    areNotificationsVisible &&
                                    <Notifications />
                                }
                            </button>
                            <Link onClick={() => { setIsNavActive(false); setAreNotificationsVisible(false); }} to='/czaty' className={styles.header__navIcon} title='Czaty'>
                                <MdMessage />
                            </Link>
                            <Link onClick={() => { setIsNavActive(false); setAreNotificationsVisible(false); }} to={isCompany ? '/ustawienia-firmy' : '/ustawienia'} className={styles.header__navIcon} title='Ustawienia'>
                                <ImUser />
                            </Link>
                            <button onClick={() => { setIsNavActive(false); setAreNotificationsVisible(false); logout(); }} className={styles.header__navIcon} title='Wyloguj się'>
                                <MdLogout />
                            </button>
                        </>
                        :
                        <>
                            <Link onClick={() => { setIsNavActive(false); setAreNotificationsVisible(false); }} to='/logowanie' className={styles.header__navButton}>Zaloguj się</Link>
                            <Link onClick={() => { setIsNavActive(false); setAreNotificationsVisible(false); }} to='/rejestracja' className={styles.header__navButton}>Załóż konto</Link>
                        </>
                }
            </nav>
        </header>
    )
}

export default Header
