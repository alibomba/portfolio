import { useState, useEffect } from 'react';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import ProjectTile from '../../components/projectTile/ProjectTile';
import { Link } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import axios from 'axios';


import styles from './portfolio.module.css';

const Portfolio = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [howMany, setHowMany] = useState<number>(5);
    const [isMore, setIsMore] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: `/projects?howManyParam=${howMany}`,
            cancelToken: source.token
        })
            .then(res => {
                const data = res.data;
                setProjects(data.projects);
                setIsMore(data.isMore);
            })
            .catch(err => {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            })
            .finally(() => setLoading(false));

        return () => {
            source.cancel();
        }


    }, [howMany]);

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <main className={styles.main}>
            <Link to='/portfolio/dodaj' className={styles.main__button}>Dodaj</Link>
            <div className={styles.main__projects}>
                {
                    projects.length > 0 ?
                        projects.map(project => {
                            return (
                                <ProjectTile
                                    key={project.id}
                                    id={project.id}
                                    title={project.title}
                                    date={project.date}
                                    image={project.images[0].url}
                                    setProjects={setProjects}
                                />
                            )
                        })
                        :
                        <p className={styles.main__noResults}>Brak projektów</p>
                }

            </div>
            {
                isMore && <button onClick={() => setHowMany(prev => prev + 5)} className={styles.main__showMore}>Pokaż więcej</button>
            }
        </main>
    )
}

export default Portfolio
