import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './notFound.module.css';
import { BsEmojiDizzyFill } from 'react-icons/bs';

const NotFound = () => {

    const [iconSize, setIconSize] = useState(0);
    function checkIconSize() {
        const screenWidth = window.screen.width;
        if (screenWidth > 600) {
            setIconSize(100);
        }
        else {
            setIconSize(50);
        }
    }

    useEffect(() => {
        window.addEventListener('resize', checkIconSize);
        checkIconSize();
    }, [])

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <BsEmojiDizzyFill size={iconSize} />
                <p>Przepraszamy</p>
                <p>Nie znaleziono strony o podanym adresie</p>
                <Link style={{
                    display: 'block',
                    marginTop: '.5em',
                    color: 'inherit'
                }} to='/'>Strona Główna</Link>
            </div>
        </div>
    )
}

export default NotFound
