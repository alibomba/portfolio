import { CommonSection, Testimonials } from '../../sections';

import styles from './about.module.css';

const About = () => {
    return (
        <main className={styles.main}>
            <CommonSection
                heading='Historia firmy'
                image={`${process.env.REACT_APP_BACKEND_URL}/storage/assets/od-lat-na-rynku.webp`}
                imageAlt='klepsydra z piaskiem'
                textFirst={true}
            >
                Nasza historia to opowieść o pasji i determinacji. GalaGatherings powstało z miłości do organizacji wydarzeń i marzenia o tworzeniu wyjątkowych chwil dla innych. Od pierwszego dnia kładziemy nacisk na profesjonalizm, kreatywność i nieustanny rozwój, co pozwoliło nam stać się jednym z wiodących graczy w branży organizacji wydarzeń specjalnych.
            </CommonSection>
            <CommonSection
                heading='Wartości'
                image={`${process.env.REACT_APP_BACKEND_URL}/storage/assets/wartosci.webp`}
                imageAlt='zespół młodych ludzi'
                textFirst={false}
            >
                Nasze wartości to fundament, na którym budujemy naszą firmę. Uwielbiamy to, co robimy, i wierzymy, że nasza pasja przekłada się na niezapomniane wydarzenia. Nasze wartości obejmują profesjonalizm, kreatywność, zaufanie i zaangażowanie. Stawiamy na wysoką jakość usług i dbałość o każdy szczegół, aby dostarczyć klientom wyjątkowe przeżycia, których nigdy nie zapomną.
            </CommonSection>
            <CommonSection
                heading='Kariera'
                image={`${process.env.REACT_APP_BACKEND_URL}/storage/assets/kariera.webp`}
                imageAlt='uścisk dłoni dwóch osób'
                textFirst={true}
            >
                W GalaGatherings nie tworzymy tylko wyjątkowych wydarzeń - tworzymy także wyjątkowe szanse kariery. Nasz zespół to serce naszej firmy, a nasi pracownicy są naszym największym skarbem. Jeśli jesteś gotów dołączyć do naszej rodziny i tworzyć razem z nami niezapomniane chwile, zapoznaj się z naszymi ofertami pracy i dowiedz się, dlaczego praca w GalaGatherings może być Twoim następnym wielkim krokiem w karierze.
            </CommonSection>
            <Testimonials heading='Opinie klientów' />
        </main>
    )
}

export default About
