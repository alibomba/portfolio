import { useState, useEffect, useContext } from 'react';
import { ContextType, AuthContext } from '../../contexts/AuthProvider';
import { AiFillHeart, AiOutlineHeart, AiFillLike, AiOutlineLike, AiFillDislike, AiOutlineDislike, AiFillCaretDown, AiOutlineSortDescending, AiOutlineDelete } from 'react-icons/ai';
import { BsShareFill, BsFlag } from 'react-icons/bs';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import RateStars from '../../components/rateStars/RateStars';
import ProductTile from '../../components/productTile/ProductTile';
import CountdownTimer from '../../components/discountCountdown/CountdownTimer';
import Error from '../../components/error/Error';
import Loading from '../../components/loading/Loading';
import Popup from '../../components/popup/Popup';
import axiosClient from '../../axiosClient';
import axios from 'axios';
import styles from './product.module.css';
import getOriginalPriceBasedOnDiscount from '../../utilities/getOriginalPriceBasedOnDiscount';
import formatDate from '../../utilities/formatDate';

const Product = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthorized, isLoading, setContextCart } = useContext<ContextType>(AuthContext);
    const [product, setProduct] = useState<Product | null>(null);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [avgRate, setAvgRate] = useState<number | null>(null);
    const [currentVariant, setCurrentVariant] = useState<string | null>(null);
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
    const [crossSell, setCrossSell] = useState<ProductTile[] | null>(null);
    const [currentTab, setCurrentTab] = useState<'Opis' | 'Parametry' | 'Recenzje'>('Opis');
    const [sorting, setSorting] = useState<'new' | 'popular'>('new');
    const [reviews, setReviews] = useState<Review[]>([]);
    const [reviewsShown, setReviewsShown] = useState<number>(3);
    const [reviewsAllShown, setReviewsAllShown] = useState<boolean>(true);
    const [selectedRate, setSelectedRate] = useState<number>(3);
    const [currentImage, setCurrentImage] = useState<number>(0);
    const [isProductLoading, setIsProductLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup>({ content: '', active: false, type: 'good' });

    useEffect(() => {
        const source = axios.CancelToken.source();
        if (queryParams.get('variant')) {
            setCurrentVariant(queryParams.get('variant'));
        }

        async function fetchData() {
            try {
                const res = await axiosClient({
                    method: 'get',
                    url: `/product/${id}`,
                    cancelToken: source.token
                });
                const productRes: Product = res.data;
                setProduct(productRes);
            } catch (err: any) {
                if (err?.response?.status === 404) {
                    navigate('/404');
                }
                else {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
                setIsProductLoading(false);
            }

            if (isAuthorized) {
                try {
                    const res = await axiosClient({
                        method: 'get',
                        url: `/is-liked/${id}`,
                        cancelToken: source.token
                    });

                    if (res.data.isLiked) setIsLiked(true);
                } catch (err) {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
            }

            try {
                const res = await axiosClient({
                    method: 'get',
                    url: `/cross-sell/${id}`,
                    cancelToken: source.token
                });
                setCrossSell(res.data);
            } catch (err: any) {
                if (err?.response?.status !== 404) {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
            }

            try {
                const res = await axiosClient({
                    method: 'get',
                    url: `/reviews/${id}`,
                    cancelToken: source.token
                });
                const reviewsRes: Review[] = res.data.reviews;
                if (res.data.count <= reviewsShown) {
                    setReviewsAllShown(true);
                }
                else {
                    setReviewsAllShown(false);
                }
                setReviews(res.data.reviews);
                setReviews(reviewsRes);
                if (reviewsRes.length > 0) {
                    const sum = reviewsRes.reduce((accumulator, review) => accumulator + review.rate, 0);
                    setAvgRate(sum / reviewsRes.length);
                }
            } catch (err) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }

            setIsProductLoading(false);
        }

        fetchData();

        return () => {
            source.cancel();
        }

    }, [id]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axiosClient({
                    method: 'get',
                    url: `/reviews/${id}?sorting=${sorting}&howMany=${reviewsShown}`
                });
                if (res.data.count <= reviewsShown) {
                    setReviewsAllShown(true);
                }
                else {
                    setReviewsAllShown(false);
                }
                setReviews(res.data.reviews);
            } catch (err) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }

        if (product) {
            fetchData();
        }

    }, [sorting, reviewsShown]);

    function share(): void {
        const link = window.location.href;

        if (!navigator.clipboard) {
            setPopup({ content: 'Błąd kopiowania', active: true, type: 'bad' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
            return;
        }

        navigator.clipboard.writeText(link)
            .then(() => {
                setPopup({ content: 'Skopiowano link', active: true, type: 'good' });
                setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
            })
            .catch(() => {
                setPopup({ content: 'Błąd kopiowania', active: true, type: 'bad' });
                setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
            });
    }

    async function toggleLike(): Promise<void> {
        if (product) {
            if (isAuthorized) {
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
            else {
                setPopup({ active: true, type: 'bad', content: 'Musisz być zalogowany' });
                setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000)
            }
        }
    }

    function changeVariant(name: string): void {
        const pathname = `${window.location.origin}${location.pathname}?variant=${name}`;
        window.location.href = pathname;
    }

    function decreaseQuantity(): void {
        if (selectedQuantity !== 1) {
            setSelectedQuantity(prev => prev - 1);
        }
    }

    function increaseQuantity(): void {
        if (selectedQuantity !== product?.stock) {
            setSelectedQuantity(prev => prev + 1);
        }
    }

    async function addToCart(): Promise<void> {
        if (product) {
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
    }

    function buyNow(): void {
        if (product && product.stock >= selectedQuantity) {
            setContextCart([{
                id: product.id,
                name: product.name,
                price: product.price,
                stock: product.stock,
                images: [product.images.filter(product => product.is_thumbnail === true)[0]],
                quantity: selectedQuantity
            }]);
            navigate('/dostawa-i-platnosc');
        }
    }

    function changeSorting(e: React.ChangeEvent): void {
        const select = e.target as HTMLSelectElement;
        setSorting(select.value as 'new' | 'popular');
    }

    function showMoreReviews(): void {
        setReviewsShown(prev => prev + 3);
    }

    async function postReview(e: React.FormEvent): Promise<void> {
        e.preventDefault();
        if (!isAuthorized) {
            setPopup({ content: 'Musisz być zalogowany', active: true, type: 'bad' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
            return;
        }
        const form = e.target as HTMLFormElement;
        const content = form.querySelector('input') as HTMLInputElement;

        try {
            const res = await axiosClient({
                method: 'post',
                url: `/review/${id}`,
                data: {
                    content: content.value,
                    rate: selectedRate
                }
            });
            form.reset();
            setPopup({ content: 'Recenzja została opublikowana', active: true, type: 'good' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
            const review: Review = res.data;
            setReviews(prev => {
                return [review, ...prev];
            });
        } catch (err: any) {
            if (err?.response?.status === 422) {
                setPopup({ content: err?.response?.data?.message, active: true, type: 'bad' });
                setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
            }
            else {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
    }

    async function toggleReviewLike(reviewId: string): Promise<void> {
        if (isAuthorized) {
            try {
                const res = await axiosClient({
                    method: 'post',
                    url: `/toggle-review-like/${reviewId}`
                });
                setPopup({ content: res.data.message, active: true, type: 'good' });
                setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
                setReviews(prev => {
                    const newValue = prev.map(review => {
                        if (review.id === reviewId) {
                            if (res.status === 200) {
                                return { ...review, isLiked: false, likes: review.likes - 1 };
                            } else if (res.status === 201) {
                                if (review.isDisliked) {
                                    return { ...review, isLiked: true, isDisliked: false, likes: review.likes + 1, dislikes: review.dislikes - 1 };
                                } else {
                                    return { ...review, isLiked: true, likes: review.likes + 1 };
                                }
                            }
                            else {
                                return review;
                            }
                        }
                        else {
                            return review;
                        }
                    });
                    return newValue;
                });
            } catch (err) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        } else {
            setPopup({ content: 'Musisz być zalogowany', active: true, type: 'bad' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
        }
    }

    async function toggleReviewDislike(reviewId: string): Promise<void> {
        if (isAuthorized) {
            try {
                const res = await axiosClient({
                    method: 'post',
                    url: `/toggle-review-dislike/${reviewId}`
                });
                setPopup({ content: res.data.message, active: true, type: 'good' });
                setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
                setReviews(prev => {
                    const newValue = prev.map(review => {
                        if (review.id === reviewId) {
                            if (res.status === 200) {
                                return { ...review, isDisliked: false, dislikes: review.dislikes - 1 };
                            } else if (res.status === 201) {
                                if (review.isLiked) {
                                    return { ...review, isDisliked: true, isLiked: false, dislikes: review.dislikes + 1, likes: review.likes - 1 };
                                } else {
                                    return { ...review, isDisliked: true, dislikes: review.dislikes + 1 };
                                }
                            }
                            else {
                                return review;
                            }
                        }
                        else {
                            return review;
                        }
                    });
                    return newValue;
                });
            } catch (err) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
        else {
            setPopup({ content: 'Musisz być zalogowany', active: true, type: 'bad' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
        }
    }

    async function reportReview(reviewId: string): Promise<void> {
        try {
            const res = await axiosClient({
                method: 'post',
                url: `/report-review/${reviewId}`
            });
            setPopup({ content: res.data.message, active: true, type: 'good' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
        } catch (err) {
            setError('Coś poszło nie tak, spróbuj ponownie później...');
        }
    }

    async function deleteReview(reviewId: string): Promise<void> {
        const confirmation = window.confirm('Na pewno chcesz usunąć recenzję? Nie da się tego cofnąć!');
        if (confirmation) {
            try {
                await axiosClient({
                    method: 'delete',
                    url: `/delete-review/${reviewId}`
                });
                setPopup({ content: 'Usunięto recenzję', active: true, type: 'good' });
                setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
                setReviews(prev => {
                    const newValue = prev.filter(review => review.id !== reviewId);
                    return newValue;
                })
            } catch (err) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
    }

    if (isProductLoading || isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            {product &&
                <main className={styles.main}>
                    <header className={styles.header}>
                        <div className={styles.header__left}>
                            <img className={styles.header__thumbnail} src={`${process.env.REACT_APP_BACKEND_URL}/storage/offers/${product.images[currentImage].url}`} alt="miniatura oferty" />
                            <div className={styles.header__images}>
                                {
                                    product.images.map((image, index) => {
                                        return <img onClick={() => setCurrentImage(index)} key={image.id} className={`${styles.header__image} ${currentImage === index && styles.header__image_active}`} src={`${process.env.REACT_APP_BACKEND_URL}/storage/offers/${image.url}`} alt="zdjęcie produktu" />
                                    })
                                }
                            </div>
                        </div>
                        <div className={styles.header__right}>
                            <div className={styles.header__row}>
                                <h1 className={styles.header__title}>{product.name}</h1>
                                <button onClick={share} className={`${styles.header__blueButton} ${styles.header__blueButton_share}`}>
                                    <BsShareFill />
                                </button>
                                <button onClick={toggleLike} className={`${styles.header__blueButton} ${styles.header__blueButton_like}`}>
                                    {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                                </button>
                            </div>
                            <div className={styles.header__row}>
                                <p className={styles.header__category}>{product.category.name}</p>
                                {
                                    avgRate && <RateStars howMany={avgRate} />
                                }
                            </div>
                            {
                                product.variants.length > 0 &&
                                <div className={`${styles.header__row} ${styles.header__row_variants}`}>
                                    {product.variants.map(variant => <button onClick={() => changeVariant(variant.name)} key={variant.id} className={`${styles.header__variantButton} ${currentVariant === variant.name && styles.header__variantButton_active}`}>{variant.name}</button>)}
                                </div>
                            }
                            {
                                product.discount ?
                                    <>
                                        <div className={styles.header__row}>
                                            <p className={styles.header__price}>{product.price}zł</p>
                                            <p className={styles.header__oldPrice}>{(getOriginalPriceBasedOnDiscount(product.price, product.discount)).toFixed(2)}zł</p>
                                            <p className={styles.header__discountPercentage}>{product.discount.percentage}%</p>
                                        </div>
                                        <CountdownTimer className={styles.header__counter} targetDate={product.discount.expires_at} />
                                    </>
                                    :
                                    <p className={styles.header__price}>{product.price}zł</p>
                            }
                            <p className={styles.header__stock}>Pozostało: {product.stock}</p>
                            <div className={styles.header__row}>
                                <button disabled={selectedQuantity === 1} onClick={decreaseQuantity} className={`${styles.header__quantityButton} ${selectedQuantity === 1 && styles.header__quantityButton_disabled}`}>
                                    <AiOutlineMinus />
                                </button>
                                <p className={styles.header__quantity}>{selectedQuantity}</p>
                                <button disabled={selectedQuantity === product.stock} onClick={increaseQuantity} className={`${styles.header__quantityButton} ${selectedQuantity === product.stock && styles.header__quantityButton_disabled}`}>
                                    <AiOutlinePlus />
                                </button>
                            </div>
                            <button onClick={addToCart} className={styles.header__addToCart}>Dodaj do koszyka</button>
                            <button onClick={buyNow} className={styles.header__buyNow}>Kup teraz</button>
                        </div>
                    </header>
                    {
                        crossSell &&
                        <section className={styles.crossSell}>
                            {
                                crossSell.map(productTile => {
                                    return (
                                        <ProductTile
                                            key={productTile.id}
                                            id={productTile.id}
                                            name={productTile.name}
                                            discount={productTile.discount}
                                            price={productTile.price}
                                            stock={productTile.stock}
                                            images={productTile.images}
                                        />
                                    )
                                })
                            }
                        </section>
                    }
                    <nav className={styles.nav}>
                        <button onClick={() => setCurrentTab('Opis')} className={`${styles.navLink} ${currentTab === 'Opis' && styles.navLink_active}`}>Opis</button>
                        <button onClick={() => setCurrentTab('Parametry')} className={`${styles.navLink} ${currentTab === 'Parametry' && styles.navLink_active} `}>Parametry</button>
                        <button onClick={() => setCurrentTab('Recenzje')} className={`${styles.navLink} ${currentTab === 'Recenzje' && styles.navLink_active} `}>Recenzje</button>
                    </nav>
                    {
                        currentTab === 'Opis' &&
                        <p className={styles.description}>{product.description}</p>
                    }
                    {
                        currentTab === 'Parametry' &&
                        (product.parameters.length > 0 ?
                            <section className={styles.parameters}>
                                {
                                    product.parameters.map(parameter => {
                                        return (
                                            <article key={parameter.id} className={styles.parameter}>
                                                <p className={styles.parameter__key}>{parameter.key}</p>
                                                <p className={styles.parameter__value}>{parameter.value}</p>
                                            </article>
                                        )
                                    })
                                }
                            </section>
                            :
                            <p className={styles.noResults}>Brak parametrów</p>)
                    }
                    {
                        currentTab === 'Recenzje' &&
                        <>
                            <form onSubmit={postReview} className={styles.commentForm}>
                                <input required max={300} type="text" placeholder='Napisz komentarz' className={styles.commentForm__input} />
                                <div className={styles.commentForm__bottom}>
                                    <RateStars howMany={selectedRate} setHowMany={setSelectedRate} />
                                    <button className={styles.commentForm__button}>Opublikuj</button>
                                </div>
                            </form>
                            {
                                reviews.length > 0 ?
                                    <>
                                        <div className={styles.sorting}>
                                            <select onChange={changeSorting} defaultValue='new' className={styles.sorting__select}>
                                                <option value="new">Najnowsze</option>
                                                <option value="popular">Najpopularniejsze</option>
                                            </select>
                                            <AiOutlineSortDescending className={styles.sorting__icon} />
                                        </div>
                                        {
                                            reviews.map(review => {
                                                return (
                                                    <article key={review.id} className={styles.review}>
                                                        <div className={styles.review__top}>
                                                            <div className={styles.review__top__left}>
                                                                <img className={styles.review__pfp} src={review.user.profile_picture ? `${process.env.REACT_APP_BACKEND_URL}/storage/pfp/${review.user.profile_picture}` : '/img/default-pfp.jpg'} alt="profilowe użytkownika" />
                                                                <h3 className={styles.review__author}>{review.user.username}</h3>
                                                                <RateStars howMany={review.rate} />
                                                            </div>
                                                            <p className={styles.review__date}>{formatDate(review.created_at)}</p>
                                                        </div>
                                                        <p className={styles.review__content}>{review.content}</p>
                                                        <div className={styles.review__bottom}>
                                                            <div className={styles.review__bottom__left}>
                                                                <div className={styles.review__likeContainer}>
                                                                    <button onClick={() => toggleReviewLike(review.id)} className={`${styles.review__likeContainer__button} ${styles.review__likeContainer__button_like}`}>
                                                                        {review.isLiked ? <AiFillLike /> : <AiOutlineLike />}
                                                                    </button>
                                                                    <p className={styles.review__likeCount}>{review.likes}</p>
                                                                </div>
                                                                <div className={styles.review__likeContainer}>
                                                                    <button onClick={() => toggleReviewDislike(review.id)} className={`${styles.review__likeContainer__button} ${styles.review__likeContainer__button_dislike}`}>
                                                                        {review.isDisliked ? <AiFillDislike /> : <AiOutlineDislike />}
                                                                    </button>
                                                                    <p className={styles.review__likeCount}>{review.dislikes}</p>
                                                                </div>
                                                                <button onClick={() => reportReview(review.id)} className={styles.review__reportButton}>
                                                                    <BsFlag />
                                                                </button>
                                                            </div>
                                                            {
                                                                review.isMine &&
                                                                <button onClick={() => deleteReview(review.id)} className={`${styles.review__authorButton} ${styles.review__authorButton_delete}`}>
                                                                    <AiOutlineDelete />
                                                                </button>
                                                            }
                                                        </div>
                                                    </article>
                                                )
                                            })
                                        }
                                        {
                                            !reviewsAllShown && <button onClick={showMoreReviews} className={styles.showMore}>Pokaż więcej <AiFillCaretDown className={styles.showMore__icon} /></button>
                                        }
                                    </>
                                    :
                                    <p className={styles.noResults}>Brak recenzji</p>
                            }
                        </>
                    }
                    <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
                </main>
            }
        </>
    )
}

export default Product
