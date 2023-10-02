

import styles from './suppliers.module.css';

const Suppliers = () => {
    return (
        <section className={styles.suppliers}>
            <h2 className={styles.suppliers__heading}>Producenci</h2>
            <div className={styles.suppliers__grid}>
                <a target='_blank' href="https://www.seikowatches.com/">
                    <img className={styles.suppliers__logo} src={`${process.env.REACT_APP_BACKEND_URL}/storage/assets/suppliers/seiko.png`} alt="logo firmy Seiko" />
                </a>
                <a target='_blank' href="https://www.fossil.com/">
                    <img className={styles.suppliers__logo} src={`${process.env.REACT_APP_BACKEND_URL}/storage/assets/suppliers/fossil.png`} alt="logo firmy Fossil" />
                </a>
                <a target='_blank' href="https://wkruk.pl/">
                    <img className={styles.suppliers__logo} src={`${process.env.REACT_APP_BACKEND_URL}/storage/assets/suppliers/wkruk.png`} alt="logo firmy W.Kruk" />
                </a>
                <a target='_blank' href="https://www.swarovski.com/">
                    <img className={styles.suppliers__logo} src={`${process.env.REACT_APP_BACKEND_URL}/storage/assets/suppliers/swarovski.png`} alt="logo firmy Swarovski" />
                </a>
                <a target='_blank' href="https://www.casio.com/">
                    <img className={styles.suppliers__logo} src={`${process.env.REACT_APP_BACKEND_URL}/storage/assets/suppliers/casio.png`} alt="logo firmy Casio" />
                </a>
                <a target='_blank' href="https://aura-sklep.pl/">
                    <img className={styles.suppliers__logo} src={`${process.env.REACT_APP_BACKEND_URL}/storage/assets/suppliers/aura.png`} alt="logo firmy Aura" />
                </a>
            </div>
        </section>
    )
}

export default Suppliers
