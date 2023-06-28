import styles from './sectionBorder.module.css';

type BorderColor = 'primary' | 'secondary' | 'tertiary';

const SectionBorder = ({ color }: { color: BorderColor }) => {
    return (
        <div className={`${styles[color]} ${styles.div}`}></div>
    )
}

export default SectionBorder
