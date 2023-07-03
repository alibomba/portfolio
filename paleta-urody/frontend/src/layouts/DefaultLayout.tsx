import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../sections';
import SectionBorder from '../components/sectionBorder/SectionBorder';
import Pusher from 'pusher-js';
import styles from './defaultLayout.module.css';

interface Notification {
    data: string
}

const DefaultLayout = () => {
    const [notification, setNotification] = useState<string | null>(null);

    const pusher = new Pusher('ef2fd53c792a9cbac4b5', {
        cluster: 'eu'
    });

    useEffect(() => {
        const channel = pusher.subscribe('NotificationChannel');
        channel.bind('PostNotification', (notification: Notification) => {
            const data = notification.data;
            setNotification(data);
            setTimeout(() => setNotification(null), 5000);
        })

        return () => {
            pusher.unsubscribe('NotificationChannel');
        }
    }, []);

    return (
        <>
            <Header />
            <SectionBorder color='primary' />
            <Outlet />
            <SectionBorder color='primary' />
            <Footer />
            <div role='alert' aria-live={notification ? 'assertive' : 'off'} className={`${styles.notification} ${notification && styles.notification_active}`}>{notification}</div>
        </>
    )
}

export default DefaultLayout
