import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Error from '../../components/error/Error';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_TECHNOLOGIES, GET_OFFER } from '../../graphql/queries';
import { CREATE_OFFER, UPDATE_OFFER } from '../../graphql/mutations';
import { FaPlus } from 'react-icons/fa';
import Popup from '../../components/popup/Popup';
import Input from '../../components/input/Input';
import styles from './offerForm.module.css';
import { GraphQLErrors } from '@apollo/client/errors';
import formatDateForInput from '../../utils/formatDateForInput';
import mapStringToEnumValue from '../../utils/mapStringToEnumValue';

const OfferForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [technologiesQuery] = useLazyQuery(GET_TECHNOLOGIES);
    const [offerQuery] = useLazyQuery(GET_OFFER);
    const [createOfferMutation] = useMutation(CREATE_OFFER);
    const [updateOfferMutation] = useMutation(UPDATE_OFFER);
    const [formData, setFormData] = useState<OfferForm>({ title: '', mode: '', location: '', level: '', expiresAt: '', contractType: '', salary: '', requiredTechnologies: [], optionalTechnologies: [], description: '', tasks: [], required: [], optional: [], benefits: [], recruitmentStages: [] });
    const [technologies, setTechnologies] = useState<string[]>([]);
    const [popup, setPopup] = useState<Popup>({ content: null, active: false, type: 'good' });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            const { data, error } = await technologiesQuery();
            if (error) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
                return;
            }
            setTechnologies(data.getTechnologies);
            if (id) {
                const { data, error } = await offerQuery({ variables: { getOfferId: id } });
                if (error) {
                    const graphQLError = error.graphQLErrors[0];
                    if (graphQLError.extensions.code === 'NOT_FOUND') {
                        navigate('/404');
                    }
                    else {
                        setError('Coś poszło nie tak, spróbuj ponownie później...');
                    }
                    return;
                }
                const response = data.getOffer as Offer;
                setFormData({
                    title: response.title,
                    mode: mapStringToEnumValue('mode', response.mode) as string,
                    location: response.location,
                    level: mapStringToEnumValue('level', response.level) as string,
                    expiresAt: formatDateForInput(response.expiresAt),
                    contractType: mapStringToEnumValue('contractType', response.contractType) as string,
                    salary: response.salary.toString(),
                    requiredTechnologies: response.requiredTechnologies,
                    optionalTechnologies: response.optionalTechnologies,
                    description: response.description,
                    tasks: response.tasks,
                    required: response.required,
                    optional: response.optional,
                    benefits: response.benefits,
                    recruitmentStages: response.recruitmentStages
                });
            }
        }

        fetchData();
    }, [id]);

    function changeData(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        const id = input.id;
        const label = input.ariaLabel;

        setFormData(prev => {
            switch (label) {
                case 'Tytuł':
                    return { ...prev, title: input.value }
                    break;
                case 'Tryb pracy':
                    return { ...prev, mode: input.value }
                    break;
                case 'Lokalizacja':
                    return { ...prev, location: input.value }
                    break;
                case 'Poziom':
                    return { ...prev, level: input.value }
                    break;
                case 'Ważne do':
                    return { ...prev, expiresAt: input.value }
                    break;
                case 'Typ umowy':
                    return { ...prev, contractType: input.value }
                    break;
                case 'Zarobki/mies.':
                    return { ...prev, salary: input.value }
                    break;
                case 'Opis':
                    return { ...prev, description: input.value }
                    break;
                case 'Zadanie':
                    const tasks = prev.tasks;
                    tasks[parseInt(id)] = input.value;
                    return { ...prev, tasks }
                    break;
                case 'Wymaganie':
                    const required = prev.required;
                    required[parseInt(id)] = input.value;
                    return { ...prev, required }
                    break;
                case 'Element':
                    const optional = prev.optional;
                    optional[parseInt(id)] = input.value;
                    return { ...prev, optional }
                    break;
                case 'Benefit':
                    const benefits = prev.benefits;
                    benefits[parseInt(id)] = input.value;
                    return { ...prev, benefits }
                    break;
                case 'Krok':
                    const recruitmentStages = prev.recruitmentStages;
                    recruitmentStages[parseInt(id)] = input.value;
                    return { ...prev, recruitmentStages }
                    break;
                default: return prev;
            }
        });
    }

    function toggleRequiredTechnology(technology: string) {
        setFormData(prev => {
            if (prev.requiredTechnologies.includes(technology)) {
                const newTechnologies = prev.requiredTechnologies.filter(item => item !== technology);
                return { ...prev, requiredTechnologies: newTechnologies };
            }
            else {
                const newTechnologies = [...prev.requiredTechnologies, technology];
                return { ...prev, requiredTechnologies: newTechnologies };
            }
        });
    }

    function toggleOptionalTechnology(technology: string) {
        setFormData(prev => {
            if (prev.optionalTechnologies.includes(technology)) {
                const newTechnologies = prev.optionalTechnologies.filter(item => item !== technology);
                return { ...prev, optionalTechnologies: newTechnologies };
            }
            else {
                const newTechnologies = [...prev.optionalTechnologies, technology];
                return { ...prev, optionalTechnologies: newTechnologies };
            }
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const { title, mode, location, level, expiresAt, contractType, salary, requiredTechnologies, optionalTechnologies, description, tasks, required, optional, benefits, recruitmentStages } = formData;
        const input = {
            title,
            mode,
            location,
            level,
            expiresAt,
            contractType,
            salary: parseInt(salary),
            requiredTechnologies,
            optionalTechnologies,
            description,
            tasks,
            required,
            optional,
            benefits,
            recruitmentStages
        } as { id?: string };
        try {
            let message;
            if (id) {
                input.id = id;
                await updateOfferMutation({
                    variables: {
                        input
                    }
                });
                message = 'Zaktualizowano ofertę';
            }
            else {
                await createOfferMutation({
                    variables: {
                        input
                    }
                });
                message = 'Utworzono ofertę';
            }
            setPopup({ content: message, active: true, type: 'good' });
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
        <form onSubmit={handleSubmit} className={styles.form}>
            <Input
                className={styles.form__input}
                type='text'
                placeholder='Tytuł'
                label='Tytuł'
                maxLength={40}
                required
                value={formData.title}
                onChange={changeData}
            />
            <select aria-label='Tryb pracy' required value={formData.mode} onChange={changeData} className={styles.form__select}>
                <option value="">Tryb pracy</option>
                <option value="STACJONARNIE">Stacjonarnie</option>
                <option value="ZDALNIE">Zdalnie</option>
                <option value="HYBRYDOWO">Hybrydowo</option>
            </select>
            <Input
                className={styles.form__input}
                type='text'
                placeholder='Lokalizacja'
                label='Lokalizacja'
                maxLength={40}
                required
                value={formData.location}
                onChange={changeData}
            />
            <select aria-label='Poziom' required value={formData.level} onChange={changeData} className={styles.form__select}>
                <option value="">Poziom</option>
                <option value="JUNIOR">Junior</option>
                <option value="MID">Mid</option>
                <option value="SENIOR">Senior</option>
            </select>
            <Input
                className={styles.form__input}
                type='date'
                placeholder='Ważne do'
                label='Ważne do'
                required
                value={formData.expiresAt}
                onChange={changeData}
            />
            <select aria-label='Typ umowy' required value={formData.contractType} onChange={changeData} className={styles.form__select}>
                <option value="">Typ umowy</option>
                <option value="TYMCZASOWA">Tymczasowa</option>
                <option value="UMOWA_O_PRACE">Umowa o Pracę</option>
                <option value="UMOWA_O_DZIELO">Umowa o dzieło</option>
                <option value="UMOWA_ZLECENIE">Umowa zlecenie</option>
                <option value="PRAKTYKI_ZAWODOWE">Praktyki zawodowe</option>
                <option value="B2B">B2B</option>
                <option value="STAZ">Staż</option>
            </select>
            <Input
                className={styles.form__input}
                type='number'
                placeholder='Zarobki/mies.'
                label='Zarobki/mies.'
                min={0}
                required
                value={formData.salary}
                onChange={changeData}
            />
            <div className={styles.form__section}>
                <p className={styles.form__heading}>Wymagane technologie</p>
                <div className={styles.form__technologies}>
                    {
                        technologies.map((item, index) => <button onClick={() => toggleRequiredTechnology(item)} type='button' key={index} className={`${styles.form__technology} ${formData.requiredTechnologies.includes(item) && styles.form__technology_active}`}>{item}</button>)
                    }
                </div>
            </div>
            <div className={styles.form__section}>
                <p className={styles.form__heading}>Mile widziane technologie</p>
                <div className={styles.form__technologies}>
                    {
                        technologies.map((item, index) => <button onClick={() => toggleOptionalTechnology(item)} type='button' key={index} className={`${styles.form__technology} ${formData.optionalTechnologies.includes(item) && styles.form__technology_active}`}>{item}</button>)
                    }
                </div>
            </div>
            <textarea className={styles.form__textarea} aria-label='Opis' placeholder='Opis' required value={formData.description} onChange={changeData} maxLength={600} cols={30} rows={10}></textarea>
            <div className={styles.form__listSection}>
                <p className={styles.form__heading}>Twoje zadania:</p>
                <div className={styles.form__column}>
                    {
                        formData.tasks.map((item, index) => {
                            return (
                                <Input
                                    key={index}
                                    className={styles.form__input}
                                    id={index.toString()}
                                    type='text'
                                    placeholder='Zadanie'
                                    label='Zadanie'
                                    required
                                    value={item}
                                    onChange={changeData}
                                />
                            )
                        })
                    }
                </div>
                <button onClick={() => setFormData(prev => ({ ...prev, tasks: [...prev.tasks, ''] }))} type='button' title='Dodaj zadanie' className={styles.form__addButton}>
                    <FaPlus />
                </button>
            </div>
            <div className={styles.form__listSection}>
                <p className={styles.form__heading}>Wymagamy:</p>
                <div className={styles.form__column}>
                    {
                        formData.required.map((item, index) => {
                            return (
                                <Input
                                    key={index}
                                    className={styles.form__input}
                                    id={index.toString()}
                                    type='text'
                                    placeholder='Wymaganie'
                                    label='Wymaganie'
                                    required
                                    value={item}
                                    onChange={changeData}
                                />
                            )
                        })
                    }
                </div>
                <button onClick={() => setFormData(prev => ({ ...prev, required: [...prev.required, ''] }))} type='button' title='Dodaj wymaganie' className={styles.form__addButton}>
                    <FaPlus />
                </button>
            </div>
            <div className={styles.form__listSection}>
                <p className={styles.form__heading}>Opcjonalnie:</p>
                <div className={styles.form__column}>
                    {
                        formData.optional.map((item, index) => {
                            return (
                                <Input
                                    key={index}
                                    className={styles.form__input}
                                    id={index.toString()}
                                    type='text'
                                    placeholder='Element'
                                    label='Element'
                                    required
                                    value={item}
                                    onChange={changeData}
                                />
                            )
                        })
                    }
                </div>
                <button onClick={() => setFormData(prev => ({ ...prev, optional: [...prev.optional, ''] }))} type='button' title='Dodaj element' className={styles.form__addButton}>
                    <FaPlus />
                </button>
            </div>
            <div className={styles.form__listSection}>
                <p className={styles.form__heading}>Oferujemy:</p>
                <div className={styles.form__column}>
                    {
                        formData.benefits.map((item, index) => {
                            return (
                                <Input
                                    key={index}
                                    className={styles.form__input}
                                    id={index.toString()}
                                    type='text'
                                    placeholder='Benefit'
                                    label='Benefit'
                                    required
                                    value={item}
                                    onChange={changeData}
                                />
                            )
                        })
                    }
                </div>
                <button onClick={() => setFormData(prev => ({ ...prev, benefits: [...prev.benefits, ''] }))} type='button' title='Dodaj benefit' className={styles.form__addButton}>
                    <FaPlus />
                </button>
            </div>
            <div className={styles.form__listSection}>
                <p className={styles.form__heading}>Kroki rekrutacji:</p>
                <div className={styles.form__column}>
                    {
                        formData.recruitmentStages.map((item, index) => {
                            return (
                                <div key={index} className={styles.form__row}>
                                    <div className={styles.form__number}>{index + 1}</div>
                                    <Input
                                        className={styles.form__input}
                                        id={index.toString()}
                                        type='text'
                                        placeholder='Krok'
                                        label='Krok'
                                        required
                                        value={item}
                                        onChange={changeData}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <button onClick={() => setFormData(prev => ({ ...prev, recruitmentStages: [...prev.recruitmentStages, ''] }))} type='button' title='Dodaj krok rekrutacji' className={styles.form__addButton}>
                    <FaPlus />
                </button>
            </div>
            <button className={styles.form__button}>Zapisz</button>
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </form>
    )
}

export default OfferForm
