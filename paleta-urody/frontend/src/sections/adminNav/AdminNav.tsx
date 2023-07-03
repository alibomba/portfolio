import { NavLink, Link, Navigate } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import { TiMessages, TiTime, TiKeyboard } from 'react-icons/ti';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

import styles from './adminNav.module.css';
import axiosClient from '../../axiosClient';

const AdminNav = () => {
    const auth = useContext(AuthContext);

    const logout = () => {
        axiosClient({
            method: 'post',
            url: '/logout'
        })
            .then(res => {
                auth?.setIsLoggedIn(false);
                localStorage.removeItem('token');
                <Navigate to='/admin' />
            })
            .catch(err => console.error(err));
    }

    return (
        <>
            <aside className={styles.aside}>
                <Link to='/'>
                    <img src="/img/logo.png" alt="logo" className={styles.aside__logo} />
                </Link>
                <nav className={styles.aside__nav}>
                    <NavLink
                        className={({ isActive }) =>
                            `${styles.aside__navLink} ${isActive && styles.aside__navLink_active}`}
                        to='/admin/wiadomosci'
                    >
                        Wiadomości
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `${styles.aside__navLink} ${isActive && styles.aside__navLink_active}`}
                        to='/admin/wizyty'
                    >
                        Wizyty
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `${styles.aside__navLink} ${isActive && styles.aside__navLink_active}`}
                        to='/admin/posty'
                    >
                        Posty
                    </NavLink>
                </nav>
                <BiLogOut onClick={logout} aria-label='logout' className={styles.aside__logout} />
            </aside>
            <aside className={styles.aside_mobile}>
                <NavLink
                    className={({ isActive }) =>
                        `${styles.aside__navLink_mobile} ${isActive && styles.aside__navLink_active_mobile}`}
                    to='/admin/wiadomosci'
                    aria-label='wiadomości'
                >
                    <TiMessages />
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        `${styles.aside__navLink_mobile} ${isActive && styles.aside__navLink_active_mobile}`}
                    to='/admin/wizyty'
                    aria-label='wizyty'
                >
                    <TiTime />
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        `${styles.aside__navLink_mobile} ${isActive && styles.aside__navLink_active_mobile}`}
                    to='/admin/posty'
                    aria-label='posty'
                >
                    <TiKeyboard />
                </NavLink>
                <BiLogOut onClick={logout} aria-label='logout' className={styles.aside__logout_mobile} />
            </aside>
        </>
    )
}

export default AdminNav
