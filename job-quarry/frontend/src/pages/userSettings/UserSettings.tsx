import { useState, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_USER_SETTINGS } from '../../graphql/queries';
import Input from '../../components/input/Input';
import Error from '../../components/error/Error';
import Popup from '../../components/popup/Popup';
import { Link } from 'react-router-dom';
import { FaImage, FaPlus } from 'react-icons/fa';

import styles from './userSettings.module.css';
import { UPDATE_USER_SETTINGS } from '../../graphql/mutations';
import formatDateForInput from '../../utils/formatDateForInput';
import axiosClient from '../../axiosClient';
import { GraphQLErrors } from '@apollo/client/errors';

const UserSettings = () => {
    const [settingsQuery] = useLazyQuery(GET_USER_SETTINGS);
    const [settingsMutation] = useMutation(UPDATE_USER_SETTINGS);
    const [userId, setUserId] = useState<string | null>(null);
    const [settings, setSettings] = useState<UserSettings>({ name: '', surname: '', email: '', age: '', profilePicture: '', password: '', passwordConfirmation: '', description: '', portfolio: '', socialMedia: { facebook: '', instagram: '', linkedin: '', github: '' }, skills: [], experience: [] });
    const [error, setError] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup>({ content: null, active: false, type: 'good' });

    useEffect(() => {
        async function fetchData() {
            const { data, error } = await settingsQuery();
            if (error) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
                return;
            }
            const response = data.getMeUser as UserProfile;
            setUserId(response._id);
            const experience = response.experience.map(item => {
                const newValue = { ...item, endDateChecked: false } as SettingsExperience;
                newValue.startDate = formatDateForInput(newValue.startDate);
                if (newValue.endDate) {
                    newValue.endDate = formatDateForInput(newValue.endDate);
                    newValue.endDateChecked = true;
                }
                else newValue.endDate = '';
                return newValue;
            }) as SettingsExperience[];
            setSettings({
                name: response.name,
                surname: response.surname,
                email: response.email,
                age: response.age.toString(),
                profilePicture: response.profilePicture,
                password: '',
                passwordConfirmation: '',
                description: response.description || '',
                portfolio: response.portfolio || '',
                socialMedia: {
                    facebook: response.socialMedia.facebook || '',
                    instagram: response.socialMedia.instagram || '',
                    linkedin: response.socialMedia.linkedin || '',
                    github: response.socialMedia.github || '',
                },
                skills: response.skills,
                experience
            });
        }

        fetchData();
    }, []);

    function changeData(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement | HTMLTextAreaElement;
        const id = input.id;
        const label = input.ariaLabel as string;

        setSettings(prev => {
            const experienceLabels = ['Tytuł', 'Firma', 'Data rozpoczęcia', 'Data zakończenia', 'Włącz datę zakończenia', 'Opis pracy'];
            if (experienceLabels.includes(label)) {
                const container = input.closest('[data-id="container"]') as HTMLDivElement;
                const index = parseInt(container.id.substring(11));
                const newValue = { ...prev };
                switch (label) {
                    case 'Tytuł':
                        newValue.experience[index].title = input.value;
                        break;
                    case 'Firma':
                        newValue.experience[index].company = input.value;
                        break;
                    case 'Data rozpoczęcia':
                        newValue.experience[index].startDate = input.value;
                        break;
                    case 'Data zakończenia':
                        newValue.experience[index].endDate = input.value;
                        break;
                    case 'Włącz datę zakończenia':
                        const checkbox = input as HTMLInputElement;
                        newValue.experience[index].endDateChecked = checkbox.checked;
                        break;
                    case 'Opis pracy':
                        newValue.experience[index].description = input.value;
                        break;
                }
                return newValue;
            }
            else {
                switch (label) {
                    case 'Imię':
                        return { ...prev, name: input.value }
                        break;
                    case 'Nazwisko':
                        return { ...prev, surname: input.value }
                        break;
                    case 'E-mail':
                        return { ...prev, email: input.value }
                        break;
                    case 'Wiek':
                        return { ...prev, age: input.value }
                        break;
                    case 'Nowe hasło':
                        return { ...prev, password: input.value }
                        break;
                    case 'Powtórz hasło':
                        return { ...prev, passwordConfirmation: input.value }
                        break;
                    case 'Opis':
                        return { ...prev, description: input.value }
                        break;
                    case 'Portfolio URL':
                        return { ...prev, portfolio: input.value }
                        break;
                    case 'Facebook':
                        return { ...prev, socialMedia: { ...prev.socialMedia, facebook: input.value } }
                        break;
                    case 'Instagram':
                        return { ...prev, socialMedia: { ...prev.socialMedia, instagram: input.value } }
                        break;
                    case 'Linkedin':
                        return { ...prev, socialMedia: { ...prev.socialMedia, linkedin: input.value } }
                        break;
                    case 'Github':
                        return { ...prev, socialMedia: { ...prev.socialMedia, github: input.value } }
                        break;
                    case 'Umiejętność':
                        const skillIndex = parseInt(id.substring(6));
                        const newSkillValue = { ...prev };
                        newSkillValue.skills[skillIndex] = input.value;
                        return newSkillValue;
                        break;
                    default: return prev;
                }
            }
        });
    }

    function changeFile(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement;
        const file = input.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSettings(prev => {
                    return { ...prev, profilePicture: reader.result as string }
                });
            }
            reader.readAsDataURL(file);
        }
    }

    async function saveSettings(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const fileInput = form.querySelector('#file') as HTMLInputElement;
        const file = fileInput.files?.[0];
        if (settings.password && (settings.password !== settings.passwordConfirmation)) {
            setPopup({ content: 'Hasła nie są identyczne', active: true, type: 'bad' });
            setTimeout(() => setPopup(prev => ({ ...prev, active: false })), 4000);
            return;
        }
        let fileName;
        if (file) {
            const formData = new FormData();
            formData.append('profile-picture', file);
            try {
                const { data } = await axiosClient({
                    method: 'post',
                    url: '/profile-picture-upload',
                    data: formData,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                fileName = data.fileName;
            } catch (err: any) {
                if (err?.response?.status === 422) {
                    setPopup({ content: err?.response?.data?.message, active: true, type: 'bad' });
                    setTimeout(() => setPopup(prev => ({ ...prev, active: false })), 4000);
                }
                else {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
                return;
            }
        }
        const experience: Experience[] = settings.experience.map(item => {
            if (!item.endDateChecked) item.endDate = '';
            return {
                title: item.title,
                company: item.company,
                startDate: item.startDate,
                endDate: item.endDate,
                description: item.description
            }
        });
        try {
            await settingsMutation({
                variables: {
                    settingsInput: {
                        name: settings.name,
                        surname: settings.surname,
                        email: settings.email,
                        age: parseInt(settings.age),
                        profilePicture: fileName && fileName,
                        password: settings.password && settings.password,
                        description: settings.description,
                        portfolio: settings.portfolio,
                        socialMedia: {
                            facebook: settings.socialMedia.facebook && settings.socialMedia.facebook,
                            instagram: settings.socialMedia.instagram && settings.socialMedia.instagram,
                            linkedin: settings.socialMedia.linkedin && settings.socialMedia.linkedin,
                            github: settings.socialMedia.github && settings.socialMedia.github
                        },
                        skills: settings.skills,
                        experience
                    }
                }
            });
            setPopup({ content: 'Zaktualizowano ustawienia', active: true, type: 'good' });
            setTimeout(() => setPopup(prev => ({ ...prev, active: false })), 4000);
        } catch (err: any) {
            const error = err.graphQLErrors[0] as GraphQLErrors[0];
            if (error.extensions.code === 'VALIDATION_ERROR') {
                setPopup({ content: error.message, active: true, type: 'bad' });
                setTimeout(() => setPopup(prev => ({ ...prev, active: false })), 4000);
            }
            else {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <form onSubmit={saveSettings} className={styles.form}>
            <div className={styles.form__row}>
                <Link to='/moje-aplikacje' className={styles.form__button}>Moje aplikacje</Link>
                <Link to='/zapisane' className={styles.form__button}>Zapisane oferty</Link>
                <Link to={`/profil/${userId}`} className={styles.form__button}>Podgląd profilu</Link>
            </div>
            <Input
                className={styles.form__input}
                type='text'
                placeholder='Imię'
                label='Imię'
                maxLength={20}
                required
                value={settings.name}
                onChange={changeData}
            />
            <Input
                className={styles.form__input}
                type='text'
                placeholder='Nazwisko'
                label='Nazwisko'
                maxLength={20}
                required
                value={settings.surname}
                onChange={changeData}
            />
            <Input
                className={styles.form__input}
                type='email'
                placeholder='E-mail'
                label='E-mail'
                maxLength={40}
                required
                value={settings.email}
                onChange={changeData}
            />
            <Input
                className={styles.form__input}
                type='number'
                placeholder='Wiek'
                label='Wiek'
                min={18}
                max={99}
                required
                value={settings.age}
                onChange={changeData}
            />
            <input onChange={changeFile} type="file" id='file' style={{ display: 'none' }} />
            <label htmlFor="file" className={settings.profilePicture ? styles.form__fileLabelImg : styles.form__fileLabel}>
                {
                    settings.profilePicture ? <img className={styles.fileLabel__img} src={settings.profilePicture} alt="zdjęcie profilowe użytkownika" />
                        :
                        <>
                            <FaImage className={styles.fileLabel__icon} />
                            <span className={styles.fileLabel__text}>Zdjęcie profilowe</span>
                        </>
                }
            </label>
            <div className={styles.form__row}>
                <Input
                    className={styles.form__input}
                    type='password'
                    placeholder='Nowe hasło'
                    label='Nowe hasło'
                    minLength={8}
                    maxLength={60}
                    value={settings.password}
                    onChange={changeData}
                />
                <Input
                    className={styles.form__input}
                    type='password'
                    placeholder='Powtórz hasło'
                    label='Powtórz hasło'
                    minLength={8}
                    maxLength={60}
                    value={settings.passwordConfirmation}
                    onChange={changeData}
                />
            </div>
            <textarea className={styles.form__textarea} placeholder='Opis' aria-label='Opis' maxLength={600} value={settings.description} onChange={changeData} cols={30} rows={10}></textarea>
            <Input
                className={styles.form__input}
                type='text'
                placeholder='Portfolio URL'
                label='Portfolio URL'
                maxLength={500}
                value={settings.portfolio}
                onChange={changeData}
            />
            <Input
                className={styles.form__input}
                type='text'
                placeholder='Facebook'
                label='Facebook'
                maxLength={500}
                value={settings.socialMedia.facebook}
                onChange={changeData}
            />
            <Input
                className={styles.form__input}
                type='text'
                placeholder='Instagram'
                label='Instagram'
                maxLength={500}
                value={settings.socialMedia.instagram}
                onChange={changeData}
            />
            <Input
                className={styles.form__input}
                type='text'
                placeholder='Linkedin'
                label='Linkedin'
                maxLength={500}
                value={settings.socialMedia.linkedin}
                onChange={changeData}
            />
            <Input
                className={styles.form__input}
                type='text'
                placeholder='Github'
                label='Github'
                maxLength={500}
                value={settings.socialMedia.github}
                onChange={changeData}
            />
            <div className={styles.form__section}>
                <p className={styles.section__heading}>Umiejętności</p>
                <div className={styles.section__column}>
                    {
                        settings.skills.map((item, index) => {
                            return (
                                <Input
                                    className={styles.form__input}
                                    key={`skill-${index}`}
                                    id={`skill-${index}`}
                                    type='text'
                                    placeholder='Umiejętność'
                                    label='Umiejętność'
                                    maxLength={30}
                                    required
                                    value={item}
                                    onChange={changeData}
                                />
                            )
                        })
                    }
                </div>
                <button onClick={() => setSettings(prev => ({ ...prev, skills: [...prev.skills, ''] }))} type='button' title='Dodaj umiejętność' className={styles.form__addButton}>
                    <FaPlus />
                </button>
            </div>
            <div className={styles.form__section}>
                <p className={styles.section__heading}>Doświadczenie</p>
                <div className={styles.section__column}>
                    {
                        settings.experience.map((item, index) => {
                            return (
                                <div data-id='container' key={`experience-${index}`} id={`experience-${index}`} className={styles.section__experience}>
                                    <Input
                                        className={styles.form__input}
                                        type='text'
                                        placeholder='Tytuł'
                                        label='Tytuł'
                                        maxLength={40}
                                        required
                                        value={item.title}
                                        onChange={changeData}
                                    />
                                    <Input
                                        className={styles.form__input}
                                        type='text'
                                        placeholder='Firma'
                                        label='Firma'
                                        maxLength={40}
                                        required
                                        value={item.company}
                                        onChange={changeData}
                                    />
                                    <Input
                                        className={styles.form__input}
                                        type='date'
                                        placeholder='Data rozpoczęcia'
                                        label='Data rozpoczęcia'
                                        required
                                        value={item.startDate}
                                        onChange={changeData}
                                    />
                                    <div className={styles.form__row}>
                                        <Input
                                            className={styles.form__input}
                                            type='date'
                                            placeholder='Data zakończenia'
                                            label='Data zakończenia'
                                            value={item.endDate}
                                            onChange={changeData}
                                        />
                                        <input onChange={changeData} aria-label='Włącz datę zakończenia' className={styles.form__checkbox} type="checkbox" checked={item.endDateChecked} />
                                    </div>
                                    <textarea className={styles.form__textarea} placeholder='Opis pracy' aria-label='Opis pracy' maxLength={500} value={item.description} onChange={changeData} cols={30} rows={10}></textarea>
                                </div>
                            )
                        })
                    }
                </div>
                <button type='button' onClick={() => setSettings(prev => ({ ...prev, experience: [...prev.experience, { title: '', company: '', startDate: '', endDate: '', endDateChecked: true, description: '' }] }))} className={styles.form__addButton} title='Dodaj doświadczenie'>
                    <FaPlus />
                </button>
            </div>
            <button className={styles.form__button}>Zapisz</button>
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </form>
    )
}

export default UserSettings
