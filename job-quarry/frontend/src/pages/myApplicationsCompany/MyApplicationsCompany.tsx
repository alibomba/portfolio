import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_MY_APPLICATIONS_COMPANY } from '../../graphql/queries';
import MyApplicationCompany from '../../components/myApplicationCompany/MyApplicationCompany';
import Pagination from '../../components/pagination/Pagination';
import styles from './myApplicationsCompany.module.css';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';

const MyApplicationsCompany = () => {
    const [applications, setApplications] = useState<PaginationResponse<MyApplicationCompany> | null>(null);
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [applicationsQuery] = useLazyQuery(GET_MY_APPLICATIONS_COMPANY);

    useEffect(() => {
        async function fetchData() {
            const { data, error } = await applicationsQuery({ variables: { page } });
            if (error) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
                return;
            }
            setApplications(data.getMyApplicationsCompany);
            setIsLoading(false);
        }

        fetchData();
    }, [page]);

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <main className={styles.main}>
            {
                applications && applications.data.length > 0 ?
                    <div className={styles.main__grid}>
                        {
                            applications.data.map(application => {
                                return (
                                    <MyApplicationCompany
                                        key={application._id}
                                        application={application}
                                    />
                                )
                            })
                        }
                    </div>
                    :
                    <p className={styles.main__noResults}>Brak aplikacji</p>
            }
            {
                (applications && applications.lastPage > 1) &&
                <Pagination
                    page={applications.currentPage}
                    lastPage={applications.lastPage}
                    setPage={setPage}
                />
            }
        </main>
    )
}

export default MyApplicationsCompany
