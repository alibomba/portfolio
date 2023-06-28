
import Testimonial from '../../components/testimonial/Testimonial';

import styles from './testimonials.module.css';

const Testimonials = () => {
    return (
        <section className={styles.testimonials}>
            <h2 className={styles.testimonials__heading}>Opinie klientów</h2>
            <main className={styles.testimonials__main}>
                <Testimonial
                    author='Anna Wójcik'
                    profilePicture='anna-wójcik.jpg'
                >
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa sequi debitis eos tempore tempora praesentium mollitia nam reprehenderit enim quam similique neque ratione assumenda labore excepturi, beatae, cupiditate repudiandae minus!
                </Testimonial>

                <Testimonial
                    author='Jakub Szymański'
                    profilePicture='jakub-szymanski.jpg'
                >
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa sequi debitis eos tempore tempora praesentium mollitia nam reprehenderit enim quam similique neque ratione assumenda labore excepturi, beatae, cupiditate repudiandae minus!
                </Testimonial>

                <Testimonial
                    author='Katarzyna Nowak'
                    profilePicture='katarzyna-nowak.jpg'
                >
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa sequi debitis eos tempore tempora praesentium mollitia nam reprehenderit enim quam similique neque ratione assumenda labore excepturi, beatae, cupiditate repudiandae minus!
                </Testimonial>

                <Testimonial
                    author='Magdalena Wojciechowska'
                    profilePicture='magdalena-wojciechowska.jpg'
                >
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa sequi debitis eos tempore tempora praesentium mollitia nam reprehenderit enim quam similique neque ratione assumenda labore excepturi, beatae, cupiditate repudiandae minus!
                </Testimonial>

                <Testimonial
                    author='Marcin Kowalski'
                    profilePicture='marcin-kowalski.jpg'
                >
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa sequi debitis eos tempore tempora praesentium mollitia nam reprehenderit enim quam similique neque ratione assumenda labore excepturi, beatae, cupiditate repudiandae minus!
                </Testimonial>

                <Testimonial
                    author='Piotr Kwiatkowski'
                    profilePicture='piotr-kwiatkowski.jpg'
                >
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa sequi debitis eos tempore tempora praesentium mollitia nam reprehenderit enim quam similique neque ratione assumenda labore excepturi, beatae, cupiditate repudiandae minus!
                </Testimonial>
            </main>
        </section>
    )
}

export default Testimonials
