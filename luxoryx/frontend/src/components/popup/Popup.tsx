

import styles from './popup.module.css';

interface Props {
    children: string | null;
    type: 'good' | 'bad';
    active: boolean;
}

const Popup = ({ children, type, active }: Props) => {
    return (
        <p style={{ backgroundColor: type === 'good' ? 'rgba(0,255,0,.7)' : 'rgba(255,0,0,.7)' }} className={`${styles.popup} ${active && styles.popup_active}`}>{children && children}</p>
    )
}

export default Popup
