import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './notifications.module.css';
import { RootState } from '../../state/store';

const Notifications = () => {
    const { notifications } = useSelector((state: RootState) => state.notification);

    return (
        <div className={styles.notifications}>
            {
                notifications.length > 0 ?
                    <>
                        {
                            notifications.map(notification => {
                                return (
                                    <Link key={notification._id} to={notification.redirect} className={styles.notification}>
                                        <img className={styles.notification__img} src={notification.image || '/default.webp'} alt="miniatura powiadomienia" />
                                        <span className={styles.notification__message}>{notification.message}</span>
                                    </Link>
                                )
                            })
                        }
                    </>
                    :
                    <p className={styles.notifications__noResults}>Brak powiadomień</p>
            }
        </div>
    )
}

export default Notifications
