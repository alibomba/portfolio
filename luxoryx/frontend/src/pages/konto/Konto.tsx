import { useState, useEffect, useContext } from 'react';
import { ContextType, AuthContext } from '../../contexts/AuthProvider';
import { useLocation, Navigate } from 'react-router-dom';
import Error from '../../components/error/Error';
import { TbLogout } from 'react-icons/tb';
import { RiAccountCircleFill } from 'react-icons/ri';
import { BsFillCartFill } from 'react-icons/bs';
import { AiFillHeart } from 'react-icons/ai';
import { KontoSettings, KontoMyOrders, KontoFavorites } from '../../sections';

import styles from './konto.module.css';
import Loading from '../../components/loading/Loading';

type Tab = 'settings' | 'myOrders' | 'favorites';

const tabsAllowed = ['settings', 'myOrders', 'favorites'];

const Konto = () => {
    const { isLoading, isAuthorized } = useContext<ContextType>(AuthContext);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [error, setError] = useState<string | null>(null);
    const [isSidebarActive, setIsSidebarActive] = useState<boolean>(false);

    useEffect(() => {
        if (searchParams.get('tab')) {
            if (!tabsAllowed.includes(searchParams.get('tab') as string)) {
                setError('Niepoprawna zakładka');
            }
        }
    }, []);

    const [tab, setTab] = useState<Tab>(searchParams.get('tab') as Tab || 'settings');
    const views = {
        settings: <KontoSettings setError={setError} />,
        myOrders: <KontoMyOrders setError={setError} />,
        favorites: <KontoFavorites setError={setError} />
    }

    function toggleSidebar(): void {
        setIsSidebarActive(prev => !prev);
    }

    if (isLoading) {
        return <Loading />
    }

    if (!isAuthorized && !isLoading) {
        return <Navigate to='/logowanie' />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <main className={styles.main}>
            <aside className={`${styles.sidebar} ${isSidebarActive && styles.sidebar_active}`}>
                <button onClick={toggleSidebar} className={`${styles.sidebar__toggle} ${isSidebarActive && styles.sidebar__toggle_active}`}>
                    <TbLogout />
                </button>
                <nav className={styles.sidebar__nav}>
                    <button onClick={() => { setTab('settings'); setIsSidebarActive(false); }} className={styles.sidebar__navLink}>
                        <RiAccountCircleFill className={styles.navLink__icon} />
                        <span className={styles.navLink__text}>Konto</span>
                    </button>
                    <button onClick={() => { setTab('myOrders'); setIsSidebarActive(false); }} className={styles.sidebar__navLink}>
                        <BsFillCartFill className={styles.navLink__icon} />
                        <span className={styles.navLink__text}>Moje zamówienia</span>
                    </button>
                    <button onClick={() => { setTab('favorites'); setIsSidebarActive(false); }} className={styles.sidebar__navLink}>
                        <AiFillHeart className={styles.navLink__icon} />
                        <span className={styles.navLink__text}>Ulubione</span>
                    </button>
                </nav>
            </aside>
            {views[tab]}
        </main>
    )
}

export default Konto
