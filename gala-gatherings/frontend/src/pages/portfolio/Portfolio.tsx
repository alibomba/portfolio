import { useState, useEffect } from 'react';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import axiosClient from '../../axiosClient';
import axios from 'axios';
import PortfolioTile from '../../components/portfolioTile/PortfolioTile';
import Pagination from '../../components/pagination/Pagination';

import styles from './portfolio.module.css';

const Portfolio = () => {
    const [projects, setProjects] = useState<PaginationResponse<PortfolioProject> | null>(null);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: `/portfolio?page=${page}`,
            cancelToken: source.token
        })
            .then(res => {
                setProjects(res.data);
            })
            .catch(err => {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            })
            .finally(() => setLoading(false));

        return () => {
            source.cancel();
        }

    }, [page]);


    if (loading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <main className={styles.main}>
            <div className={styles.main__grid}>
                {
                    (projects &&
                        projects.data.length > 0) &&
                    projects.data.map(project => {
                        return (
                            <PortfolioTile
                                key={project.id}
                                id={project.id}
                                title={project.title}
                                description={project.content}
                                image={project.images[0].url}
                                date={project.date}
                            />
                        )
                    })
                }
            </div>
            <Pagination
                page={page}
                lastPage={projects?.lastPage}
                setPage={setPage}
            />
        </main>
    )
}

export default Portfolio
