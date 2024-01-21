import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaImage } from 'react-icons/fa';
import { useLazyQuery, useMutation } from '@apollo/client';
import styles from './companySettings.module.css';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import Input from '../../components/input/Input';
import Popup from '../../components/popup/Popup';
import { GET_COMPANY_PROFILE, GET_COMPANY_SETTINGS } from '../../graphql/queries';
import { UPDATE_COMPANY_SETTINGS } from '../../graphql/mutations';
import { GraphQLErrors } from '@apollo/client/errors';
import axiosClient from '../../axiosClient';

interface CompanySettingsI extends CompanySettings {
    email: string;
    password: string;
    passwordConfirmation: string;
}

const CompanySettings = () => {
    const [settingsQuery] = useLazyQuery(GET_COMPANY_SETTINGS);
    const [settingsMutation] = useMutation(UPDATE_COMPANY_SETTINGS, { refetchQueries: [{ query: GET_COMPANY_PROFILE }] });
    const [settings, setSettings] = useState<CompanySettingsI | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup>({ content: null, active: false, type: 'good' });

    useEffect(() => {
        async function fetchData() {
            const { data, error } = await settingsQuery();
            if (error) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
                return;
            }
            setSettings(data.getMeCompany);
            setIsLoading(false);
        }

        fetchData();
    }, []);

    function handleInputChange(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement | HTMLTextAreaElement;
        const label = input.ariaLabel as string;
        setSettings(prev => {
            if (!prev) return null;
            switch (label) {
                case 'Nazwa firmy':
                    return { ...prev, companyName: input.value }
                    break;
                case 'E-mail':
                    return { ...prev, email: input.value }
                    break;
                case 'Nowe hasło':
                    return { ...prev, password: input.value }
                    break;
                case 'Powtórz hasło':
                    return { ...prev, passwordConfirmation: input.value }
                    break;
                case 'URL Strony':
                    return { ...prev, website: input.value }
                    break;
                case 'Facebook':
                    return { ...prev, socialMedia: { facebook: input.value } }
                    break;
                case 'Instagram':
                    return { ...prev, socialMedia: { instagram: input.value } }
                    break;
                case 'Linkedin':
                    return { ...prev, socialMedia: { linkedin: input.value } }
                    break;
                case 'Github':
                    return { ...prev, socialMedia: { github: input.value } }
                    break;
                case 'Opis':
                    return { ...prev, description: input.value }
                    break;
                default: return prev;
            }
        });
    }

    function handleFileChange(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement;
        const file = input.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSettings(prev => {
                    if (!prev) return null;
                    return { ...prev, logo: reader.result as string }
                });
            }
            reader.readAsDataURL(file);
        }
    }

    async function saveSettings(e: React.FormEvent) {
        e.preventDefault();
        if (!settings) return;
        if (settings.password !== settings.passwordConfirmation) {
            setPopup({ content: 'Hasła nie są identyczne', active: true, type: 'bad' });
            setTimeout(() => setPopup(prev => ({ ...prev, active: false })), 4000);
            return;
        }
        const form = e.target as HTMLFormElement;
        const fileInput = form.querySelector('#file') as HTMLInputElement;
        const file = fileInput.files?.[0];
        let fileName;
        if (file) {
            const formData = new FormData();
            formData.append('logo', file);
            try {
                const { data } = await axiosClient({
                    url: '/company-logo-upload',
                    method: 'post',
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    data: formData
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
        try {
            await settingsMutation({
                variables: {
                    settingsInput: {
                        companyName: settings.companyName,
                        email: settings.email,
                        logo: fileName && fileName,
                        password: settings.password && settings.password,
                        website: settings.website,
                        socialMedia: {
                            facebook: settings.socialMedia.facebook,
                            instagram: settings.socialMedia.instagram,
                            linkedin: settings.socialMedia.linkedin,
                            github: settings.socialMedia.github,
                        },
                        description: settings.description
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

    if (isLoading || !settings) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <form onSubmit={saveSettings} className={styles.form}>
            <div className={styles.form__row}>
                <Link className={styles.form__button} to='/dodaj-oferte'>Dodaj ofertę</Link>
                <Link className={styles.form__button} to='/moje-oferty'>Moje oferty</Link>
                <Link className={styles.form__button} to='/moje-aplikacje-firma'>Moje aplikacje</Link>
                <Link className={styles.form__button} to={`/firma/${settings._id}`}>Podgląd profilu</Link>
            </div>
            <Input
                className={styles.form__input}
                type='text'
                placeholder='Nazwa firmy'
                label='Nazwa firmy'
                maxLength={30}
                required
                value={settings.companyName}
                onChange={handleInputChange}
            />
            <Input
                className={styles.form__input}
                type='email'
                placeholder='E-mail'
                label='E-mail'
                maxLength={40}
                required
                value={settings.email}
                onChange={handleInputChange}
            />
            <div className={styles.form__row}>
                <Input
                    className={styles.form__input}
                    type='password'
                    placeholder='Nowe hasło'
                    label='Nowe hasło'
                    minLength={8}
                    maxLength={60}
                    value={settings.password}
                    onChange={handleInputChange}
                />
                <Input
                    className={styles.form__input}
                    type='password'
                    placeholder='Powtórz hasło'
                    label='Powtórz hasło'
                    minLength={8}
                    maxLength={60}
                    value={settings.passwordConfirmation}
                    onChange={handleInputChange}
                />
            </div>
            <Input
                className={styles.form__input}
                type='text'
                placeholder='URL Strony'
                label='URL Strony'
                maxLength={500}
                value={settings.website}
                onChange={handleInputChange}
            />
            <input onChange={handleFileChange} type="file" style={{ display: 'none' }} id='file' />
            <label className={settings.logo ? styles.form__fileLabelImg : styles.form__fileLabel} htmlFor="file">
                {
                    settings.logo ? <img className={styles.fileLabel__img} src={settings.logo} alt="aktualne logo firmy" /> :
                        <>
                            <FaImage className={styles.fileLabel__icon} />
                            <span className={styles.fileLabel__text}>Logo</span>
                        </>
                }
            </label>
            <Input
                className={styles.form__input}
                type='text'
                placeholder='Facebook'
                label='Facebook'
                maxLength={500}
                value={settings.socialMedia.facebook}
                onChange={handleInputChange}
            />
            <Input
                className={styles.form__input}
                type='text'
                placeholder='Instagram'
                label='Instagram'
                maxLength={500}
                value={settings.socialMedia.instagram}
                onChange={handleInputChange}
            />
            <Input
                className={styles.form__input}
                type='text'
                placeholder='Linkedin'
                label='Linkedin'
                maxLength={500}
                value={settings.socialMedia.linkedin}
                onChange={handleInputChange}
            />
            <Input
                className={styles.form__input}
                type='text'
                placeholder='Github'
                label='Github'
                maxLength={500}
                value={settings.socialMedia.github}
                onChange={handleInputChange}
            />
            <textarea className={styles.form__textarea} aria-label='Opis' placeholder='Opis' maxLength={600} value={settings.description} onChange={handleInputChange} cols={30} rows={10}></textarea>
            <button className={styles.form__button}>Zapisz</button>
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </form>
    )
}

export default CompanySettings
