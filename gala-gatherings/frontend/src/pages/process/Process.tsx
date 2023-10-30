

import styles from './process.module.css';

const Process = () => {
    return (
        <main className={styles.main}>
            <header className={styles.main__header}>
                <h1 className={styles.header__heading}>Jak organizujemy wydarzenia</h1>
                <p className={styles.header__text}>W GalaGatherings dbamy o to, aby proces organizacji wydarzenia był łatwy, efektywny i dostosowany do indywidualnych potrzeb klientów. Oto kroki, które prowadzą do stworzenia niezapomnianego wydarzenia.</p>
            </header>
            <section className={styles.steps}>
                <article className={styles.step}>
                    <h3 className={styles.step__heading}>1.Konsultacja Początkowa</h3>
                    <p className={styles.step__text}>Pierwszy krok to spotkanie lub konsultacja z klientem, aby poznać jego potrzeby, cele i wizję wydarzenia.</p>
                </article>
                <article className={styles.step}>
                    <h3 className={styles.step__heading}>2.Wybór Usług i Planowanie</h3>
                    <p className={styles.step__text}>Gdy zrozumiemy cele klienta, pomagamy w wyborze odpowiednich usług i planujemy ogólny zakres wydarzenia.</p>
                </article>
                <article className={styles.step}>
                    <h3 className={styles.step__heading}>3.Przygotowanie Koncepcji</h3>
                    <p className={styles.step__text}>Tworzymy koncepcję wydarzenia, uwzględniając dekoracje, temat, lokalizację i harmonogram.</p>
                </article>
                <article className={styles.step}>
                    <h3 className={styles.step__heading}>4.Prezentacja Koncepcji</h3>
                    <p className={styles.step__text}>Prezentacja koncepcji klientowi wraz z możliwymi modyfikacjami i dostosowaniami.</p>
                </article>
                <article className={styles.step}>
                    <h3 className={styles.step__heading}>5.Finalizacja Planu i Kosztorysu</h3>
                    <p className={styles.step__text}>Po akceptacji koncepcji, tworzymy finalny plan wydarzenia oraz kosztorys.</p>
                </article>
                <article className={styles.step}>
                    <h3 className={styles.step__heading}>6.Realizacja Wydarzenia</h3>
                    <p className={styles.step__text}>Dzień wydarzenia, kiedy to nasz zespół realizuje wszystkie przygotowane wcześniej elementy planu.</p>
                </article>
                <article className={styles.step}>
                    <h3 className={styles.step__heading}>7.Koordynacja i Nadzór</h3>
                    <p className={styles.step__text}>Nasz zespół koordynuje przebieg wydarzenia, nadzoruje dostawców i dba o płynność przebiegu.</p>
                </article>
                <article className={styles.step}>
                    <h3 className={styles.step__heading}>8.Podsumowanie i Ocena</h3>
                    <p className={styles.step__text}>Po zakończeniu wydarzenia, przeprowadzamy podsumowanie i ocenę, aby zapewnić satysfakcję klienta.</p>
                </article>
            </section>
        </main>
    )
}

export default Process
