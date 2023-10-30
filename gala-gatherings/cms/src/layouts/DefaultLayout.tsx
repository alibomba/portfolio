import { Outlet, Navigate } from 'react-router-dom';
import { Header } from '../sections';
import { useContext } from 'react';
import { AuthContext, ContextType } from '../contexts/AuthProvider';
import Loading from '../components/loading/Loading';

const DefaultLayout = () => {
    const { isAuthorized, isLoading } = useContext<ContextType>(AuthContext);

    if (isLoading) {
        return <Loading />
    }

    if (!isLoading && !isAuthorized) {
        return <Navigate to='/login' />
    }

    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default DefaultLayout
