import { useContext, useState, useEffect } from 'react';
import { AuthContext, ContextType } from '../../contexts/AuthProvider';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import styles from './productTile.module.css';
import getOriginalPriceBasedOnDiscount from '../../utilities/getOriginalPriceBasedOnDiscount';
import isDateLaterThanNow from '../../utilities/isDateLaterThanNow';
import CountdownTimer from '../discountCountdown/CountdownTimer';
import Popup from '../popup/Popup';
import axiosClient from '../../axiosClient';
import axios, { AxiosError } from 'axios';
import Error from '../error/Error';

interface Props extends ProductTile {
    className?: string;
}

const ProductTile = (product: Props) => {
    const { isAuthorized } = useContext<ContextType>(AuthContext);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [popup, setPopup] = useState<Popup>({ content: null, type: 'good', active: false });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthorized) {
            const source = axios.CancelToken.source();
            axiosClient({
                method: 'get',
                url: `/is-liked/${product.id}`,
                cancelToken: source.token
            })
                .then(res => {
                    setIsLiked(res.data.isLiked);
                })
                .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'));

            return () => {
                source.cancel();
            }
        }
    }, []);


    async function toggleLike(): Promise<void> {
        try {
            const res = await axiosClient({ method: 'post', url: `/toggle-like/${product.id}` });
            if (res.status === 201) {
                setIsLiked(true);
                setPopup({ content: 'Dodano do ulubionych', type: 'good', active: true });
                setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
            }
            else if (res.status === 204) {
                setIsLiked(false);
                setPopup({ content: 'Usunięto z ulubionych', type: 'good', active: true });
                setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
            }
        } catch (err) {
            setError('Coś poszło nie tak, spróbuj ponownie później...');
        }
    }

    async function addToCart(): Promise<void> {
        if (isAuthorized) {
            try {
                const res = await axiosClient({ method: 'post', url: `/add-to-cart/${product.id}`, data: { quantity: 1 } });
                setPopup({ content: res.data.message, type: 'good', active: true });
                setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
            } catch (err: any) {
                if (err?.response?.status === 422) {
                    setPopup({ content: err?.response?.data?.message, type: 'bad', active: true });
                    setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
                }
                else {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
            }
        }
        else {
            let cart: LocalCartElement[] = [];
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart')!);
            }
            const alreadyInCartOccurences = cart.filter(element => element.product_id === product.id);
            if (alreadyInCartOccurences.length > 0) {
                setPopup({ content: 'Produkt jest już w koszyku', type: 'bad', active: true });
                setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
            }
            else {
                cart.unshift({ product_id: product.id, quantity: 1 });
                const cartJSON = JSON.stringify(cart);
                localStorage.setItem('cart', cartJSON);
                setPopup({ content: 'Dodano do koszyka', type: 'good', active: true });
                setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
            }
        }
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <article className={`${styles.product} ${product.className && product.className}`}>
            <Link to={`/produkt/${product.id}`}>
                <img className={styles.product__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/offers/${product.images[0].url}`} alt="miniatura produktu" />
            </Link>
            <div className={styles.product__data}>
                <h3 className={styles.product__title}><Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/produkt/${product.id}`}>{product.name}</Link></h3>
                <div className={styles.product__priceContainer}>
                    {
                        (product.discount && isDateLaterThanNow(product.discount.expires_at)) ?
                            <>
                                <p className={styles.product__price}>{(product.price).toFixed(2)}</p>
                                <p className={styles.product__oldPrice}>{(getOriginalPriceBasedOnDiscount(product.price, product.discount)).toFixed(2)}zł</p>
                                <p className={styles.product__discountPercentage}>{product.discount.percentage}%</p>
                            </>
                            : <p className={styles.product__price}>{(product.price).toFixed(2)}zł</p>
                    }
                </div>
                {
                    product.discount && <CountdownTimer targetDate={product.discount.expires_at} />
                }
                {
                    product.stock <= 30 && <p className={styles.product__stock}>Pozostało: {product.stock}</p>
                }
                <button onClick={addToCart} className={styles.product__addToCart}>Dodaj do koszyka</button>
            </div>
            {
                (product.discount && isDateLaterThanNow(product.discount.expires_at)) && <p className={styles.product__discountOverlay}>-{product.discount.percentage}%</p>
            }
            <button onClick={isAuthorized ? toggleLike : () => { setPopup({ active: true, type: 'bad', content: 'Musisz być zalogowany' }); setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000) }} className={styles.product__likeButton}>
                {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </article>
    )
}

export default ProductTile
