import Logo from '../../components/logo/Logo';
import LanguagePicker from '../../components/languagePicker/LanguagePicker';
import Button from '../../components/button/Button';
import CTA from '../../components/cta/CTA';

import styles from './header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.header__top}>
                <Logo classes={[styles.header__logo]} />
                <div className={styles.header__top__right}>
                    <LanguagePicker />
                    <Button
                        backgroundColor="#E50914"
                        size="button--sm"
                        href="https://www.netflix.com/pl/login"
                        arrow={false}
                    >Zaloguj się</Button>
                </div>
            </div>
            <div className={styles.header__bottom}>
                <p className={styles.header__heading}>Filmy, seriale i wiele więcej bez ograniczeń</p>
                <p className={styles.header__text}>Oglądaj wszędzie. Anuluj w każdej chwili.</p>
                <p className={styles.header__text}>Zaczynamy oglądać? Wprowadź adres e-mail, aby utworzyć lub odnowić konto.</p>
                <CTA classes={[styles.header__cta]} />
            </div>
        </header>
    )
}

export default Header
