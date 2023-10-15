import { useState, useEffect } from 'react';
import Error from '../../components/error/Error';
import Loading from '../../components/loading/Loading';
import LinkTile from '../../components/linkTile/LinkTile';
import axiosClient from '../../axiosClient';
import axios from 'axios';

import styles from './projectsAndNews.module.css';
import Pagination from '../../components/pagination/Pagination';

interface Props {
    variant: 'projects' | 'news';
}

const ProjectsAndNews = ({ variant }: Props) => {
    const [tiles, setTiles] = useState<PaginationResponse<Project | News> | null>(null);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: `/${variant}?page=${page}`,
            cancelToken: source.token
        })
            .then(res => {
                setTiles(res.data);
            })
            .catch(err => {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            })
            .finally(() => setLoading(false));

        return () => {
            source.cancel();
        }

    }, [page, variant]);

    if (error) {
        return <Error>{error}</Error>
    }

    if (loading) {
        return <Loading />
    }

    return (
        <main className={styles.main}>
            <div className={styles.main__grid}>
                {
                    (tiles && tiles.data.length > 0) &&
                    tiles.data.map(tile => {
                        return (<LinkTile
                            key={tile.id}
                            id={tile.id}
                            heading={tile.title}
                            image={tile.image}
                            text={tile.content}
                            variant={variant === 'projects' ? 'project' : 'news'}
                            className={styles.main__tile}
                        />)
                    })
                }
            </div>
            <Pagination
                page={page}
                setPage={setPage}
                lastPage={tiles?.lastPage}
            />
        </main>
    )
}

export default ProjectsAndNews
