import { useState } from 'react';
import Button from '../button/Button';


import styles from './cta.module.css';

const CTA = ({ classes }) => {
    const [isPlaceholderSmall, setIsPlaceholderSmall] = useState(false);

    function checkPlaceholder(e) {
        const value = e.target.value;
        const eventName = e._reactName;
        if (eventName === 'onBlur') {
            if (value === '') {
                setIsPlaceholderSmall(false);
            }
            else {
                setIsPlaceholderSmall(true);
            }
        }
        else if (eventName === 'onChange' || eventName === 'onFocus') {
            setIsPlaceholderSmall(true);
        }
    }

    return (
        <div className={classes} style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
            <div className={styles.inputContainer}>
                <input onChange={checkPlaceholder} onFocus={checkPlaceholder} onBlur={checkPlaceholder} type="text" className={styles.cta__input} />
                <p className={`${styles.inputPlaceholder} ${isPlaceholderSmall ? styles.inputPlaceholder_small : styles.inputPlaceholder_big}`}>Adres e-mail</p>
            </div>
            <Button
                backgroundColor="#E50914"
                size="button--md"
                href="https://www.netflix.com/signup/password?locale=pl-PL"
                arrow={true}
            >Rozpocznij</Button>
        </div>
    )
}

export default CTA
