import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeadingStars from '../../components/headingStars/HeadingStars';
import ProductTile from '../../components/productTile/ProductTile';
import ProductsGroup from '../../components/productsGroup/ProductsGroup';
import styles from './offersSection.module.css';
import axiosClient from '../../axiosClient';
import axios from 'axios';
import Error from '../../components/error/Error';

interface Props {
    heading: string;
    buttonContent?: string;
    offersCondition: 'discount' | 'limited' | 'popular' | 'new';
}

const HomeDiscounts = ({ heading, buttonContent, offersCondition }: Props) => {
    const [products, setProducts] = useState<ProductTile[]>([]);
    const [tooLittleResults, setTooLittleResults] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: `/products-${offersCondition}`,
            cancelToken: source.token
        })
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => {
                if (err?.response?.status === 404 && err?.response?.data?.message === 'Za mało wyników') {
                    setTooLittleResults(true);
                }
                else {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
            });

        return () => {
            source.cancel();
        }

    }, []);

    if (error) {
        return <Error>{error}</Error>
    }

    if (tooLittleResults) {
        return <></>
    }

    return (
        <section className={styles.section}>
            <h2 className={styles.section__heading}>{heading}</h2>
            <HeadingStars />
            <ProductsGroup marginTop='3em'>
                {products.length > 0 &&
                    products.map(product => {
                        return (
                            <ProductTile
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                stock={product.stock}
                                discount={product.discount}
                                images={product.images}
                            />
                        )
                    })}
            </ProductsGroup>
            {
                buttonContent &&
                <Link className={styles.section__button} to='/sklep'>{buttonContent}</Link>
            }
        </section>
    )
}

export default HomeDiscounts
