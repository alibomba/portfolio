
import { Hero, OffersSection, HomeTestimonials, HomeSecurity, Suppliers, Footer } from '../../sections';
import styles from './home.module.css';

const Home = () => {
    return (
        <>
            <Hero />
            <main>
                <OffersSection
                    heading='Na przecenie'
                    buttonContent='Zobacz więcej'
                    offersCondition='discount'
                />
                <OffersSection
                    heading='Ograniczony zasób'
                    buttonContent='Przejdź do sklepu'
                    offersCondition='limited'
                />
                <HomeTestimonials />
                <HomeSecurity />
                <Suppliers />
            </main>
        </>
    )
}

export default Home
