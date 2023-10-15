

import styles from './about.module.css';

const About = () => {
    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <div className={styles.section__content}>
                    <h2 className={styles.section__heading}>Nasz cel</h2>
                    <p className={styles.section__text}>Nasz główny cel jest prosty, ale głęboko zakorzeniony w naszej misji: chcemy chronić i zachować nasze środowisko dla teraźniejszych i przyszłych pokoleń. Dążymy do stworzenia zrównoważonej przyszłości, w której ludzie i natura współistnieją harmonijnie.</p>
                </div>
                <img className={styles.section__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/assets/o-nas-nasz-cel.webp`} alt="grupa młodych ludzi" />
            </section>
            <section className={styles.section}>
                <img className={styles.section__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/assets/o-nas-nasze-wartosci.webp`} alt="biurko z laptopem i kalendarzem" />
                <div className={styles.section__content}>
                    <h2 className={styles.section__heading}>Nasze wartości</h2>
                    <p className={styles.section__text}>Naszą organizację kierują fundamentalne wartości: poszanowanie przyrody, zrównoważony rozwój, edukacja ekologiczna i współpraca społeczna. Te wartości stanowią fundament naszych działań i inspirują naszą misję ochrony środowiska.</p>
                </div>
            </section>
            <section className={styles.team}>
                <h2 className={styles.team__heading}>Zespół</h2>
                <div className={styles.team__grid}>
                    <article className={styles.team__person}>
                        <img className={styles.person__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/assets/team/anna-kowalska.webp`} alt="Anna Kowalska" />
                        <p className={styles.person__name}>Anna Kowalska</p>
                        <p className={styles.person__role}>Ekspert ds. Edukacji Ekologicznej</p>
                    </article>
                    <article className={styles.team__person}>
                        <img className={styles.person__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/assets/team/piotr-nowak.webp`} alt="Piotr Nowak" />
                        <p className={styles.person__name}>Piotr Nowak</p>
                        <p className={styles.person__role}>Koordynator wolontariuszy</p>
                    </article>
                    <article className={styles.team__person}>
                        <img className={styles.person__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/assets/team/magdalena-wisniewska.webp`} alt="Magdalena Wiśniewska" />
                        <p className={styles.person__name}>Magdalena Wiśniewska</p>
                        <p className={styles.person__role}>Specjalistka ds. Kampanii Społecznych</p>
                    </article>
                    <article className={styles.team__person}>
                        <img className={styles.person__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/assets/team/krzysztof-szymanski.webp`} alt="Krzysztof Szymański" />
                        <p className={styles.person__name}>Krzysztof Szymański</p>
                        <p className={styles.person__role}>Specjalista ds. Ochrony Wód</p>
                    </article>
                    <article className={styles.team__person}>
                        <img className={styles.person__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/assets/team/ewa-nowakowska.webp`} alt="Ewa Nowakowska" />
                        <p className={styles.person__name}>Ewa Nowakowska</p>
                        <p className={styles.person__role}>Koordynatorka Projektów Ekologicznych</p>
                    </article>
                    <article className={styles.team__person}>
                        <img className={styles.person__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/assets/team/marcin-kowalczyk.webp`} alt="Marcin Kowalczyk" />
                        <p className={styles.person__name}>Marcin Kowalczyk</p>
                        <p className={styles.person__role}>Specjalista ds. Zrównoważonego Rozwoju</p>
                    </article>
                </div>
            </section>
            <section className={styles.section}>
                <div className={styles.section__content}>
                    <h2 className={styles.section__heading}>Początki</h2>
                    <p className={styles.section__text}>Naszą organizację kierują fundamentalne wartości: poszanowanie przyrody, zrównoważony rozwój, edukacja ekologiczna i współpraca społeczna. Te wartości stanowią fundament naszych działań i inspirują naszą misję ochrony środowiska.</p>
                </div>
                <img className={styles.section__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/assets/o-nas-poczatki.webp`} alt="dom na wzgórzu z polaną i laskiem" />
            </section>
            <section className={styles.youtube}>
                <h2 className={styles.youtube__heading}>Kanał na YouTube</h2>
                <iframe className={styles.youtube__iframe} width="560" height="315" src="https://www.youtube.com/embed/18xB7LFRv6E?si=8dErCE1kmMxZIoIT" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </section>
        </main>
    )
}

export default About
