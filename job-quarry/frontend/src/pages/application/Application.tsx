import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { IoMdLink } from 'react-icons/io';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_APPLICATION_COMPANY, GET_MY_APPLICATIONS_COMPANY } from '../../graphql/queries';
import { CHANGE_APPLICATION_STATUS } from '../../graphql/mutations';
import styles from './application.module.css';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import Popup from '../../components/popup/Popup';

const Application = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [applicationQuery] = useLazyQuery(GET_APPLICATION_COMPANY);
    const [statusMutation] = useMutation(CHANGE_APPLICATION_STATUS, {
        refetchQueries: [
            { query: GET_APPLICATION_COMPANY }, { query: GET_MY_APPLICATIONS_COMPANY }
        ]
    })
    const [application, setApplication] = useState<ApplicationFull | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup>({ content: null, active: false, type: 'good' });

    async function handleStatusChange(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement;
        const span = input.nextElementSibling as HTMLSpanElement;
        const newStatus = span.innerText;
        try {
            await statusMutation({
                variables: {
                    input: {
                        id,
                        status: newStatus
                    }
                }
            });
            setPopup({ content: 'Zmieniono status aplikacji', active: true, type: 'good' });
            setTimeout(() => setPopup(prev => ({ ...prev, active: false })));
        } catch (err) {
            setError('Coś poszło nie tak, spróbuj ponownie później...');
        }
        setApplication(prev => {
            if (prev) {
                return { ...prev, status: newStatus };
            } else return prev;
        });
    }

    useEffect(() => {
        async function fetchData() {
            const { data, error } = await applicationQuery({ variables: { getApplicationId: id } });
            if (error) {
                const graphQLError = error.graphQLErrors[0];
                if (graphQLError.extensions.code === 'NOT_FOUND') {
                    navigate('/404');
                }
                else {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
                return;
            }
            setApplication(data.getApplication);
            setIsLoading(false);
        }

        fetchData();
    }, [id]);

    if (isLoading || !application) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <main className={styles.main}>
            <header className={styles.main__header}>
                <h1 className={styles.header__offerTitle}>{application.offer.title}</h1>
                <p className={styles.header__bold}>{application.name} {application.surname}</p>
                <p className={styles.header__subtitle}>{application.email}</p>
                <p className={styles.header__subtitle}>{application.phoneNumber}</p>
                <b className={styles.header__bold}>Status:</b>
                <form className={styles.header__row}>
                    <label className={styles.header__label}>
                        <input onChange={handleStatusChange} checked={application.status === 'Oczekujące'} name='status' type="radio" className={styles.header__radio} />
                        <span className={styles.header__labelText}>Oczekujące</span>
                    </label>
                    <label className={styles.header__label}>
                        <input onChange={handleStatusChange} checked={application.status === 'Odrzucone'} name='status' type="radio" className={styles.header__radio} />
                        <span className={styles.header__labelText}>Odrzucone</span>
                    </label>
                    <label className={styles.header__label}>
                        <input onChange={handleStatusChange} checked={application.status === 'Zaakceptowane'} name='status' type="radio" className={styles.header__radio} />
                        <span className={styles.header__labelText}>Zaakceptowane</span>
                    </label>
                </form>
            </header>
            <div className={styles.main__row}>
                {
                    (application.user && application.user.portfolio) &&
                    <a className={styles.main__button} href={application.user.portfolio} target='_blank'>
                        <IoMdLink />
                        <span>Portfolio</span>
                    </a>
                }
                {
                    application.user &&
                    <>
                        <Link className={styles.main__button} to={`/profil/${application.user._id}`}>Profil</Link>
                        <Link className={styles.main__button} to={`/czaty?id=${application.user._id}`}>Wyślij wiadomość</Link>
                    </>
                }
                <a className={styles.main__button} href={application.CV} target='_blank'>CV</a>
            </div>
            {
                application.details && <p className={styles.main__description}>{application.details}</p>
            }
            <Link className={`${styles.main__button} ${styles.main__button_offerLink}`} to={`/oferta/${application.offer._id}`}>Oferta</Link>
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </main>
    )
}

export default Application
