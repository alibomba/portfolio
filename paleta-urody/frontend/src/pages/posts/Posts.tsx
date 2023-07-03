import { useState, useEffect, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { MdAddCircleOutline } from 'react-icons/md';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { GrPrevious, GrNext } from 'react-icons/gr';

import styles from './posts.module.css';
import axiosClient from '../../axiosClient';
import axios from 'axios';
import getPostDate from '../../components/getPostDate';

interface Link {
    url: string | null;
    label: string;
    active: boolean;
}
interface Post {
    id: number;
    image: string;
    title: string;
    description: string;
    content: string;
    created_at: string;
    updated_at: string;
}
interface Posts {
    current_page: number;
    data: Post[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

interface Modal {
    idToDelete: number | undefined;
    elementToDelete: HTMLDivElement | undefined;
    isVisible: boolean;
}

const Posts = () => {
    const [posts, setPosts] = useState<Posts | null>(null);
    const [page, setPage] = useState<number>(1);
    const [modal, setModal] = useState<Modal>({
        idToDelete: undefined,
        elementToDelete: undefined,
        isVisible: false
    });

    useEffect(() => {
        setPosts(null);
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: '/posts',
            cancelToken: source.token
        })
            .then(res => {
                setPosts(res.data);
            })
            .catch(err => console.error(err));


        return () => {
            source.cancel();
        }

    }, [page]);

    const showDeletePost = (id: number, e: MouseEvent<SVGElement>): void => {
        const clicked = e.target as SVGElement;
        const postElement = clicked.closest('[data-selector="post"]') as HTMLDivElement;

        setModal({
            idToDelete: id,
            elementToDelete: postElement,
            isVisible: true
        });
    }

    const hideDeletePost = (): void => {
        setModal({
            idToDelete: undefined,
            elementToDelete: undefined,
            isVisible: false
        });
    }

    const deletePost = (): void => {
        axiosClient({
            method: 'delete',
            url: `/posts/${modal.idToDelete}`
        })
            .then(res => {
                modal.elementToDelete?.remove();
                hideDeletePost();
            })
            .catch(err => console.error(err));
    }

    return (
        <main className={styles.main}>
            <div
                role='alert'
                aria-live={modal.isVisible ? 'assertive' : 'off'}
                className={`${styles.modal} ${modal.isVisible && styles.modal_active}`}
            >
                <p className={styles.modal__title}>Czy na pewno chcesz usunąć post?</p>
                <div className={styles.modal__buttons}>
                    <button onClick={deletePost} className={styles.modal__button}>Tak</button>
                    <button onClick={hideDeletePost} className={styles.modal__button}>Nie</button>
                </div>
            </div>
            <h1 className={styles.heading}>Posty</h1>
            <Link
                to='/admin/posty/nowy'
                className={styles.newPost}
            >
                <MdAddCircleOutline />
                Dodaj post
            </Link>
            {!posts ? <img src="/img/loading.gif" alt="loading" style={{ display: 'block', margin: '0 auto' }} /> :
                <>
                    <div className={styles.main__posts}>
                        {
                            posts.data.map(post => {
                                return (
                                    <div className={styles.post} key={post.id} data-selector='post'>
                                        <img src={post.image} alt="miniatura bloga" className={styles.post__image} />
                                        <h3 className={styles.post__title}>{post.title}</h3>
                                        <p className={styles.post__date}>{getPostDate(new Date(post.created_at))}</p>
                                        <Link aria-label='edytuj post' to={`/admin/posty/${post.id}`}><AiOutlineEdit className={styles.post__edit} /></Link>
                                        <AiOutlineDelete onClick={(e) => showDeletePost(post.id, e)} role='button' aria-label='usuń post' className={styles.post__delete} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.main__links}>
                        <button
                            onClick={() => setPage(1)}
                            className={`${styles.links__link} ${styles.links__edge} ${page === 1 && styles.links__link_disabled}`}
                            disabled={page === 1}>
                            <GrPrevious className={styles.links__icon} />
                            <GrPrevious className={styles.links__icon} />
                        </button>
                        <button
                            onClick={() => setPage(prev => prev - 1)}
                            className={`${styles.links__link} ${page === 1 && styles.links__link_disabled}`}
                            disabled={page === 1}>
                            <GrPrevious className={styles.links__icon} />
                        </button>
                        <button
                            onClick={() => setPage(prev => prev + 1)}
                            className={`${styles.links__link} ${page === posts.last_page && styles.links__link_disabled}`}
                            disabled={page === posts.last_page}>
                            <GrNext className={styles.links__icon} />
                        </button>
                        <button
                            onClick={() => setPage(posts.last_page)}
                            className={`${styles.links__link} ${styles.links__edge} ${page === posts.last_page && styles.links__link_disabled}`}
                            disabled={page === posts.last_page}>
                            <GrNext className={styles.links__icon} />
                            <GrNext className={styles.links__icon} />
                        </button>
                    </div>
                    <p className={styles.main__page}>Strona: {page}</p>
                </>
            }
        </main>
    )
}

export default Posts
