import { BsFillSendFill, BsSearch, BsInstagram, BsTwitter, BsFillCartFill } from 'react-icons/bs';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext, ContextType } from '../../contexts/AuthProvider';
import Error from '../../components/error/Error';

import styles from './header.module.css';
import axiosClient from '../../axiosClient';
import axios from 'axios';
import Popup from '../../components/popup/Popup';

interface Category {
    id: string;
    name: string;
    image: string;
}

const Header = () => {
    const navigate = useNavigate();
    const { isAuthorized, setIsAuthorized } = useContext<ContextType>(AuthContext);
    const [isNavActive, setIsNavActive] = useState<boolean>(false);
    const [isCategoriesModalActive, setIsCategoriesModalActive] = useState<boolean>(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup>({ content: null, type: 'good', active: false });

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: '/categories',
            cancelToken: source.token
        })
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'));

        return () => {
            source.cancel();
        }

    }, []);

    function toggleNav(): void {
        setIsNavActive(prev => !prev);
    }

    function search(e: React.FormEvent): void {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const phrase = form.querySelector('input') as HTMLInputElement;
        if (phrase.value) {
            navigate(`/wyszukiwarka?name=${phrase.value}`);
        }
    }

    async function newsletterSubmit(e: React.FormEvent): Promise<void> {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const email = form.querySelector('input') as HTMLInputElement;

        try {
            const res = await axiosClient({
                method: 'post',
                url: '/newsletter',
                data: {
                    email: email.value
                }
            });
            form.reset();
            setPopup({
                content: 'Dziękujemy',
                type: 'good',
                active: true
            });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
        } catch (err: any) {
            if (err?.response?.status === 422) {
                setPopup({
                    content: err?.response?.data?.message,
                    type: 'bad',
                    active: true
                });
                setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
            }
            else {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
    }

    async function logout(): Promise<void> {
        try {
            const res = await axiosClient({
                method: 'delete',
                url: '/logout',
                data: {
                    refreshToken: localStorage.getItem('refreshToken') || ''
                }
            });
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            setIsAuthorized(false);
            navigate('/logowanie');
        } catch (err) {
            setError('Coś poszło nie tak, spróbuj ponownie później...');
        }
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <header className={styles.header}>
            <div className={styles.header__top}>
                <form onSubmit={newsletterSubmit} className={styles.top__row}>
                    <label className={styles.top__heading}>Newsletter</label>
                    <input className={styles.top__input} type="email" placeholder='Adres e-mail' />
                    <button className={styles.top__button}>
                        <BsFillSendFill />
                    </button>
                </form>
                <form onSubmit={search} className={styles.top__row}>
                    <input className={styles.top__input} placeholder='Wyszukaj' aria-label='Wyszukaj' type="text" />
                    <button className={styles.top__button}>
                        <BsSearch />
                    </button>
                </form>
                <div className={styles.top__row}>
                    <a className={styles.top__socialLink} target='_blank' href="#">
                        <FaFacebookF />
                    </a>
                    <a className={styles.top__socialLink} target='_blank' href="#">
                        <BsInstagram />
                    </a>
                    <a className={styles.top__socialLink} target='_blank' href="#">
                        <BsTwitter />
                    </a>
                    <a className={styles.top__socialLink} target='_blank' href="#">
                        <FaLinkedinIn />
                    </a>
                </div>
            </div>
            <div className={styles.header__bottom}>
                <Link to='/'>
                    <img className={styles.header__logo} src="/img/logo.png" alt="logo sklepu" />
                </Link>
                <nav className={styles.header__nav}>
                    <Link className={styles.header__navLink} to='/sklep'>Sklep</Link>
                    <button onClick={() => setIsCategoriesModalActive(true)} className={styles.header__navLink}>Kategorie</button>
                    <Link className={styles.header__navLink} to='/o-firmie'>O firmie</Link>
                    <Link className={styles.header__navLink} to='/kontakt'>Kontakt</Link>
                    {
                        !isAuthorized && <Link className={styles.header__navLink} to='/logowanie'>Zaloguj się</Link>
                    }
                    {
                        isAuthorized && <Link className={styles.header__navLink} to='/konto'>Konto</Link>
                    }
                    <Link className={styles.bottom__button} to='/koszyk'>
                        <BsFillCartFill />
                    </Link>
                    {
                        isAuthorized &&
                        <button onClick={logout} className={styles.bottom__button}>
                            <IoLogOut />
                        </button>
                    }
                </nav>
            </div>
            <div className={styles.header__bottom_mobile}>
                <div className={styles.header__bottom_mobile__top}>
                    <Link onClick={() => setIsNavActive(false)} to='/'>
                        <img className={styles.header__logo} src="/img/logo.png" alt="logo sklepu" />
                    </Link>
                    <button onClick={toggleNav} className={`${styles.header__hamburger} ${isNavActive && styles.header__hamburger_active}`}>
                        <GiHamburgerMenu />
                    </button>
                </div>
                <nav className={`${styles.header__bottom_mobile__nav} ${isNavActive && styles.header__bottom_mobile__nav_active}`}>
                    <Link onClick={() => setIsNavActive(false)} className={styles.header__navLink} to='/sklep'>Sklep</Link>
                    <button onClick={() => { setIsNavActive(false); setIsCategoriesModalActive(true); }} className={styles.header__navLink}>Kategorie</button>
                    <Link onClick={() => setIsNavActive(false)} className={styles.header__navLink} to='/o-firmie'>O firmie</Link>
                    <Link onClick={() => setIsNavActive(false)} className={styles.header__navLink} to='/kontakt'>Kontakt</Link>
                    {
                        !isAuthorized && <Link onClick={() => setIsNavActive(false)} className={styles.header__navLink} to='/logowanie'>Zaloguj się</Link>
                    }
                    {
                        isAuthorized && <Link onClick={() => setIsNavActive(false)} className={styles.header__navLink} to='/konto'>Konto</Link>
                    }
                    <Link onClick={() => setIsNavActive(false)} className={styles.bottom__button} to='/koszyk'>
                        <BsFillCartFill />
                    </Link>
                    {
                        isAuthorized &&
                        <button onClick={() => { setIsNavActive(false); logout(); }} className={styles.bottom__button}>
                            <IoLogOut />
                        </button>
                    }
                </nav>
            </div>
            <Popup active={popup.active} type={popup.type}>{popup.active ? popup.content : null}</Popup>
            {
                isCategoriesModalActive &&
                <div className={styles.categories}>
                    {
                        categories.length > 0 && categories.map(category => {
                            return <Link onClick={() => setIsCategoriesModalActive(false)} to={`/wyszukiwarka?category=${category.name}`} key={category.id} className={styles.categories__link}>{category.name}</Link>
                        })
                    }
                </div>
            }
            {
                isCategoriesModalActive && <div onClick={() => setIsCategoriesModalActive(false)} className={styles.categoriesOverlay}></div>
            }
        </header>
    )
}

export default Header
