


import styles from './offerRecruitment.module.css';

interface Props {
    recruitmentStages: string[]
}

const OfferRecruitment = ({ recruitmentStages }: Props) => {
    return (
        <section className={styles.section}>
            <h2 className={styles.section__heading}>Kroki rekrutacji:</h2>
            <div className={styles.section__list}>
                {
                    recruitmentStages.map((stage, index) => {
                        return (
                            <article key={index + 1} className={styles.section__item}>
                                <p className={styles.item__number}>{index + 1}</p>
                                <p className={styles.item__content}>{stage}</p>
                            </article>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default OfferRecruitment
