import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BsCardImage } from 'react-icons/bs';
import Error from '../../components/error/Error';
import Popup from '../../components/popup/Popup';
import Input from '../../components/input/Input';
import styles from './service.module.css';
import Button from '../../components/button/Button';
import axiosClient from '../../axiosClient';
import axios from 'axios';

interface ServiceData {
    title: string,
    price: string,
    description: string,
    isFeatured: boolean
}

const Service = () => {
    const { id } = useParams();
    const [serviceData, setServiceData] = useState<ServiceData>({ title: '', price: '', description: '', isFeatured: false });
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup>({ content: null, active: false, type: 'good' });

    useEffect(() => {
        const source = axios.CancelToken.source();

        async function fetchData() {
            if (id) {
                try {
                    const res = await axiosClient({
                        method: 'get',
                        url: `/services/${id}`,
                        cancelToken: source.token
                    });
                    const serviceRes: ServiceWithFeatured = res.data;
                    setServiceData({
                        title: serviceRes.title,
                        price: serviceRes.price,
                        description: serviceRes.description,
                        isFeatured: serviceRes.FeaturedOffer ? true : false
                    });
                    setSelectedImage(`${process.env.REACT_APP_BACKEND_URL}/storage/services/${serviceRes.image}`);
                } catch (err: any) {
                    if (err?.response?.status === 404) {
                        setError('Usługa nie istnieje');
                    }
                    else {
                        setError('Coś poszło nie tak, spróbuj ponownie później...');
                    }
                }
            }
        }

        fetchData();

        return () => {
            source.cancel();
        }

    }, [id]);


    function changeTitle(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement;
        setServiceData(prev => { return { ...prev, title: input.value } });
    }

    function changePrice(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement;
        setServiceData(prev => { return { ...prev, price: input.value } });
    }

    function changeDescription(e: React.ChangeEvent) {
        const textarea = e.target as HTMLTextAreaElement;
        setServiceData(prev => { return { ...prev, description: textarea.value } });
    }

    function changeIsFeatured() {
        setServiceData(prev => { return { ...prev, isFeatured: !prev.isFeatured } });
    }

    function changePreviewImage(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement;
        const file = input.files?.[0];
        const allowedMimeTypes = ['image/jpg', 'image/png', 'image/jpeg'];

        if (file && allowedMimeTypes.includes(file.type)) {
            const url = URL.createObjectURL(file);
            setSelectedImage(url);
        }
        else {
            setPopup({ content: 'Plik musi być obrazem', active: true, type: 'bad' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
        }

    }

    async function createService(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const image = form.querySelector('#image') as HTMLInputElement;
        const file = image.files?.[0];
        const data = new FormData();
        data.append('title', serviceData.title);
        data.append('price', serviceData.price);
        data.append('description', serviceData.description);
        data.append('isFeatured', serviceData.isFeatured ? 'true' : 'false');
        data.append('image', file || '');

        try {
            await axiosClient({
                method: 'post',
                url: '/services',
                data,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            setServiceData({ title: '', price: '', description: '', isFeatured: false });
            setValidationError(null);
            setSelectedImage(null);
            setPopup({ content: 'Usługa została dodana', active: true, type: 'good' });
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

    async function updateService(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const image = form.querySelector('#image') as HTMLInputElement;
        const file = image.files?.[0];
        const data = new FormData();
        data.append('title', serviceData.title);
        data.append('price', serviceData.price);
        data.append('description', serviceData.description);
        data.append('image', file || '');
        data.append('isFeatured', serviceData.isFeatured ? 'true' : 'false');

        try {
            await axiosClient({
                method: 'put',
                url: `/services/${id}`,
                data,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            setValidationError(null);
            setPopup({ content: 'Usługa została zaktualizowana', active: true, type: 'good' });
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
        <form onSubmit={id ? updateService : createService} encType='multipart/form-data' className={styles.form}>
            <Input
                id='name'
                ariaLabel='Nazwa'
                placeholder='Nazwa'
                type='text'
                maxLength={50}
                value={serviceData.title}
                onChange={changeTitle}
            />
            <Input
                id='price'
                ariaLabel='Cena'
                placeholder='Cena'
                type='text'
                maxLength={20}
                value={serviceData.price}
                onChange={changePrice}
            />
            <textarea required onChange={changeDescription} value={serviceData.description} id="description" cols={30} rows={7} className={styles.form__textarea} aria-label='Opis' placeholder='Opis' maxLength={255}></textarea>
            <input onChange={changePreviewImage} aria-label='Obraz usługi' type="file" id='image' style={{ display: 'none' }} />
            <label htmlFor='image' className={styles.form__image}>
                {
                    selectedImage ? <img className={styles.form__image__preview} src={selectedImage} alt="obraz usługi" /> : <BsCardImage />
                }
            </label>
            <div className={styles.form__row}>
                <input onChange={changeIsFeatured} checked={serviceData.isFeatured} className={styles.form__checkbox} type="checkbox" id="isFeatured" />
                <label htmlFor='isFeatured' className={styles.form__label}>Polecany pakiet</label>
            </div>
            {
                validationError && <p role='alert' aria-live='assertive' className={styles.form__error}>{validationError}</p>
            }
            <Button>Zapisz</Button>
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </form>
    )
}

export default Service
