

import SkillAccordion from '../../components/skillAccordion/SkillAccordion';
import styles from './userProfileExperience.module.css';

interface Props {
    experience: Experience[]
}

const UserProfileExperience = ({ experience }: Props) => {
    return (
        <section className={styles.section}>
            <h2 className={styles.section__heading}>Doświadczenie:</h2>
            <div className={styles.section__list}>
                {
                    experience.map((item, index) => {
                        return (
                            <SkillAccordion
                                key={index}
                                experience={item}
                            />
                        )
                    })
                }
            </div>
        </section>
    )
}

export default UserProfileExperience
