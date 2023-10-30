import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AiOutlineFilePdf } from 'react-icons/ai';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import axiosClient from '../../axiosClient';
import axios from 'axios';


import styles from './application.module.css';

const Application = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [application, setApplication] = useState<JobApplication | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const source = axios.CancelToken.source();

            axiosClient({
                method: 'get',
                url: `/job-applications/${id}`,
                cancelToken: source.token
            })
                .then(res => {
                    setApplication(res.data);
                })
                .catch(err => {
                    if (err?.response?.status === 404) {
                        navigate('/aplikacje');
                    }
                    else {
                        setError('Coś poszło nie tak, spróbuj ponownie później...');
                    }
                })
                .finally(() => setIsLoading(false));

            return () => {
                source.cancel();
            }

        } else {
            navigate('/aplikacje');
        }
    }, [id]);


    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            {
                application &&
                <main className={styles.main}>
                    <h1 className={styles.main__author}>{application.firstName} {application.lastName}</h1>
                    <p className={styles.main__subText}>{application.jobPosition}</p>
                    <p className={styles.main__subText}>{application.email}</p>
                    <p className={styles.main__subText}>Tel: {application.phoneNumber}</p>
                    {
                        application.cvUrl &&
                        <a className={styles.main__cvLink} target='_blank' href={`${process.env.REACT_APP_BACKEND_URL}/storage/cvs/${application.cvUrl}`}>
                            <AiOutlineFilePdf className={styles.main__cvLink__icon} /> Pobierz CV
                        </a>
                    }
                    {
                        application.details && <p className={styles.main__text}>{application.details}</p>
                    }
                </main>
            }
        </>
    )
}

export default Application
