
import styles from './blogPost.module.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SectionBorder from '../../components/sectionBorder/SectionBorder';
import { PostHeader } from '../../sections';
import axiosClient from '../../axiosClient';
import axios from 'axios';

const BlogPost = () => {
    const { id } = useParams<string>();
    interface Post {
        id: number;
        image: string;
        title: string;
        description: string;
        content: string;
        created_at: string;
        updated_at: string;
    }

    const [post, setPost] = useState<Post | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        setPost(null);
        setErrorMessage(null);

        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: `/posts/${id}`,
            cancelToken: source.token
        })
            .then(res => setPost(res.data[0]))
            .catch(err => err.response?.status === 404 ? setErrorMessage('Post nie istnieje!') : console.error(err));

        return () => {
            source.cancel();
        }
    }, []);


    return (
        <>
            {
                post ?
                    (
                        <main>
                            <PostHeader
                                postedAt={post.created_at}
                                thumbnail={post.image}
                                title={post.title}
                            >
                                {post.description}
                            </PostHeader>
                            <SectionBorder color='tertiary' />
                            <main className={styles.content}>
                                {post.content}
                            </main>
                        </main>
                    ) : !errorMessage && <img className={styles.loading} src="/img/loading.gif" alt="loading" />
            }
            {
                errorMessage && <p className={styles.error}>{errorMessage}</p>
            }
        </>
    )
}

export default BlogPost;

