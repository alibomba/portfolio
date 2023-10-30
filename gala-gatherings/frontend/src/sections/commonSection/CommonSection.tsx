

import styles from './commonSection.module.css';

interface Props {
    heading: string;
    children: string;
    image: string;
    imageAlt: string;
    textFirst: boolean;
}

const CommonSection = ({ heading, children, image, imageAlt, textFirst }: Props) => {
    return (
        <section className={styles.section}>
            {
                !textFirst && <img className={styles.section__img} src={image} alt={imageAlt} />
            }
            <div className={styles.section__content}>
                <h2 className={styles.section__heading}>{heading}</h2>
                <p className={styles.section__text}>{children}</p>
            </div>
            {
                textFirst && <img className={styles.section__img} src={image} alt={imageAlt} />
            }
        </section>
    )
}

export default CommonSection
