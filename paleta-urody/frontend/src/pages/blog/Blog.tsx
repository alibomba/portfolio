import { useEffect, useState } from 'react';


import axios from 'axios';
import axiosClient from '../../axiosClient';
import PostTile from '../../components/postTile/PostTile';
import { GrPrevious, GrNext } from 'react-icons/gr';

import styles from './blog.module.css';

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

const Blog = () => {

    const [page, setPage] = useState<number | undefined>(1);
    const [posts, setPosts] = useState<Posts | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        setPosts(null);

        axiosClient({
            method: 'get',
            url: `/posts?page=${page}`,
            cancelToken: source.token
        })
            .then(res => {
                setPosts(res.data);
            })


        return () => {
            source.cancel();
        }
    }, [page]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const firstPage = () => {
        setPage(1);
        scrollToTop();
    }

    const prevPage = () => {
        setPage(prev => prev && prev - 1);
        scrollToTop();
    }

    const nextPage = () => {
        setPage(prev => prev && prev + 1);
        scrollToTop();
    }

    const lastPage = () => {
        setPage(posts?.last_page);
        scrollToTop();
    }



    return (
        <main>
            {posts && posts.data.length > 0 ? (
                <div className={styles.posts}>
                    {posts.data.map((post) => (
                        <PostTile
                            key={post.id}
                            id={post.id}
                            postedAt={post.created_at}
                            thumbnail={post.image}
                            title={post.title}
                        >
                            {post.description}
                        </PostTile>
                    ))}
                </div>
            ) : (
                <img className={styles.loading} src="img/loading.gif" alt="loading" />
            )}
            <div className={styles.links}>
                <button onClick={firstPage} className={`${styles.links__link} ${styles.links__edge} ${!posts?.prev_page_url && styles.links__link_disabled}`} disabled={!posts?.prev_page_url}>
                    <GrPrevious className={styles.links__icon} />
                    <GrPrevious className={styles.links__icon} />
                </button>
                <button onClick={prevPage} className={`${styles.links__link} ${!posts?.prev_page_url && styles.links__link_disabled}`} disabled={!posts?.prev_page_url}>
                    <GrPrevious className={styles.links__icon} />
                </button>
                <button onClick={nextPage} className={`${styles.links__link} ${!posts?.next_page_url && styles.links__link_disabled}`} disabled={!posts?.next_page_url}>
                    <GrNext className={styles.links__icon} />
                </button>
                <button onClick={lastPage} className={`${styles.links__link} ${styles.links__edge} ${!posts?.next_page_url && styles.links__link_disabled}`} disabled={!posts?.next_page_url}>
                    <GrNext className={styles.links__icon} />
                    <GrNext className={styles.links__icon} />
                </button>
            </div>
            <p className={styles.currentPage}>Strona: {posts?.current_page}</p>
        </main>
    )
}

export default Blog
