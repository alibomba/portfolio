import { useState } from 'react';
import { BsFilePdfFill } from 'react-icons/bs';
import { useMutation } from '@apollo/client';
import { SEND_APPLICATION } from '../../graphql/mutations';
import styles from './applicationForm.module.css';
import Error from '../../components/error/Error';
import Popup from '../../components/popup/Popup';
import axiosClient from '../../axiosClient';
import { GraphQLErrors } from '@apollo/client/errors';

interface Props {
    offerId: string
}

const ApplicationForm = ({ offerId }: Props) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup>({ content: null, active: false, type: 'good' });
    const [applicationMutation] = useMutation(SEND_APPLICATION);

    function updateCV(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement;
        const file = input.files?.[0];
        if (file) {
            setFileName(file.name);
        }
    }

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const name = form.querySelector('#name') as HTMLInputElement;
        const surname = form.querySelector('#surname') as HTMLInputElement;
        const email = form.querySelector('#email') as HTMLInputElement;
        const phoneNumber = form.querySelector('#phoneNumber') as HTMLInputElement;
        const fileInput = form.querySelector('#file') as HTMLInputElement;
        const file = fileInput.files?.[0];
        const details = form.querySelector('#details') as HTMLTextAreaElement;
        const formData = new FormData();
        formData.append('cv', file || '');

        let cvFileName;
        try {
            const { data } = await axiosClient({
                method: 'post',
                url: '/cv-upload',
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            cvFileName = data.fileName;
        } catch (err: any) {
            if (err?.response?.status === 422) {
                setPopup({ content: err?.response?.data?.message, active: true, type: 'bad' });
                setTimeout(() => setPopup(prev => ({ ...prev, active: false })), 4000);
            } else {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
            return;
        }
        if (!cvFileName) return;

        try {
            await applicationMutation({
                variables: {
                    applicationInput: {
                        offerId,
                        name: name.value,
                        surname: surname.value,
                        email: email.value,
                        phoneNumber: phoneNumber.value,
                        cvUrl: cvFileName,
                        details: details.value || undefined
                    }
                }
            });
            form.reset();
            setFileName(null);
            setPopup({ content: 'Wysłano aplikację', active: true, type: 'good' });
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
        <section id='applicationSection' className={styles.section}>
            <h2 className={styles.section__heading}>Aplikuj:</h2>
            <form onSubmit={submit} className={styles.section__form}>
                <div className={styles.form__grid}>
                    <input maxLength={20} required id='name' type="text" aria-label='Imię' placeholder='Imię' className={styles.form__input} />
                    <input maxLength={20} required id='surname' type="text" aria-label='Nazwisko' placeholder='Nazwisko' className={styles.form__input} />
                    <input maxLength={40} required id='email' type="email" aria-label='E-mail' placeholder='E-mail' className={styles.form__input} />
                    <input maxLength={25} required id='phoneNumber' type="text" aria-label='Numer telefonu' placeholder='Nr telefonu' className={styles.form__input} />
                </div>
                <input onChange={updateCV} type="file" id='file' style={{ display: 'none' }} />
                <label htmlFor="file" className={styles.form__fileLabel}>
                    <BsFilePdfFill className={styles.fileLabel__icon} />
                    <span className={styles.fileLabel__text}>{fileName || 'Dodaj CV'}</span>
                </label>
                <textarea maxLength={300} id='details' cols={50} rows={10} className={styles.form__textarea} placeholder='Napisz coś o sobie' aria-label='Napisz coś o sobie'></textarea>
                <button className={styles.form__button}>Wyślij</button>
            </form>
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </section>
    )
}

export default ApplicationForm
