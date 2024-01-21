import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_USER_PROFILE } from '../../graphql/queries';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoMdLink } from 'react-icons/io';
import { UserProfileHeader, UserProfileExperience } from '../../sections';
import styles from './userProfile.module.css';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

const UserProfile = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { isLoading: isAuthLoading, isCompany } = useSelector((state: RootState) => state.auth);
    const [profileQuery] = useLazyQuery(GET_USER_PROFILE);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            const { data, error } = await profileQuery({ variables: { getUserId: id } });
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
            setUser(data.getUser);
            setIsLoading(false);
        }

        fetchData();
    }, [id]);


    if (isLoading || isAuthLoading || !user) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <main className={styles.main}>
            <UserProfileHeader
                profilePicture={user.profilePicture}
                name={user.name}
                surname={user.surname}
                age={user.age}
                email={user.email}
                skills={user.skills}
                socialMedia={user.socialMedia}
            />
            {
                user.description && <p className={styles.main__description}>{user.description}</p>
            }
            <div className={styles.main__buttons}>
                {
                    user.portfolio &&
                    <a className={styles.main__button} href={user.portfolio} target='_blank'>
                        <IoMdLink />
                        <span>Portfolio</span>
                    </a>
                }
                {
                    isCompany &&
                    <Link className={styles.main__button} to={`/czaty?id=${user._id}`}>Wyślij wiadomość</Link>
                }
            </div>
            {
                user.experience.length > 0 &&
                <UserProfileExperience
                    experience={user.experience}
                />
            }
        </main>
    )
}

export default UserProfile
