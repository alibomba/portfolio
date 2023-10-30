import { HomeHero, HomeServices, NearestDate, Testimonials, Awards, CommonSection, FeaturedOffers } from '../../sections';

import styles from './homepage.module.css';

const Homepage = () => {
    return (
        <>
            <HomeHero />
            <main>
                <HomeServices />
                <NearestDate />
                <Testimonials heading='Co mowią klienci' />
                <Awards />
                <CommonSection
                    heading='Od lat na rynku'
                    image={`${process.env.REACT_APP_BACKEND_URL}/storage/assets/od-lat-na-rynku.webp`}
                    imageAlt='klepsydra z piaskiem'
                    textFirst={true}
                >
                    Jesteśmy dumną firmą z bogatym doświadczeniem i tradycją na rynku organizacji wydarzeń specjalnych. Od lat dostarczamy naszym klientom niezapomniane chwile i spełniamy ich marzenia. Nasza ciągła pasja, zaangażowanie i rozwijające się umiejętności sprawiają, że pozostajemy liderem w branży.
                </CommonSection>
                <FeaturedOffers />
            </main>
        </>
    )
}

export default Homepage
