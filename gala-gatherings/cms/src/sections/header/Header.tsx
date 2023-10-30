import { useState, useContext } from 'react';
import { AuthContext, ContextType } from '../../contexts/AuthProvider';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import Error from '../../components/error/Error';
import axiosClient from '../../axiosClient';

import styles from './header.module.css';

const Header = () => {
    const navigate = useNavigate();
    const { setIsAuthorized } = useContext<ContextType>(AuthContext);
    const [error, setError] = useState<string | null>(null);

    async function logout() {
        try {
            await axiosClient({
                method: 'delete',
                url: '/logout',
                data: {
                    refreshToken: localStorage.getItem('refreshToken') || ''
                }
            });
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            setIsAuthorized(false);
            navigate('/login');
        } catch (err: any) {
            setError('Coś poszło nie tak, spróbuj ponownie później...');
        }
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <header className={styles.header}>
            <NavLink to='/rezerwacje' className={({ isActive }) => `${styles.header__navLink} ${isActive && styles.header__navLink_active}`}>Rezerwacje</NavLink>
            <NavLink to='/uslugi' className={({ isActive }) => `${styles.header__navLink} ${isActive && styles.header__navLink_active}`}>Usługi</NavLink>
            <NavLink to='/portfolio' className={({ isActive }) => `${styles.header__navLink} ${isActive && styles.header__navLink_active}`}>Portfolio</NavLink>
            <NavLink to='/lokacje' className={({ isActive }) => `${styles.header__navLink} ${isActive && styles.header__navLink_active}`}>Lokacje</NavLink>
            <NavLink to='/aplikacje' className={({ isActive }) => `${styles.header__navLink} ${isActive && styles.header__navLink_active}`}>Aplikacje</NavLink>
            <NavLink to='/wiadomosci' className={({ isActive }) => `${styles.header__navLink} ${isActive && styles.header__navLink_active}`}>Wiadomości</NavLink>
            <button onClick={logout} className={styles.header__logout}>
                <FiLogOut />
            </button>
        </header>
    )
}

export default Header
