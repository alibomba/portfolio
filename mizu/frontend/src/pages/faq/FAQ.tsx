
import { Link } from 'react-router-dom';

import styles from './faq.module.css';

const FAQ = () => {
    return (
        <main className={styles.main}>
            <section className={styles.questions}>
                <article className={styles.question}>
                    <h3 className={styles.question__heading}>Czym zajmuje się nasza organizacja non-profit?</h3>
                    <p className={styles.question__content}>Nasza organizacja non-profit zajmuje się ochroną środowiska naturalnego poprzez różnorodne projekty, inicjatywy edukacyjne oraz działania mające na celu promowanie zrównoważonego rozwoju i dbałości o naszą planetę.</p>
                </article>
                <article className={styles.question}>
                    <h3 className={styles.question__heading}>Jak mogę wesprzeć waszą organizację?</h3>
                    <p className={styles.question__content}>Możesz wesprzeć naszą organizację na wiele sposobów, włączając się do naszych działań wolontariackich, dokonując darowizn, uczestnicząc w naszych zbiórkach pieniędzy lub promując naszą misję w mediach społecznościowych.</p>
                </article>
                <article className={styles.question}>
                    <h3 className={styles.question__heading}>Czy mogę zostać wolontariuszem?</h3>
                    <p className={styles.question__content}>Tak, zachęcamy do włączenia się do naszego zespołu wolontariuszy. Skontaktuj się z nami, aby dowiedzieć się, jak możesz pomóc.</p>
                </article>
                <article className={styles.question}>
                    <h3 className={styles.question__heading}>Jakie projekty ekologiczne realizuje organizacja?</h3>
                    <p className={styles.question__content}>Nasza organizacja prowadzi różnorodne projekty, takie jak sadzenie drzew, ochrona wód, edukacja ekologiczna, walka z zanieczyszczeniem powietrza i wiele innych. Więcej informacji znajdziesz na naszej stronie internetowej.</p>
                </article>
            </section>
            <section className={styles.contact}>
                <h2 className={styles.contact__heading}>Masz inne pytanie?</h2>
                <Link className={styles.contact__button} to='/kontakt'>Kontakt</Link>
            </section>
        </main>
    )
}

export default FAQ
