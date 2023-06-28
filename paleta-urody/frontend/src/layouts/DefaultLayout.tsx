import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../sections';
import SectionBorder from '../components/sectionBorder/SectionBorder';

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <SectionBorder color='primary' />
            <Outlet />
            <SectionBorder color='primary' />
            <Footer />
        </>
    )
}

export default DefaultLayout
