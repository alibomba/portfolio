import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../sections';

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default DefaultLayout
