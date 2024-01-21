


import styles from './offerListSection.module.css';

interface Props {
    heading: string,
    items: string[]
}

const OfferListSection = ({ heading, items }: Props) => {
    return (
        <section className={styles.section}>
            <h2 className={styles.section__heading}>{heading}:</h2>
            <ul className={styles.section__list}>
                {
                    items.map(item => <li className={styles.section__listItem} key={item}>{item}</li>)
                }
            </ul>
        </section>
    )
}

export default OfferListSection
