
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import axiosClient from '../../axiosClient';
import Error from '../error/Error';

import styles from './projectTile.module.css';
import formatDate from '../../utilities/formatDate';

interface Props {
    id: string,
    title: string,
    image: string,
    date: string
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

const ProjectTile = ({ id, title, image, date, setProjects }: Props) => {
    const [error, setError] = useState<string | null>(null);

    async function deleteProject() {
        const confirmation = window.confirm('Czy na pewno chcesz usunąć projekt?');
        if (confirmation) {
            try {
                await axiosClient({
                    method: 'delete',
                    url: `/project/${id}`
                });
                setProjects(prev => {
                    const newValue = prev.filter(item => item.id !== id);
                    return newValue;
                })
            } catch (err) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <article className={styles.project}>
            <div className={styles.project__text}>
                <h3 className={styles.project__title}>{title}</h3>
                <p className={styles.project__date}>{formatDate(date)}</p>
            </div>
            <img className={styles.project__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/portfolio/${image}`} alt="miniatura projektu" />
            <Link aria-label='Edytuj projekt' to={`/portfolio/${id}`} className={`${styles.project__button} ${styles.project__edit}`}>
                <MdEdit />
            </Link>
            <button onClick={deleteProject} aria-label='Usuń projekt' className={`${styles.project__button} ${styles.project__delete}`}>
                <AiFillDelete />
            </button>
        </article>
    )
}

export default ProjectTile
