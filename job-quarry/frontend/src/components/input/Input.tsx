


import styles from './input.module.css';

interface Props {
    id?: string;
    type: string;
    label?: string;
    placeholder: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    onChange?: (e: React.ChangeEvent) => void;
    value?: string;
    required?: boolean;
    className?: string;
}

const Input = ({ id, type, label, placeholder, minLength, maxLength, min, max, onChange, value, required, className }: Props) => {
    return (
        <input className={`${styles.input} ${className && className}`} id={id} type={type} aria-label={label} placeholder={placeholder} minLength={minLength} maxLength={maxLength} min={min} max={max} onChange={onChange} value={value} required={required && true} />
    )
}

export default Input
