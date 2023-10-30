import { GiBigDiamondRing } from 'react-icons/gi';
import { HiBuildingOffice2 } from 'react-icons/hi2';
import { FaBirthdayCake, FaKey } from 'react-icons/fa';
import { MdOutlineRestaurant } from 'react-icons/md';
import { BiSolidCar } from 'react-icons/bi';

import styles from './homeServices.module.css';

const HomeServices = () => {
    return (
        <section className={styles.section}>
            <div className={styles.section__group}>
                <GiBigDiamondRing className={styles.section__icon} aria-label='ikona pierścionka z diamentem' />
                <p className={styles.section__text}>Wesela</p>
            </div>
            <div className={styles.section__group}>
                <HiBuildingOffice2 className={styles.section__icon} aria-label='ikona biurowca' />
                <p className={styles.section__text}>Imprezy Firmowe</p>
            </div>
            <div className={styles.section__group}>
                <FaBirthdayCake className={styles.section__icon} aria-label='ikona tortu urodzinowego' />
                <p className={styles.section__text}>Urodziny</p>
            </div>
            <div className={styles.section__group}>
                <FaKey className={styles.section__icon} aria-label='ikona klucza' />
                <p className={styles.section__text}>Imprezy prywatne</p>
            </div>
            <div className={styles.section__group}>
                <MdOutlineRestaurant className={styles.section__icon} aria-label='ikona sztućców' />
                <p className={styles.section__text}>Catering</p>
            </div>
            <div className={styles.section__group}>
                <BiSolidCar className={styles.section__icon} aria-label='ikona samochodu' />
                <p className={styles.section__text}>Transport</p>
            </div>
        </section>
    )
}

export default HomeServices
