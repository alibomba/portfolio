


import styles from './offerTechnologies.module.css';

interface Props {
    requiredTechnologies: string[],
    optionalTechnologies: string[]
}

const OfferTechnologies = ({ requiredTechnologies, optionalTechnologies }: Props) => {
    return (
        <section className={styles.section}>
            <h2 className={styles.section__heading}>Technologie:</h2>
            <div className={styles.section__block}>
                <h3 className={styles.section__subheading}>Wymagane:</h3>
                <div className={styles.section__row}>
                    {
                        requiredTechnologies.map(technology => <p key={technology} className={styles.section__technology}>{technology}</p>)
                    }
                </div>
            </div>
            {
                optionalTechnologies.length > 0 &&
                <div className={styles.section__block}>
                    <h3 className={styles.section__subheading}>Mile widziane:</h3>
                    <div className={styles.section__row}>
                        {
                            optionalTechnologies.map(technology => <p key={technology} className={styles.section__technology}>{technology}</p>)
                        }
                    </div>
                </div>
            }
        </section>
    )
}

export default OfferTechnologies
