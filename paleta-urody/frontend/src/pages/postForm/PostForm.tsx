import { useState, useEffect, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { BsCardImage } from 'react-icons/bs';

import styles from './postForm.module.css';
import Button from '../../components/button/Button';
import axiosClient from '../../axiosClient';
import axios from 'axios';

interface Post {
    id: number;
    image: string;
    title: string;
    description: string;
    content: string;
    created_at: string;
    updated_at: string;
}

const PostForm = () => {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [notification, setNotification] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const source = axios.CancelToken.source();

            axiosClient({
                method: 'get',
                url: `/posts/${id}`,
                cancelToken: source.token
            })
                .then(res => {
                    setPost(res.data[0]);
                })
                .catch(err => console.error(err));

            return () => {
                source.cancel();
            }
        }
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        setNotification(null);
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const imageInput = form.querySelector('#image') as HTMLInputElement;
        const image = imageInput.files?.[0] as Blob;
        const titleInput = form.querySelector('#title') as HTMLInputElement;
        const descriptionInput = form.querySelector('#description') as HTMLTextAreaElement;
        const contentInput = form.querySelector('#content') as HTMLTextAreaElement;

        const data = new FormData();
        data.append('image', image);
        data.append('title', titleInput?.value);
        data.append('description', descriptionInput?.value);
        data.append('content', contentInput?.value);

        if (id) {
            data.append('_method', 'put');
            axiosClient({
                method: 'post',
                url: `/posts/${id}`,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data
            })
                .then(res => {
                    setError(null);
                    setNotification('Pomyślnie zaktualizowano post');
                    setTimeout(() => setNotification(null), 5000);
                })
                .catch(err => {
                    if (err?.response.status === 422) {
                        setError(err.response.data.message);
                    }
                    else {
                        console.error(err);
                    }
                })
        }
        else {
            axiosClient({
                method: 'post',
                url: '/posts',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data
            })
                .then(res => {
                    setError(null);
                    setNotification('Pomyślnie opublikowano post');
                    setTimeout(() => setNotification(null), 5000);
                    form.reset();
                })
                .catch(err => {
                    if (err?.response.status === 422) {
                        setError(err.response.data.message);
                    }
                    else {
                        console.error(err);
                    }
                });
        }


    }

    return (
        <>
            {id && !post ? <img src="/img/loading.gif" alt="loading" style={{ display: 'block', margin: '0 auto' }} /> :
                <main className={styles.main}>
                    <h1 className={styles.heading}>{post ? 'Edytuj' : 'Dodaj'} post</h1>
                    <form onSubmit={handleSubmit} className={styles.main__form}>
                        <input name='image' aria-label='miniatura bloga' type="file" id='image' style={{ display: 'none' }} />
                        <label htmlFor="image" className={styles.form__fileLabel}>
                            {post ? <img className={styles.form__fileLabel__img} src={post.image} alt="aktualna miniatura bloga" /> : <BsCardImage />}
                        </label>
                        <div className={styles.inputContainer}>
                            <label htmlFor="title" className={styles.form__label}>Tytuł</label>
                            <input
                                value={post?.title}
                                onChange={post ? (e) => {
                                    setPost(prev => {
                                        return {
                                            ...prev!,
                                            title: e.target.value
                                        }
                                    })
                                } : undefined}
                                id='title' type="text"
                                className={styles.form__input}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="description" className={styles.form__label}>Opis</label>
                            <textarea
                                id='description'
                                rows={10}
                                className={`${styles.form__textarea} ${styles.form__textarea_description}`}
                                value={post?.description}
                                onChange={post ? (e) => {
                                    setPost(prev => {
                                        return {
                                            ...prev!,
                                            description: e.target.value
                                        }
                                    })
                                } : undefined}></textarea>
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="content" className={styles.form__label}>Treść</label>
                            <textarea
                                id="content"
                                rows={20}
                                className={`${styles.form__textarea} ${styles.form__textarea_content}`}
                                value={post?.content}
                                onChange={post ? (e) => {
                                    setPost(prev => {
                                        return {
                                            ...prev!,
                                            content: e.target.value
                                        }
                                    })
                                } : undefined}></textarea>
                        </div>
                        {
                            error && <p className={styles.form__error}>{error}</p>
                        }
                        {
                            notification && <p className={styles.form__notification}>{notification}</p>
                        }
                        <Button
                            backgroundColor='var(--secondary)'
                            as='button'
                            href=''
                            className={styles.form__button}
                        >
                            {id ? 'Zapisz' : 'Opublikuj'}
                        </Button>
                    </form>
                </main>
            }
        </>
    )
}

export default PostForm
