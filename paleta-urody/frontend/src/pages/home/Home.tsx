import { Hero, Discount, Services, WhyUs, Testimonials } from '../../sections';
import SectionBorder from '../../components/sectionBorder/SectionBorder';

const Home = () => {
    return (
        <>
            <Hero />
            <SectionBorder color='primary' />
            <main>
                <Discount />
                <Services />
                <WhyUs />
                <Testimonials />
            </main>
        </>
    )
}

export default Home
