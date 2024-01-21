

import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import styles from './userProfileHeader.module.css';

interface Props {
    profilePicture?: string,
    name: string,
    surname: string,
    age: number,
    email: string,
    skills: string[],
    socialMedia: {
        facebook?: string,
        instagram?: string,
        linkedin?: string,
        github?: string
    }
}

const UserProfileHeader = ({ profilePicture, name, surname, age, email, skills, socialMedia: { facebook, instagram, linkedin, github } }: Props) => {
    return (
        <header className={styles.header}>
            <div className={styles.header__top}>
                <img className={styles.header__pfp} src={profilePicture || '/default.webp'} alt="profilowe użytkownika" />
                <div className={styles.header__info}>
                    <h1 className={styles.header__name}>{name} {surname}</h1>
                    <div className={styles.header__info__bottom}>
                        <p className={styles.header__age}>{age}</p>
                        <p className={styles.header__email}>{email}</p>
                    </div>
                </div>
            </div>
            {
                skills.length > 0 &&
                <p className={styles.header__skills}>
                    {
                        skills.map((skill, index, array) => {
                            if (index === array.length - 1) {
                                return skill;
                            }
                            else {
                                return `${skill}, `
                            }
                        })
                    }
                </p>
            }
            {
                (facebook || instagram || linkedin || github) &&
                <div className={styles.header__socialMedia}>
                    {
                        facebook &&
                        <a className={styles.header__socialLink} title='Facebook' target='_blank' href={facebook}>
                            <FaFacebook />
                        </a>
                    }
                    {
                        instagram &&
                        <a className={styles.header__socialLink} title='Instagram' target='_blank' href={instagram}>
                            <FaInstagram />
                        </a>
                    }
                    {
                        linkedin &&
                        <a className={styles.header__socialLink} title='Linkedin' target='_blank' href={linkedin}>
                            <FaLinkedin />
                        </a>
                    }
                    {
                        github &&
                        <a className={styles.header__socialLink} title='Github' target='_blank' href={github}>
                            <FaGithub />
                        </a>
                    }
                </div>
            }
        </header>
    )
}

export default UserProfileHeader
