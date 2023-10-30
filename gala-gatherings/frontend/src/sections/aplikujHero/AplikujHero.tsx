

import styles from './aplikujHero.module.css';

const AplikujHero = () => {
    return (
        <section style={{ backgroundImage: `url('${process.env.REACT_APP_BACKEND_URL}/storage/assets/aplikuj-hero.webp')` }} className={styles.hero}>
            <h1 className={styles.hero__heading}>Aplikuj o pracę</h1>
            <p className={styles.hero__text}>Czy jesteś gotowy dołączyć do zespołu GalaGatherings? Szukamy kreatywnych i zaangażowanych profesjonalistów, którzy mają pasję do tworzenia wyjątkowych wydarzeń. Dołącz do nas i pomóż nam realizować marzenia naszych klientów. Tutaj Twoja kreatywność i talent mają miejsce do rozwoju.</p>
        </section>
    )
}

export default AplikujHero
