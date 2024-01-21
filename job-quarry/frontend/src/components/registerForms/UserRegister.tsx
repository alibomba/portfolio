import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { USER_REGISTER } from '../../graphql/mutations';
import Error from '../error/Error';
import Input from '../input/Input';
import Popup from '../popup/Popup';
import styles from './registerForm.module.css';
import { GraphQLErrors } from '@apollo/client/errors';

interface RegisterData {
    email: string;
    name: string;
    surname: string;
    age: string;
    password: string;
    passwordConfirmation: string;
}

const UserRegister = () => {
    const [registerData, setRegisterData] = useState<RegisterData>({ email: '', name: '', surname: '', age: '', password: '', passwordConfirmation: '' });
    const [validationError, setValidationError] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup>({ type: 'good', active: false, content: null });
    const [error, setError] = useState<string | null>(null);
    const [registerMutation] = useMutation(USER_REGISTER);

    function changeData(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement;
        const id = input.id;

        switch (id) {
            case 'email':
                setRegisterData(prev => ({ ...prev, email: input.value }));
                break;
            case 'name':
                setRegisterData(prev => ({ ...prev, name: input.value }));
                break;
            case 'surname':
                setRegisterData(prev => ({ ...prev, surname: input.value }));
                break;
            case 'age':
                setRegisterData(prev => ({ ...prev, age: input.value }));
                break;
            case 'password':
                setRegisterData(prev => ({ ...prev, password: input.value }));
                break;
            case 'passwordConfirmation':
                setRegisterData(prev => ({ ...prev, passwordConfirmation: input.value }));
                break;
        }
    }

    async function register(e: React.FormEvent) {
        e.preventDefault();
        if (registerData.password !== registerData.passwordConfirmation) {
            setValidationError('Hasła nie są identyczne');
            return;
        }
        try {
            await registerMutation({
                variables: {
                    userRegisterInput: {
                        name: registerData.name,
                        surname: registerData.surname,
                        email: registerData.email,
                        age: parseInt(registerData.age),
                        password: registerData.password
                    }
                }
            });
            setValidationError(null);
            setRegisterData({ email: '', name: '', surname: '', age: '', password: '', passwordConfirmation: '' });
            setPopup({ content: 'Zarejestrowano', active: true, type: 'good' });
            setTimeout(() => setPopup(prev => ({ ...prev, active: false })), 4000);
        } catch (err: any) {
            const error = err.graphQLErrors[0] as GraphQLErrors[0];
            if (error.extensions.code === 'VALIDATION_ERROR') {
                setValidationError(error.message);
            } else {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <form onSubmit={register} className={styles.form}>
            <div className={styles.form__container}>
                <label htmlFor="email" className={styles.form__label}>E-mail</label>
                <Input
                    id='email'
                    placeholder='johndoe@gmail.com'
                    type='email'
                    maxLength={40}
                    required
                    value={registerData.email}
                    onChange={changeData}
                />
            </div>
            <div className={styles.form__container}>
                <label htmlFor="name" className={styles.form__label}>Imię</label>
                <Input
                    id='name'
                    placeholder='John'
                    type='text'
                    maxLength={20}
                    required
                    value={registerData.name}
                    onChange={changeData}
                />
            </div>
            <div className={styles.form__container}>
                <label htmlFor="surname" className={styles.form__label}>Nazwisko</label>
                <Input
                    id='surname'
                    placeholder='Doe'
                    type='text'
                    maxLength={20}
                    required
                    value={registerData.surname}
                    onChange={changeData}
                />
            </div>
            <div className={styles.form__container}>
                <label htmlFor="age" className={styles.form__label}>Wiek</label>
                <Input
                    id='age'
                    placeholder='18'
                    type='number'
                    min={18}
                    max={99}
                    required
                    value={registerData.age}
                    onChange={changeData}
                />
            </div>
            <div className={styles.form__container}>
                <label htmlFor="password" className={styles.form__label}>Hasło</label>
                <Input
                    id='password'
                    placeholder='Twoje hasło'
                    type='password'
                    minLength={8}
                    maxLength={60}
                    required
                    value={registerData.password}
                    onChange={changeData}
                />
            </div>
            <div className={styles.form__container}>
                <label htmlFor="passwordConfirmation" className={styles.form__label}>Powtórz hasło</label>
                <Input
                    id='passwordConfirmation'
                    placeholder='Twoje hasło'
                    type='password'
                    minLength={8}
                    maxLength={60}
                    required
                    value={registerData.passwordConfirmation}
                    onChange={changeData}
                />
            </div>
            <button className={styles.form__button}>Zarejestruj się</button>
            {
                validationError && <p role='alert' aria-live='assertive' className={styles.form__error}>{validationError}</p>
            }
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </form>
    )
}

export default UserRegister
