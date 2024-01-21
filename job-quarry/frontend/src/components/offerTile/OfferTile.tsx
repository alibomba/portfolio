import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { useLazyQuery, useMutation } from '@apollo/client';
import { IS_BOOKMARKED } from '../../graphql/queries';
import { ADD_THUMBNAIL_VIEW, BOOKMARK } from '../../graphql/mutations';
import { Link } from 'react-router-dom';
import { HiBuildingOffice2 } from 'react-icons/hi2';
import { IoMdBriefcase } from 'react-icons/io';
import { MdLocationPin } from 'react-icons/md';
import { PiCurrencyDollarSimpleBold } from 'react-icons/pi';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import styles from './offerTile.module.css';
import formatNumber from '../../utils/formatNumber';
import Error from '../error/Error';
import Popup from '../popup/Popup';
import { useInView } from 'react-intersection-observer';

const OfferTile = ({ _id, title, company: { companyName, logo }, mode, location, requiredTechnologies, salary }: OfferTile) => {
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
    const [popup, setPopup] = useState<Popup>({ active: false, type: 'good', content: null });
    const [error, setError] = useState<string | null>(null);
    const [isBookmarkedQuery] = useLazyQuery(IS_BOOKMARKED);
    const [bookmarkMutation] = useMutation(BOOKMARK, { refetchQueries: [{ query: IS_BOOKMARKED }] });
    const [thumbnailViewMutation] = useMutation(ADD_THUMBNAIL_VIEW);
    const { isAuthorized, isCompany, isLoading } = useSelector((state: RootState) => state.auth);
    const [ref, inView] = useInView({
        triggerOnce: true
    });

    useEffect(() => {
        async function fetchData() {
            if (!isLoading && isAuthorized && !isCompany) {
                const { data, error } = await isBookmarkedQuery({ variables: { isBookmarkedId: _id } });
                if (error) {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                    return;
                }
                if (data.isBookmarked.success) {
                    setIsBookmarked(true);
                }
            }
        }

        fetchData();

    }, [isLoading]);

    useEffect(() => {
        async function addThumbnailView() {
            if (inView) {
                try {
                    await thumbnailViewMutation({ variables: { addThumbnailViewId: _id } });
                } catch (err) {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
            }
        }
        addThumbnailView();
    }, [inView]);

    async function bookmark() {
        if (isLoading) return;
        if (!isAuthorized) {
            setPopup({ content: 'Musisz być zalogowany', active: true, type: 'bad' });
            setTimeout(() => setPopup(prev => ({ ...prev, active: false })), 4000);
            return;
        }
        try {
            const { data } = await bookmarkMutation({ variables: { bookmarkId: _id } });
            if (data.bookmark.isBookmarked) {
                setIsBookmarked(true);
                setPopup({ content: 'Dodano do zapisanych', active: true, type: 'good' });
                setTimeout(() => setPopup(prev => ({ ...prev, active: false })), 4000);
            }
            else {
                setIsBookmarked(false);
                setPopup({ content: 'Usunięto z zapisanych', active: true, type: 'good' });
                setTimeout(() => setPopup(prev => ({ ...prev, active: false })), 4000);
            }
        } catch (err) {
            setError('Coś poszło nie tak, spróbuj ponownie później...');
        }
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <article ref={ref} className={styles.offer}>
            <Link to={`/oferta/${_id}`}>
                <img className={styles.offer__img} src={logo || '/default.webp'} alt={`logo ${companyName}`} />
            </Link>
            <div className={styles.offer__info}>
                <h3 className={styles.offer__title}><Link className={styles.offer__title__link} to={`/oferta/${_id}`}>{title}</Link></h3>
                <div className={styles.offer__details}>
                    <div className={styles.offer__row}>
                        <HiBuildingOffice2 className={styles.offer__details__icon} />
                        <span className={styles.offer__details__text}>{companyName}</span>
                    </div>
                    <div className={styles.offer__row}>
                        <IoMdBriefcase className={styles.offer__details__icon} />
                        <span className={styles.offer__details__text}>{mode}</span>
                    </div>
                    <div className={styles.offer__row}>
                        <MdLocationPin className={styles.offer__details__icon} />
                        <span className={styles.offer__details__text}>{location}</span>
                    </div>
                </div>
                <div className={styles.offer__technologies}>
                    {
                        requiredTechnologies.length <= 4 ?
                            requiredTechnologies.map(technology => <p key={technology} className={styles.offer__technology}>{technology}</p>)
                            :
                            <>
                                {
                                    requiredTechnologies.slice(0, 4).map(technology => <p key={technology} className={styles.offer__technology}>{technology}</p>)
                                }
                                <p className={styles.offer__technology}>+{requiredTechnologies.length - 4}</p>
                            </>
                    }
                    <p className={styles.offer__salary}>
                        <PiCurrencyDollarSimpleBold className={styles.offer__salary__icon} />
                        <span className={styles.offer__salary__text}>{formatNumber(salary)}zł</span>
                    </p>
                    {
                        !isCompany &&
                        <button onClick={bookmark} title={isBookmarked ? 'Usuń z zapisanych' : 'Zapisz ofertę'} className={styles.offer__bookmark}>
                            {
                                isBookmarked ? <FaBookmark /> : <FaRegBookmark />
                            }
                        </button>
                    }
                </div>
            </div>
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </article>
    )
}

export default OfferTile
