import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Error from '../../components/error/Error';
import Popup from '../../components/popup/Popup';
import axiosClient from '../../axiosClient';
import axios from 'axios';

import { BsCardImage } from 'react-icons/bs';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import styles from './location.module.css';

interface LocationData {
    name: string,
    standard: number
}

const Location = () => {
    const { id } = useParams();
    const [locationData, setLocationData] = useState<LocationData>({ name: '', standard: 0 });
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup>({ content: null, active: false, type: 'good' });

    useEffect(() => {
        if (id) {
            const source = axios.CancelToken.source();

            axiosClient({
                method: 'get',
                url: `/locations/${id}`,
                cancelToken: source.token
            })
                .then(res => {
                    const location: LocationDB = res.data;
                    setLocationData({
                        name: location.name,
                        standard: location.standard
                    });
                    setSelectedImage(`${process.env.REACT_APP_BACKEND_URL}/storage/locations/${location.image}`);
                })
                .catch(err => {
                    if (err?.response?.status === 404) {
                        setError('Lokacja nie istnieje');
                    }
                    else {
                        setError('Coś poszło nie tak, spróbuj ponownie później...');
                    }
                });

            return () => {
                source.cancel();
            }
        }
    }, [id]);

    function changeName(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement;
        setLocationData(prev => { return { ...prev, name: input.value } });
    }

    function changeStandard(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement;
        setLocationData(prev => { return { ...prev, standard: parseInt(input.value) } });
    }

    function changeImage(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement;
        const image = input.files?.[0];
        const allowedMimeTypes = ['image/jpg', 'image/png', 'image/jpeg'];

        if (image && allowedMimeTypes.includes(image.type)) {
            const url = URL.createObjectURL(image);
            setSelectedImage(url);
        }
        else {
            setPopup({ content: 'Plik musi być obrazem', active: true, type: 'bad' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
        }
    }

    async function updateLocation(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const imageInput = form.querySelector('#image') as HTMLInputElement;
        const image = imageInput.files?.[0];
        const data = new FormData();
        data.append('image', image || '');
        data.append('name', locationData.name);
        data.append('standard', locationData.standard.toString());

        try {
            await axiosClient({
                method: 'put',
                url: `/locations/${id}`,
                data,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            setValidationError(null);
            setPopup({ content: 'Lokacja została zaktualizowana', active: true, type: 'good' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
        } catch (err: any) {
            if (err?.response?.status === 422) {
                setValidationError(err?.response?.data?.message);
            } else {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
    }

    async function createLocation(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const imageInput = form.querySelector('#image') as HTMLInputElement;
        const image = imageInput.files?.[0];
        const data = new FormData();
        data.append('image', image || '');
        data.append('name', locationData.name);
        data.append('standard', locationData.standard.toString());

        try {
            await axiosClient({
                method: 'post',
                url: '/locations',
                data,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            form.reset();
            setSelectedImage(null);
            setLocationData({ name: '', standard: 0 });
            setValidationError(null);
            setPopup({ content: 'Utworzono lokację', active: true, type: 'good' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
        } catch (err: any) {
            if (err?.response?.status === 422) {
                setValidationError(err?.response?.data?.message);
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
        <form onSubmit={id ? updateLocation : createLocation} className={styles.form} encType='multipart/form-data'>
            <Input
                id='name'
                ariaLabel='Nazwa'
                placeholder='Nazwa'
                type='text'
                maxLength={100}
                value={locationData.name}
                onChange={changeName}
            />
            <Input
                id='standard'
                ariaLabel='Standard'
                placeholder='Standard'
                type='number'
                min={1}
                max={5}
                value={locationData.standard}
                onChange={changeStandard}
            />
            <input onChange={changeImage} type="file" id='image' style={{ display: 'none' }} />
            <label htmlFor="image" className={styles.form__imgLabel}>
                {
                    selectedImage ? <img className={styles.form__imgLabel__img} src={selectedImage} alt="wybrany obraz" /> : <BsCardImage />
                }
            </label>
            {
                validationError && <p role='alert' aria-live='assertive' className={styles.form__error}>{validationError}</p>
            }
            <Button>Zapisz</Button>
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </form>
    )
}

export default Location
