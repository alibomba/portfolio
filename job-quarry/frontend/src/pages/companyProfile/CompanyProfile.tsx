import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { GET_COMPANY_PROFILE } from '../../graphql/queries';
import OfferTile from '../../components/offerTile/OfferTile';
import { FaFacebook, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import { FaEarthAmericas } from 'react-icons/fa6';
import styles from './companyProfile.module.css';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';

const CompanyProfile = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [companyQuery] = useLazyQuery(GET_COMPANY_PROFILE);
    const [company, setCompany] = useState<CompanyProfile | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            const { data, error } = await companyQuery({ variables: { getCompanyId: id } });
            if (error) {
                const graphQLError = error.graphQLErrors[0];
                if (graphQLError.extensions.code === 'NOT_FOUND') {
                    navigate('/404');
                }
                else {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
                return;
            }
            setCompany(data.getCompany);
            setIsLoading(false);
        }

        fetchData();
    }, [id]);

    if (isLoading || !company) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <main className={styles.main}>
            <header className={styles.main__header}>
                <div className={styles.header__top}>
                    <img className={styles.header__logo} src={company.logo || '/default.webp'} alt="logo firmy" />
                    <h1 className={styles.header__companyName}>{company.companyName}</h1>
                </div>
                {
                    (company.socialMedia.facebook || company.socialMedia.instagram || company.socialMedia.linkedin || company.socialMedia.github || company.website) &&
                    <div className={styles.header__socialMedia}>
                        {
                            company.socialMedia.facebook &&
                            <a className={styles.header__socialLink} href={company.socialMedia.facebook} title='Facebook' target='_blank'>
                                <FaFacebook />
                            </a>
                        }
                        {
                            company.socialMedia.instagram &&
                            <a className={styles.header__socialLink} href={company.socialMedia.instagram} title='Instagram' target='_blank'>
                                <FaInstagram />
                            </a>
                        }
                        {
                            company.socialMedia.linkedin &&
                            <a className={styles.header__socialLink} href={company.socialMedia.linkedin} title='Linkedin' target='_blank'>
                                <FaLinkedin />
                            </a>
                        }
                        {
                            company.socialMedia.github &&
                            <a className={styles.header__socialLink} href={company.socialMedia.github} title='Github' target='_blank'>
                                <FaGithub />
                            </a>
                        }
                        {
                            company.website &&
                            <a className={styles.header__socialLink} href={company.website} title='Strona internetowa firmy' target='_blank'>
                                <FaEarthAmericas />
                            </a>
                        }
                    </div>
                }
            </header>
            {
                company.description && <p className={styles.main__description}>{company.description}</p>
            }
            {
                company.offers.length > 0 &&
                <section className={styles.main__offers}>
                    <h2 className={styles.offers__heading}>Oferty:</h2>
                    <div className={styles.offers__list}>
                        {
                            company.offers.map(offer => {
                                return (
                                    <OfferTile
                                        key={offer._id}
                                        _id={offer._id}
                                        title={offer.title}
                                        company={{ companyName: company.companyName, logo: company.logo }}
                                        mode={offer.mode}
                                        location={offer.location}
                                        salary={offer.salary}
                                        requiredTechnologies={offer.requiredTechnologies}
                                    />
                                )
                            })
                        }
                    </div>
                </section>
            }
        </main>
    )
}

export default CompanyProfile
