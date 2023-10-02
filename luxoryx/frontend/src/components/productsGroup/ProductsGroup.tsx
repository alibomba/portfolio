

import styles from './productsGroup.module.css';

interface Props {
    children: React.ReactNode;
    marginTop: string;
}

const ProductsGroup = ({ children, marginTop }: Props) => {
    return (
        <div style={{ marginTop }} className={styles.group}>
            {children}
        </div>
    )
}

export default ProductsGroup
