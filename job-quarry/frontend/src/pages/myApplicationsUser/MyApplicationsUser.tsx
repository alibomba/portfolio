import { useState, useEffect } from 'react';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import { useLazyQuery } from '@apollo/client';
import { GET_MY_APPLICATIONS_USER } from '../../graphql/queries';
import MyApplicationUser from '../../components/myApplicationUser/MyApplicationUser';

import styles from './myApplicationsUser.module.css';

const MyApplicationsUser = () => {
    const [applicationsQuery] = useLazyQuery(GET_MY_APPLICATIONS_USER);
    const [applications, setApplications] = useState<MyApplicationUser[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            const { data, error } = await applicationsQuery();
            if (error) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
                return;
            }
            setApplications(data.getMyApplicationsUser);
            setIsLoading(false);
        }

        fetchData();
    }, []);

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <main className={styles.main}>
            {
                applications.length > 0 ?
                    applications.map(application => {
                        return (
                            <MyApplicationUser
                                key={application._id}
                                offer={application.offer}
                                status={application.status}
                            />
                        )
                    })
                    :
                    <p className={styles.main__noResults}>Brak aplikacji</p>
            }
        </main>
    )
}

export default MyApplicationsUser