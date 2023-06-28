import Button from '../../components/button/Button';
import { BsArrowRight } from 'react-icons/bs';

import styles from './discount.module.css';

const Discount = () => {
    return (
        <section className={styles.discount}>
            <img src="img/znizka-img.jpg" alt="leżąca kobieta z maseczką z kremu na twarzy" className={styles.discount__img} />
            <div className={styles.discount__right}>
                <p className={styles.discount__text}>20% zniżki na pierwszą wizytę</p>
                <Button
                    backgroundColor='var(--primary)'
                    as='link'
                    href='/rezerwacja'
                    className={styles.discount__button}
                >
                    Wypróbuj teraz <BsArrowRight />
                </Button>
            </div>
        </section>
    )
}

export default Discount
