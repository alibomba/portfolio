import { useEffect, useState } from 'react';
import LinkTile from '../../components/linkTile/LinkTile';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import axiosClient from '../../axiosClient';
import axios from 'axios';

import styles from './nearProjects.module.css';

const NearProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [noResults, setNoResults] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    axiosClient({
      method: 'get',
      url: '/nearest-projects',
      cancelToken: source.token
    })
      .then(res => {
        setProjects(res.data);
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

  if (error) {
    return <Error>{error}</Error>
  }

  if (loading) {
    return <Loading />
  }

  if (noResults) {
    return <></>
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.section__heading}>Najbliższe projekty</h2>
      <div className={styles.section__grid}>
        {
          projects.map(project => {
            return (
              <LinkTile
                key={project.id}
                id={project.id}
                heading={project.title}
                text={project.content}
                image={project.image}
                variant='project'
              />
            )
          })
        }
      </div>
    </section>
  )
}

export default NearProjects
