import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AdminNav } from '../sections';
import styles from './adminLayout.module.css';
import { AuthContext } from '../contexts/AuthProvider';

const AdminLayout = () => {
    const auth = useContext(AuthContext)

    if (auth?.isLoggedIn === null) {
        return <img src="/img/loading.gif" alt="loading" style={{ display: 'block', margin: '0 auto' }} />
    }
    else if (auth?.isLoggedIn === false) {
        return <Navigate to='/admin' />
    }

    return (
        <div className={styles.body}>
            <AdminNav />
            <Outlet />
        </div>
    )
}

export default AdminLayout
