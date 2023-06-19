import { AiOutlineRight as ArrowRight } from 'react-icons/ai';
import styles from './button.module.css';

const Button = ({ backgroundColor, size, href, arrow, children }) => {
    return (
        <a className={`${styles.button} ${styles[size]}`} style={{ backgroundColor }} href={href} target='_blank' rel="noreferrer">
            {children} {arrow && <ArrowRight />}
        </a>
    )
}

export default Button