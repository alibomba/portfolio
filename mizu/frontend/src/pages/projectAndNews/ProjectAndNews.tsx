import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaXTwitter, FaLink } from 'react-icons/fa6';
import { BsFacebook } from 'react-icons/bs';
import Error from '../../components/error/Error';
import Loading from '../../components/loading/Loading';
import Popup from '../../components/popup/Popup';
import axiosClient from '../../axiosClient';
import axios from 'axios';


import styles from './projectAndNews.module.css';
import formatDate from '../../utilities/formatDate';

interface Props {
    variant: 'project' | 'news';
}

const ProjectAndNews = ({ variant }: Props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState<ProjectOrNews | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup>({ content: null, active: false, type: 'good' });

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: `/${variant}/${id}`,
            cancelToken: source.token
        })
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                if (err?.response?.status === 404) {
                    navigate('/404');
                }
                else {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
            })
            .finally(() => setLoading(false));

        return () => {
            source.cancel();
        }

    }, [id]);

    function shareOnFacebook() {
        const url = encodeURIComponent(`${process.env.REACT_APP_URL}/${variant === 'project' ? 'projekt' : 'aktualnosc'}/${id}`);
        const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        window.open(facebookShareURL, '_blank');
    }

    function shareOnTwitter() {
        const url = encodeURIComponent(`${process.env.REACT_APP_URL}/${variant === 'project' ? 'projekt' : 'aktualnosc'}/${id}`);
        const twitterShareURL = `https://twitter.com/intent/tweet?url=${url}`;
        window.open(twitterShareURL, '_blank');
    }

    function copyLink() {
        navigator.clipboard.writeText(`${process.env.REACT_APP_URL}/${variant === 'project' ? 'projekt' : 'aktualnosc'}/${id}`)
            .then(() => {
                setPopup({ active: true, type: 'good', content: 'Link został skopiowany' });
                setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
            })
            .catch(err => {
                setPopup({ active: true, type: 'bad', content: 'Błąd kopiowania' });
                setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
            });
    }

    if (error) {
        return <Error>{error}</Error>
    }

    if (loading) {
        return <Loading />
    }

    return (
        <>
            {
                data &&
                <>
                    <div style={{ backgroundImage: `url('${process.env.REACT_APP_BACKEND_URL}/storage/${variant === 'project' ? 'projects' : 'news'}/${data.image}')` }} className={styles.image}></div>
                    <main className={styles.main}>
                        <header className={styles.main__header}>
                            <div className={styles.header__left}>
                                <h1 className={styles.header__title}>{data.title}</h1>
                                {
                                    data.createdAt && <p className={styles.header__date}>{formatDate(data.createdAt)}</p>
                                }
                            </div>
                            <div className={styles.header__right}>
                                <p className={styles.header__right__heading}>Udostępnij</p>
                                <div className={styles.header__right__row}>
                                    <button title='Udostępnij na Facebooku' onClick={shareOnFacebook} className={styles.header__right__button}>
                                        <BsFacebook className={styles.header__facebook} />
                                    </button>
                                    <button title='Udostępnij na Twitterze' onClick={shareOnTwitter} className={styles.header__right__button}>
                                        <FaXTwitter className={styles.header__x} />
                                    </button>
                                    <button title='Skopiuj link' onClick={copyLink} className={styles.header__right__button}>
                                        <FaLink className={styles.header__link} />
                                    </button>
                                </div>
                            </div>
                        </header>
                        <p className={styles.main__content}>{data.content}</p>
                    </main>
                    <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
                </>
            }
        </>
    )
}

export default ProjectAndNews
