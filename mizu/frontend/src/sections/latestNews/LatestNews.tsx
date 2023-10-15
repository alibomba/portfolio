import { useEffect, useState } from 'react';
import LinkTile from '../../components/linkTile/LinkTile';
import { Link } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';
import styles from './latestNews.module.css';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import axiosClient from '../../axiosClient';
import axios from 'axios';

const LatestNews = () => {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [noResults, setNoResults] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: '/latest-news',
            cancelToken: source.token
        })
            .then(res => {
                setNews(res.data);
            })
            .catch(err => {
                if (err?.response?.status === 404) {
                    setNoResults(true);
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

    if (noResults) {
        return <></>
    }

    return (
        <section className={styles.section}>
            <h2 className={styles.section__heading}>Najnowsze aktualności</h2>
            <div className={styles.section__news}>
                {
                    news.map(news => {
                        return (
                            <LinkTile
                                key={news.id}
                                id={news.id}
                                heading={news.title}
                                text={news.content}
                                image={news.image}
                                variant='news'
                                className={styles.section__tile}
                            />
                        )
                    })
                }
                <Link className={styles.section__link} to='/aktualnosci'>
                    <AiOutlineRight className={styles.link__icon} />
                    <span className={styles.link__text}>Zobacz więcej</span>
                </Link>
            </div>
        </section>
    )
}

export default LatestNews
