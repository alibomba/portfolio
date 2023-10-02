
import { TbMasksTheater, TbCash } from 'react-icons/tb';
import { LiaToolsSolid } from 'react-icons/lia';
import { BsHourglassSplit } from 'react-icons/bs';
import styles from './about.module.css';

const About = () => {
    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <h1 className={styles.section__h1}>Odkryj naszą historię</h1>
                <img className={styles.section__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/assets/o-firmie-hero-img.jpg`} alt="stacjonarny sklep z zegarkami" />
            </section>
            <section className={styles.section}>
                <img className={styles.section__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/assets/o-firmie-brand-introduction.jpg`} alt="srebrny zegarek w małej gablotce" />
                <p className={`${styles.section__text} ${styles.section__text_alignRight}`}>
                    Nasza marka to kwintesencja elegancji i wyrafinowanego stylu. Od lat dostarczamy naszym klientom biżuterię i zegarki, które podkreślają ich indywidualność i dodają blasku każdej chwili. Nasza pasja do doskonałości i miłość do pięknych detali są widoczne w każdym naszym produkcie.
                </p>
            </section>
            <section className={styles.section}>
                <div className={styles.section__content}>
                    <h2 className={styles.section__heading}>Wiadomość od założyciela</h2>
                    <p className={styles.section__text}>Jestem założycielem tego miejsca, gdzie pasja spotyka się z pięknem. Nasza biżuteria i zegarki to nie tylko produkty, to opowieści i wyjątkowe chwile. Zapraszam Cię do odkrycia świata elegancji i wyrafinowanego stylu w Luxoryx.</p>
                </div>
                <img className={styles.section__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/assets/o-firmie-founders-message.jpg`} alt="założyciel Luxoryx" />
            </section>
            <section className={styles.sectionGrid}>
                <article className={styles.sectionGrid__article}>
                    <TbMasksTheater className={styles.sectionGrid__icon} />
                    <h3 className={styles.sectionGrid__articleHeading}>Satysfakcja</h3>
                    <p className={styles.sectionGrid__text}>Nasza najwyższa wartość to Twoja satysfakcja. Dlatego każdy nasz produkt jest starannie wybierany i tworzony, aby spełnić Twoje oczekiwania. Jesteśmy tu, aby Cię uszczęśliwiać.</p>
                </article>
                <article className={styles.sectionGrid__article}>
                    <TbCash className={styles.sectionGrid__icon} />
                    <h3 className={styles.sectionGrid__articleHeading}>Opłacalność</h3>
                    <p className={styles.sectionGrid__text}>Chcemy, aby piękne zegarki i biżuteria były dostępne dla wszystkich. Nasza zasada to zapewnienie nie tylko jakości, ale także dostępności cenowej. Stawiamy na to, aby luksus był dostępny dla każdego.</p>
                </article>
                <article className={styles.sectionGrid__article}>
                    <LiaToolsSolid className={styles.sectionGrid__icon} />
                    <h3 className={styles.sectionGrid__articleHeading}>Rzemiosło</h3>
                    <p className={styles.sectionGrid__text}>W Luxoryx kultywujemy tradycję rzemiosła. Każdy nasz produkt jest owocem pracy utalentowanych rzemieślników. Dbamy o każdy detal, aby dostarczyć Ci dzieła sztuki.</p>
                </article>
                <article className={styles.sectionGrid__article}>
                    <BsHourglassSplit className={styles.sectionGrid__icon} />
                    <h3 className={styles.sectionGrid__articleHeading}>Wytrzymałość</h3>
                    <p className={styles.sectionGrid__text}>Nasze produkty są zaprojektowane, aby towarzyszyć Ci przez wiele lat. Każdy zegarek i element biżuterii jest testowany i projektowany, aby wytrzymać próbę czasu.</p>
                </article>
            </section>
            <section className={styles.section}>
                <img className={styles.section__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/assets/o-firmie-brand-history.jpg`} alt="zegarek ze skórzaną opaską" />
                <div className={styles.section__content}>
                    <h2 className={styles.section__heading}>Historia marki</h2>
                    <p className={styles.section__text}>Nasza marka powstała w 1927, kiedy to marzenie o tworzeniu wyjątkowej biżuterii i zegarków stało się rzeczywistością. Od tego czasu nasza pasja do piękna i doskonałości przewodzą naszej działalności. Dzięki wieloletniemu doświadczeniu i uwielbieniu dla detali, nasze produkty to nie tylko przedmioty, to historie i emocje. Jesteśmy gotowi, aby podzielić się nimi z Tobą.</p>
                </div>
            </section>
        </main>
    )
}

export default About
