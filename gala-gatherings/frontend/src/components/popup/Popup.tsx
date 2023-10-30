

import styles from './popup.module.css';

interface Props {
    children: string | null,
    type: 'good' | 'bad',
    active: boolean
}

const Popup = ({ children, type, active }: Props) => {
    return (
        <p role='alert' aria-live='assertive' style={{ backgroundColor: type === 'good' ? 'rgba(0,255,0,.9)' : 'rgba(255,0,0,.9)' }} className={`${styles.popup} ${active && styles.popup_active}`}>{children}</p>
    )
}

export default Popup
