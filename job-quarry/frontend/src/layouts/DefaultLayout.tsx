import { useEffect, useState } from 'react';
import { useLazyQuery, useSubscription } from '@apollo/client';
import { GET_MY_NOTIFICATIONS } from '../graphql/queries';
import { useSelector, useDispatch } from 'react-redux';
import { setIsSomethingNew, setInitialNotifications, addNotification } from '../state/notificationSlice';
import areThereNewNotifications from '../utils/areThereNewNotifications';
import { Outlet } from "react-router-dom";
import { Header, Footer } from "../sections";
import { RootState } from '../state/store';
import Error from '../components/error/Error';
import Loading from '../components/loading/Loading';
import { NOTIFICATION_SUBSCRIPTION } from '../graphql/subscriptions';

const DefaultLayout = () => {
    const dispatch = useDispatch();
    const { isAuthorized, isLoading } = useSelector((state: RootState) => state.auth);
    useSubscription(NOTIFICATION_SUBSCRIPTION, {
        skip: !isAuthorized,
        onData: (data) => {
            const newNotification = data.data.data.notificationCreated as UserNotification;
            dispatch(setIsSomethingNew(true));
            dispatch(addNotification(newNotification));
        }
    });
    const [myNotificationsQuery] = useLazyQuery(GET_MY_NOTIFICATIONS);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            if (!isLoading && isAuthorized) {
                const { data, error } = await myNotificationsQuery();
                if (error) {
                    setError('Coś poszło nie tak, spróbuj ponownie później');
                    return;
                }
                dispatch(setIsSomethingNew(areThereNewNotifications(data.getMyNotifications)));
                dispatch(setInitialNotifications(data.getMyNotifications));
            }
        }

        fetchData();

    }, [isLoading]);

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default DefaultLayout
