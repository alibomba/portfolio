import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BsCardImage } from 'react-icons/bs';
import {format} from 'date-fns';
import Error from '../../components/error/Error';
import Popup from '../../components/popup/Popup';
import axiosClient from '../../axiosClient';
import axios from 'axios';

import Input from '../../components/input/Input';
import styles from './project.module.css';
import Button from '../../components/button/Button';


interface ProjectData {
    title: string,
    date: string,
    content: string
}

const Project = () => {
    const { id } = useParams();
    const [projectData, setProjectData] = useState<ProjectData>({ title: '', date: '', content: '' });
    const [imagesSelected, setImagesSelected] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup>({ content: null, active: false, type: 'good' });

    useEffect(() => {
        if (id) {
            const source = axios.CancelToken.source();

            axiosClient({
                method: 'get',
                url: `/project/${id}`,
                cancelToken: source.token
            })
                .then(res => {
                    const data: Project = res.data;
                    setProjectData({
                        title: data.title,
                        date: format(new Date(data.date), 'yyyy-MM-dd'),
                        content: data.content
                    });
                })
                .catch(err => {
                    setError('Coś poszło nie tak, spróbuj ponownie później...')
                });

            return () => {
                source.cancel();
            }
        }
    }, [id]);

    function changeTitle(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement;
        setProjectData(prev => { return { ...prev, title: input.value } });
    }

    function changeDate(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement;
        setProjectData(prev => { return { ...prev, date: input.value } });
    }

    function changeContent(e: React.ChangeEvent) {
        const textarea = e.target as HTMLTextAreaElement;
        setProjectData(prev => { return { ...prev, content: textarea.value } });
    }

    function setFiles(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement;
        const files = input.files;
        if (files) setImagesSelected(files.length);
    }

    async function updateProject(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const imagesInput = form.querySelector('#images') as HTMLInputElement;
        const images = imagesInput.files;
        const data = new FormData();
        data.append('title', projectData.title);
        data.append('date', projectData.date);
        data.append('content', projectData.content);
        if (images) {
            for (let i = 0; i < images.length; i++) {
                data.append('images', images[i]);
            }
        }

        try {
            await axiosClient({
                method: 'put',
                url: `/project/${id}`,
                data,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            setImagesSelected(0);
            setValidationError(null);
            setPopup({ content: 'Zapisano projekt', active: true, type: 'good' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
        } catch (err: any) {
            if (err?.response?.status === 422) {
                setValidationError(err?.response?.data?.message);
            } else {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
    }

    async function createProject(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const imagesInput = form.querySelector('#images') as HTMLInputElement;
        const images = imagesInput.files;
        const data = new FormData();
        data.append('title', projectData.title);
        data.append('date', projectData.date);
        data.append('content', projectData.content);
        if (images) {
            for (let i = 0; i < images.length; i++) {
                data.append('images', images[i]);
            }
        }

        try {
            await axiosClient({
                method: 'post',
                url: '/project',
                data,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            setProjectData({ title: '', date: '', content: '' });
            setImagesSelected(0);
            setValidationError(null);
            setPopup({ content: 'Dodano projekt', active: true, type: 'good' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
        } catch (err: any) {
            if (err?.response?.status === 422) {
                setValidationError(err?.response?.data?.message);
            } else {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }

    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <form onSubmit={id ? updateProject : createProject} className={styles.form} encType='multipart/form-data'>
            <Input
                id='title'
                ariaLabel='Nazwa'
                placeholder='Nazwa'
                maxLength={25}
                type='text'
                value={projectData.title}
                onChange={changeTitle}
            />
            <Input
                id='date'
                ariaLabel='Data'
                type='date'
                value={projectData.date}
                onChange={changeDate}
            />
            <input multiple onChange={setFiles} type="file" id='images' style={{ display: 'none' }} />
            <label htmlFor='images' className={styles.form__label}>
                <BsCardImage className={styles.form__label__icon} /> {imagesSelected ? `Wybrano ${imagesSelected} obrazów` : 'Wybierz/zamień obrazy'}
            </label>
            <textarea onChange={changeContent} value={projectData.content} id="content" placeholder='Treść' aria-label='Treść' cols={45} rows={10} maxLength={1500} className={styles.form__textarea} required></textarea>
            {
                validationError && <p className={styles.form__error} role='alert' aria-live='assertive'>{validationError}</p>
            }
            <Button>Zapisz</Button>
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </form>
    )
}

export default Project
