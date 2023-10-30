import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import axiosClient from '../../axiosClient';
import axios from 'axios';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';

import styles from './projekt.module.css';
import formatDate from '../../utilities/formatDate';

const Projekt = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [project, setProject] = useState<PortfolioProject | null>(null);
    const [imageIndex, setImageIndex] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: `/project/${id}`,
            cancelToken: source.token
        })
            .then(res => {
                setProject(res.data);
            })
            .catch(err => {
                if (err?.response?.status === 404) {
                    navigate('/404');
                }
                else {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
            })
            .finally(() => setLoading(false));

        return () => {
            source.cancel();
        }

    }, []);

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            {
                project &&
                <>
                    <div style={{ backgroundImage: `url('${process.env.REACT_APP_BACKEND_URL}/storage/portfolio/${project.images[imageIndex].url}')` }} className={styles.img}>
                        {
                            imageIndex !== 0 &&
                            <button onClick={() => setImageIndex(prev => prev - 1)} className={styles.img__button} title='Poprzednie zdjęcie'>
                                <BsFillArrowLeftCircleFill />
                            </button>
                        }
                        {
                            imageIndex !== project.images.length - 1 &&
                            <button onClick={() => setImageIndex(prev => prev + 1)} className={styles.img__button} title='Następne zdjęcie'>
                                <BsFillArrowRightCircleFill />
                            </button>
                        }
                    </div>
                    <main className={styles.main}>
                        <header className={styles.main__header}>
                            <h1 className={styles.header__title}>{project.title}</h1>
                            <p className={styles.header__date}>{formatDate(project.date)}</p>
                        </header>
                        <p className={styles.main__content}>{project.content}</p>
                    </main>
                </>
            }
        </>
    )
}

export default Projekt
