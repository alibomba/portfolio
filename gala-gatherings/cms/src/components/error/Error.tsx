

import styles from './error.module.css';

interface Props {
    children: string | null;
}

const Error = ({ children }: Props) => {
    return (
        <p role='alert' aria-live='assertive' className={styles.error}>{children}</p>
    )
}

export default Error
