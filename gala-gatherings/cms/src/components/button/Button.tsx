


import styles from './button.module.css';

interface Props {
    children: string;
    className?: string;
}

const Button = ({ children, className }: Props) => {
    return (
        <button className={`${styles.button} ${className && className}`}>{children}</button>
    )
}

export default Button
