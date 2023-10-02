import { useState, useEffect, useContext, useRef } from 'react';
import { ContextType, AuthContext } from '../../contexts/AuthProvider';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import getCart from '../../utilities/getCart';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import Popup from '../../components/popup/Popup';
import axios from 'axios';
import axiosClient from '../../axiosClient';
import computeSummaryPriceCart from '../../utilities/computeSummaryPriceCart';

import styles from './cart.module.css';

const Cart = () => {
    const navigate = useNavigate();
    const localCart = getCart();
    const { isLoading, isAuthorized, setContextCart } = useContext<ContextType>(AuthContext);
    const [cart, setCart] = useState<UICartElement[]>([]);
    const [isCartLoading, setIsCartLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup>({ content: null, type: 'good', active: false });
    const [noResults, setNoResults] = useState<boolean>(false);
    const [summaryPrice, setSummaryPrice] = useState<string>('...')
    const selectAllRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        if (!isLoading && !isAuthorized) {
            if (localCart) {
                const cartSize = localCart.length;
                localCart.forEach(async (cartElement, index) => {
                    const res = await axiosClient({
                        method: 'get',
                        url: `/get-cart-product-overview/${cartElement.product_id}`,
                        cancelToken: source.token
                    });
                    const data = res.data;
                    setCart(prev => {
                        prev.unshift({
                            id: data.id,
                            name: data.name,
                            price: data.price,
                            stock: data.stock,
                            quantity: cartElement.quantity,
                            images: data.images
                        })
                        if (index === cartSize - 1) {
                            setIsCartLoading(false);
                            setSummaryPrice(computeSummaryPriceCart(prev));
                        }
                        return prev;
                    });
                });
            }
            else {
                setNoResults(true);
                setIsCartLoading(false);
            }
        } else if (!isLoading && isAuthorized) {

            axiosClient({
                method: 'get',
                url: '/my-cart',
                cancelToken: source.token
            })
                .then(res => {
                    const data: DbCartElement[] = res.data;
                    data.map(cartElement => {
                        setCart(prev => {
                            prev.unshift({
                                id: cartElement.product.id,
                                name: cartElement.product.name,
                                price: cartElement.product.price,
                                stock: cartElement.product.stock,
                                quantity: cartElement.quantity,
                                images: cartElement.product.images
                            })
                            setSummaryPrice(computeSummaryPriceCart(prev));
                            return prev;
                        })
                    });
                })
                .catch(err => {
                    if (err?.response?.status === 404 && err?.response?.data?.message === 'Koszyk jest pusty') {
                        setNoResults(true);
                    }
                    else {
                        setError('Coś poszło nie tak, spróbuj ponownie później...');
                    }
                })
                .finally(() => setIsCartLoading(false));
        }

        return () => {
            source.cancel();
        }

    }, []);

    function selectAll(e: React.ChangeEvent) {
        const checkbox = e.target as HTMLInputElement;
        const elementsCheckboxes = document.querySelectorAll('[data-id="elementCheckbox"]') as NodeListOf<HTMLInputElement>;
        if (checkbox.checked) {
            elementsCheckboxes.forEach((checkbox) => {
                checkbox.checked = true;
            });
        }
        else {
            let allChecked = true;
            elementsCheckboxes.forEach((checkbox) => {
                if (!checkbox.checked) allChecked = false;
            });
            if (allChecked) {
                elementsCheckboxes.forEach((checkbox) => {
                    checkbox.checked = false;
                });
            }
        }
    }

    function selectAllControl(e: React.ChangeEvent) {
        const checkbox = e.target as HTMLInputElement;
        if (!checkbox.checked) {
            selectAllRef.current!.checked = false;
        }
        else {
            const elementsCheckboxes = document.querySelectorAll('[data-id="elementCheckbox"]') as NodeListOf<HTMLInputElement>;
            let allChecked = true;
            elementsCheckboxes.forEach((checkbox) => {
                if (!checkbox.checked) allChecked = false;
            })
            if (allChecked) selectAllRef.current!.checked = true;
        }
    }

    async function decreaseQuantity(productId: string) {
        if (isAuthorized) {
            try {
                await axiosClient({
                    method: 'post',
                    url: `/decrease-quantity/${productId}`
                });
                setCart(prev => {
                    const newValue = prev.map(item => {
                        if (item.id === productId) {
                            item.quantity -= 1;
                        }
                        return item;
                    });
                    setSummaryPrice(computeSummaryPriceCart(newValue));
                    return newValue;
                });
            } catch (err) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
        else {
            const currentCart = getCart();
            const newCart = currentCart!.map(element => {
                if (element.product_id === productId) {
                    element.quantity -= 1;
                }
                return element;
            });
            localStorage.setItem('cart', JSON.stringify(newCart));
            setCart(prev => {
                const newValue = prev.map(element => {
                    if (element.id === productId) {
                        element.quantity -= 1;
                    }
                    return element;
                });
                setSummaryPrice(computeSummaryPriceCart(newValue));
                return newValue;
            });
        }
    }

    async function increaseQuantity(productId: string) {
        if (isAuthorized) {
            try {
                await axiosClient({
                    method: 'post',
                    url: `/increase-quantity/${productId}`
                });
                setCart(prev => {
                    const newValue = prev.map(item => {
                        if (item.id === productId) {
                            item.quantity += 1;
                        }
                        return item;
                    });
                    setSummaryPrice(computeSummaryPriceCart(newValue));
                    return newValue;
                });
            } catch (err) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
        else {
            const currentCart = getCart();
            const newCart = currentCart!.map(element => {
                if (element.product_id === productId) {
                    element.quantity += 1;
                }
                return element;
            });
            localStorage.setItem('cart', JSON.stringify(newCart));
            setCart(prev => {
                const newValue = prev.map(element => {
                    if (element.id === productId) {
                        element.quantity += 1;
                    }
                    return element;
                });
                setSummaryPrice(computeSummaryPriceCart(newValue));
                return newValue;
            });
        }
    }

    async function deleteElement(productId: string) {
        if (isAuthorized) {
            try {
                await axiosClient({
                    method: 'delete',
                    url: `/delete-cart-element/${productId}`
                });
                setCart(prev => {
                    const newValue = prev.filter(element => element.id !== productId);
                    setSummaryPrice(computeSummaryPriceCart(newValue));
                    return newValue;
                });
                setPopup({ content: 'Usunięto element z koszyka', type: 'good', active: true });
                setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
            } catch (err) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
        else {
            const currentCart = getCart();
            const newCart = currentCart!.filter(element => element.product_id !== productId);
            localStorage.setItem('cart', JSON.stringify(newCart));
            setCart(prev => {
                const newValue = prev.filter(element => element.id !== productId);
                setSummaryPrice(computeSummaryPriceCart(newValue));
                return newValue;
            });
            setPopup({ content: 'Usunięto element z koszyka', type: 'good', active: true });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
        }
    }

    async function deleteAllOrSelected(e: React.ChangeEvent) {
        const select = e.target as HTMLSelectElement;
        if (select.value === 'all') {
            if (isAuthorized) {
                cart.forEach(async (element) => {
                    try {
                        await axiosClient({
                            method: 'delete',
                            url: `/delete-cart-element/${element.id}`
                        });
                    } catch (err) {
                        setError('Coś poszło nie tak, spróbuj ponownie później...');
                    }
                });
                setCart([]);
            }
            else {
                localStorage.removeItem('cart');
                setCart([]);
            }
            setPopup({ content: 'Usunięto cały koszyk', type: 'good', active: true });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
        }
        else if (select.value === 'selected') {
            const checkedCheckboxes = document.querySelectorAll('[data-id="elementCheckbox"]:checked') as NodeListOf<HTMLInputElement>;
            checkedCheckboxes.forEach(async (checkbox) => {
                const id = checkbox.closest('article')?.id;
                if (isAuthorized) {
                    try {
                        await axiosClient({
                            method: 'delete',
                            url: `/delete-cart-element/${id}`
                        });
                    } catch (err) {
                        setError('Coś poszło nie tak, spróbuj ponownie później...');
                    }
                }
                else {
                    const currentCart = getCart();
                    const newCart = currentCart!.filter(element => element.product_id !== id);
                    localStorage.setItem('cart', JSON.stringify(newCart));
                }
                setCart(prev => {
                    const newValue = prev.filter(element => element.id !== id);
                    setSummaryPrice(computeSummaryPriceCart(newValue));
                    return newValue;
                });
                setPopup({ content: 'Usunięto zaznaczone elementy', type: 'good', active: true });
                setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
            });
        }
        select.value = '';
    }

    function checkout(){
        setContextCart(cart);
        navigate('/dostawa-i-platnosc');
    }


    if (error) {
        return <Error>{error}</Error>
    }

    if (isLoading || isCartLoading) {
        return <Loading />
    }

    return (
        <main className={styles.main}>
            {
                (noResults || cart.length === 0) && <p className={styles.noResults}>Koszyk jest pusty</p>
            }
            {
                (!noResults && cart && cart.length > 0) &&
                <>
                    <section className={styles.main__items}>
                        <div className={styles.items__top}>
                            <label className={styles.items__top__left}><input ref={selectAllRef} onChange={selectAll} defaultChecked className={styles.items__top__checkbox} type="checkbox" /> Zaznacz wszystko</label>
                            <select onChange={deleteAllOrSelected} className={styles.items__top__select}>
                                <option value="">Usuń</option>
                                <option value="all">Usuń wszystko</option>
                                <option value="selected">Usuń zaznaczone</option>
                            </select>
                        </div>
                        {
                            cart.map(cartElement => {
                                return (
                                    <article key={cartElement.id} id={cartElement.id} className={styles.item}>
                                        <input onChange={selectAllControl} data-id="elementCheckbox" aria-label='Zaznacz produkt' defaultChecked className={styles.item__checkbox} type="checkbox" />
                                        <img className={styles.item__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/offers/${cartElement.images[0].url}`} alt="miniatura oferty" />
                                        <h3 className={styles.item__title}>{cartElement.name}</h3>
                                        <div className={styles.item__quantity}>
                                            <button onClick={() => decreaseQuantity(cartElement.id)} disabled={cartElement.quantity === 1} className={`${styles.quantity__button} ${cartElement.quantity === 1 && styles.quantity__button_disabled}`}>
                                                <AiOutlineMinus />
                                            </button>
                                            <p className={styles.quantity__number}>{cartElement.quantity}</p>
                                            <button onClick={() => increaseQuantity(cartElement.id)} disabled={cartElement.quantity === cartElement.stock} className={`${styles.quantity__button} ${cartElement.quantity === cartElement.stock && styles.quantity__button_disabled}`}>
                                                <AiOutlinePlus />
                                            </button>
                                        </div>
                                        <p className={styles.item__price}>{cartElement.price}zł</p>
                                        <button onClick={() => deleteElement(cartElement.id)} className={styles.item__deleteButton}>
                                            <BsTrash />
                                        </button>
                                    </article>
                                )
                            })
                        }
                    </section>
                    <div className={styles.main__summary}>
                        <div className={styles.summary__row}>
                            <p className={styles.summary__text}>Wartość koszyka</p>
                            <p data-id='priceSummary' className={styles.summary__text}>{summaryPrice}</p>
                        </div>
                        <div className={styles.summary__row}>
                            <p className={styles.summary__text}>Dostawa od</p>
                            <p className={styles.summary__text}>9.99zł</p>
                        </div>
                        <button onClick={checkout} className={styles.summary__button}>Dostawa i płatność</button>
                    </div>
                </>
            }
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </main>
    )
}

export default Cart
