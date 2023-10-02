import { useState, useEffect, useRef } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import styles from './kontoSettings.module.css';
import axiosClient from '../../axiosClient';
import axios from 'axios';
import Popup from '../../components/popup/Popup';

interface Props {
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

interface FormModal {
  title: string;
  key: string;
}

interface Popup {
  content: string | null,
  active: boolean,
  type: 'good' | 'bad'
}

const KontoSettings = ({ setError }: Props) => {
  const [pfp, setPfp] = useState<string>('/img/default-pfp.jpg');
  const [formModal, setFormModal] = useState<FormModal | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [popup, setPopup] = useState<Popup>({ content: null, active: false, type: 'good' });
  const usernameRef = useRef<HTMLParagraphElement>(null);
  const cityRef = useRef<HTMLParagraphElement>(null);
  const addressRef = useRef<HTMLParagraphElement>(null);
  const emailRef = useRef<HTMLParagraphElement>(null);
  const phoneNumberRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    axiosClient({
      method: 'get',
      url: '/settings',
      cancelToken: source.token
    })
      .then(res => {
        const data: Settings = res.data;
        if (data.profile_picture) {
          setPfp(`${process.env.REACT_APP_BACKEND_URL}/storage/pfp/${data.profile_picture}`)
        }
        usernameRef.current!.innerText = data.username;
        emailRef.current!.innerText = data.email;
        phoneNumberRef.current!.innerText = data.phone_number;
        if (data.shipping.city) {
          cityRef.current!.innerText = data.shipping.city;
        }
        if (data.shipping.address) {
          addressRef.current!.innerText = data.shipping.address;
        }
      })
      .catch(err => {
        setError('Coś poszło nie tak, spróbuj ponownie później...');
      })

    return () => {
      source.cancel();
    }

  }, []);

  async function handleImageChange(e: React.ChangeEvent) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    const formData = new FormData();

    if (file) {
      if (file.type.startsWith('image/')) {
        formData.append('image', file);
        try {
          const res = await axiosClient({
            method: 'put',
            url: '/update-user',
            headers: {
              "Content-Type": "multipart/form-data"
            },
            data: formData
          });
          setPfp(`${process.env.REACT_APP_BACKEND_URL}/storage/pfp/${res.data.path}`);
          setPopup({ content: 'Zaktualizowano zdjęcie profilowe', active: true, type: 'good' });
          setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
        } catch (err: any) {
          console.log(err);
          if (err?.response?.status === 422) {
            setPopup({ content: err?.response?.data?.message, active: true, type: 'bad' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
          } else if (err?.response?.status !== 400) {
            setError('Coś poszło nie tak, spróbuj ponownie później...');
          }
        }
      }
      else {
        alert('Niepoprawny typ pliku. Wybierz obraz.');
      }
    }
  }

  async function submitSetting(e: React.FormEvent, key: string) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector('input') as HTMLInputElement;
    const formData = new FormData();
    formData.append(key, input.value);

    try {
      await axiosClient({
        method: 'put',
        url: '/update-user',
        data: formData
      });
      form.reset();
      setFormModal(null);
      setValidationError(null);
      setPopup({ content: 'Zmieniono ustawienie', active: true, type: 'good' });
      setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
    } catch (err: any) {
      if (err?.response?.status === 422 || err?.response?.status === 400) {
        setValidationError(err?.response?.data?.message);
      }
      else {
        setError('Coś poszło nie tak, spróbuj ponownie później...');
      }
    }
  }

  async function deletePfp(): Promise<void> {
    try {
      await axiosClient({
        method: 'delete',
        url: '/delete-pfp'
      });
      setPfp('/img/default-pfp.jpg');
      setPopup({ content: 'Usunięto zdjęcie profilowe', active: true, type: 'good' });
      setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
    } catch (err) {
      setError('Coś poszło nie tak, spróbuj ponownie później...');
    }
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.main__heading}>Ustawienia konta</h1>
      <section className={styles.section}>
        <h2 className={styles.section__heading}>Informacje</h2>
        <div className={styles.section__field}>
          <p className={styles.section__label}>Zdjęcie profilowe</p>
          <div className={styles.section__field__right}>
            <label className={styles.section__imgLabel} htmlFor="pfp">
              <img className={styles.section__imgLabel__img} src={pfp} alt="zdjęcie profilowe" />
              <AiOutlineCamera className={styles.section__imgLabel__icon} />
            </label>
            {
              pfp !== '/img/default-pfp.jpg' && <button onClick={deletePfp} className={styles.section__deletePfp}>Usuń</button>
            }
            <input formEncType='multipart/form-data' accept='image/*' onChange={handleImageChange} id='pfp' type="file" style={{ display: 'none' }} />
          </div>
        </div>
        <div className={styles.section__field}>
          <p className={styles.section__label}>Nazwa użytkownika</p>
          <div className={styles.section__field__right}>
            <p ref={usernameRef} className={styles.section__value}>Wprowadź</p>
            <button onClick={() => setFormModal({ title: 'Nazwa użytkownika', key: 'username' })} className={styles.section__arrow}>
              <BsArrowRight />
            </button>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <h2 className={styles.section__heading}>Dane dostawy</h2>
        <div className={styles.section__field}>
          <p className={styles.section__label}>Miasto</p>
          <div className={styles.section__field__right}>
            <p ref={cityRef} className={styles.section__value}>Wprowadź</p>
            <button onClick={() => setFormModal({ title: 'Miasto', key: 'city' })} className={styles.section__arrow}>
              <BsArrowRight />
            </button>
          </div>
        </div>
        <div className={styles.section__field}>
          <p className={styles.section__label}>Adres</p>
          <div className={styles.section__field__right}>
            <p ref={addressRef} className={styles.section__value}>Wprowadź</p>
            <button onClick={() => setFormModal({ title: 'Adres', key: 'address' })} className={styles.section__arrow}>
              <BsArrowRight />
            </button>
          </div>
        </div>
        <div className={styles.section__field}>
          <p className={styles.section__label}>E-mail</p>
          <div className={styles.section__field__right}>
            <p ref={emailRef} className={styles.section__value}>Wprowadź</p>
            <button onClick={() => setFormModal({ title: 'Adres e-mail', key: 'email' })} className={styles.section__arrow}>
              <BsArrowRight />
            </button>
          </div>
        </div>
        <div className={styles.section__field}>
          <p className={styles.section__label}>Numer telefonu</p>
          <div className={styles.section__field__right}>
            <p ref={phoneNumberRef} className={styles.section__value}>Wprowadź</p>
            <button onClick={() => setFormModal({ title: 'Numer telefonu', key: 'phoneNumber' })} className={styles.section__arrow}>
              <BsArrowRight />
            </button>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <h2 className={styles.section__heading}>Bezpieczeństwo</h2>
        <div className={styles.section__field}>
          <p className={styles.section__label}>Hasło</p>
          <div className={styles.section__field__right}>
            <p className={styles.section__value}>&#183; &#183; &#183; &#183; &#183; &#183; &#183; &#183;</p>
            <button onClick={() => setFormModal({ title: 'Hasło', key: 'password' })} className={styles.section__arrow}>
              <BsArrowRight />
            </button>
          </div>
        </div>
      </section>
      {
        formModal &&
        <>
          <form onSubmit={(e) => submitSetting(e, formModal.key)} className={styles.formModal}>
            <h2 className={styles.formModal__heading}>{formModal.title}</h2>
            <input required placeholder={formModal.title} className={styles.formModal__input} type={formModal.title === 'Hasło' ? 'password' : 'text'} />
            {
              validationError && <p className={styles.formModal__error}>{validationError}</p>
            }
            <button className={styles.formModal__button}>Zapisz</button>
          </form>
          <div onClick={() => { setFormModal(null); setValidationError(null); }} className={styles.formModalOverlay}></div>
        </>
      }
      <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
    </main>
  )
}

export default KontoSettings
