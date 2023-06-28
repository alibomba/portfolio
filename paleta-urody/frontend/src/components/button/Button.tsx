import { ReactNode, FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './button.module.css';

interface Props {
    backgroundColor: string,
    as: 'link' | 'button',
    href: string,
    className?: string,
    children: ReactNode
}

const Button: FC<Props> = ({ backgroundColor, as, href, className, children }) => {
    if (as === 'button') {
        return (
            <button style={{ backgroundColor }} className={`${styles.button} ${className && className}`}>
                {children}
            </button>
        )
    }
    else if (as === 'link') {
        return (
            <Link to={href} style={{ backgroundColor }} className={`${styles.button} ${className && className}`}>
                {children}
            </Link>
        )
    }

    return null;

}

export default Button
