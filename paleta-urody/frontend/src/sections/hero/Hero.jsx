import Button from '../../components/button/Button';
import { BsArrowRight } from 'react-icons/bs';
import styles from './hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <h2 className={styles.hero__heading}>Zadbaj o siebie z nami</h2>
            <p className={styles.hero__text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ab ducimus explicabo neque sequi vitae consectetur quae odit natus, quidem suscipit libero et eaque, corporis beatae? Impedit dolor odit dolores. </p>
            <Button
                backgroundColor='var(--primary)'
                as='link'
                href='/rezerwacja'
                className={styles.hero__button}
            >
                Umów wizytę <BsArrowRight />
            </Button>
        </section>
    )
}

export default Hero
