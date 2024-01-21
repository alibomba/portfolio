import React, { useState, useRef } from 'react';
import Error from '../error/Error';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery, useQuery } from '@apollo/client';
import styles from './search.module.css';
import { GET_TECHNOLOGIES, LOCATION_AUTOCOMPLETE } from '../../graphql/queries';
import { IoMdClose } from 'react-icons/io';

interface Props {
    className?: string;
    variant: 'homepage' | 'search';
    setSearchInput?: React.Dispatch<React.SetStateAction<SearchInput>>
}

const Search = ({ className, variant, setSearchInput }: Props) => {
    const navigate = useNavigate();
    const [autocompleteQuery] = useLazyQuery(LOCATION_AUTOCOMPLETE);
    useQuery(GET_TECHNOLOGIES, {
        onCompleted: data => setTechnologies(data.getTechnologies)
    });
    const locationRef = useRef<HTMLInputElement>(null);
    const [locationAutocomplete, setLocationAutocomplete] = useState<string[]>([]);
    const [technologies, setTechnologies] = useState<string[]>([]);
    const [technologiesVisible, setTechnologiesVisible] = useState<boolean>(false);
    const [technologiesChecked, setTechnologiesChecked] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);


    async function autocomplete(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement;
        if (!input.value) {
            setLocationAutocomplete([]);
            return;
        }
        const { data, error } = await autocompleteQuery({ variables: { phrase: input.value } });
        if (error) {
            setError('Coś poszło nie tak, spróbuj ponownie później...');
            return;
        }
        setLocationAutocomplete(data.locationAutocomplete);
    }

    function autocompleteOff(e: React.KeyboardEvent) {
        if (e.key === 'Escape') {
            setLocationAutocomplete([]);
        }
    }

    function useAutocomplete(e: React.MouseEvent) {
        const button = e.target as HTMLButtonElement;
        if (locationRef.current) {
            locationRef.current.value = button.innerText;
            setLocationAutocomplete([]);
        }
    }

    function toggleTechnology(e: React.MouseEvent) {
        const button = e.target as HTMLButtonElement;
        const technology = button.innerText;
        setTechnologiesChecked(prev => {
            if (prev.includes(technology)) {
                return prev.filter(item => item !== technology);
            }
            else {
                return [technology, ...prev];
            }
        });
    }

    function searchAndRedirect(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const phrase = form.querySelector('#phrase') as HTMLInputElement;
        const city = form.querySelector('#city') as HTMLInputElement;
        const level = form.querySelector('#level') as HTMLInputElement;
        const contractType = form.querySelector('#contractType') as HTMLInputElement;
        const mode = form.querySelector('#mode') as HTMLInputElement;
        const salaryFrom = form.querySelector('#salaryFrom') as HTMLInputElement;
        const salaryTo = form.querySelector('#salaryTo') as HTMLInputElement;

        const url = new URL('https://test.com/przegladaj');
        if (phrase.value) {
            url.searchParams.set('phrase', phrase.value);
        }
        if (city.value) {
            url.searchParams.set('city', city.value);
        }
        if (level.value) {
            url.searchParams.set('level', level.value);
        }
        if (contractType.value) {
            url.searchParams.set('contractType', contractType.value);
        }
        if (mode.value) {
            url.searchParams.set('mode', mode.value);
        }
        if (technologiesChecked.length > 0) {
            url.searchParams.set('technologies', JSON.stringify(technologiesChecked));
        }
        if (salaryFrom.value) {
            url.searchParams.set('salaryFrom', salaryFrom.value);
        }
        if (salaryTo.value) {
            url.searchParams.set('salaryTo', salaryTo.value);
        }
        const redirect = `${url.pathname}${url.search}`;
        navigate(encodeURI(redirect));
    }

    function search(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const phrase = form.querySelector('#phrase') as HTMLInputElement;
        const city = form.querySelector('#city') as HTMLInputElement;
        const level = form.querySelector('#level') as HTMLInputElement;
        const contractType = form.querySelector('#contractType') as HTMLInputElement;
        const mode = form.querySelector('#mode') as HTMLInputElement;
        const salaryFrom = form.querySelector('#salaryFrom') as HTMLInputElement;
        const salaryTo = form.querySelector('#salaryTo') as HTMLInputElement;
        if (setSearchInput) {
            setSearchInput(() => {
                const newValue: SearchInput = {};
                if (phrase.value) {
                    newValue.phrase = phrase.value;
                }
                if (city.value) {
                    newValue.city = city.value;
                }
                if (level.value) {
                    newValue.level = level.value;
                }
                if (contractType.value) {
                    newValue.contractType = contractType.value;
                }
                if (mode.value) {
                    newValue.mode = mode.value;
                }
                if (technologiesChecked.length > 0) {
                    newValue.technologies = technologiesChecked;
                }
                if (salaryFrom.value) {
                    newValue.salaryFrom = parseInt(salaryFrom.value);
                }
                if (salaryTo.value) {
                    newValue.salaryTo = parseInt(salaryTo.value);
                }
                return newValue;
            });
        }
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            <form onSubmit={variant === 'homepage' ? searchAndRedirect : search} className={`${styles.search} ${className && className}`}>
                <div className={styles.search__row}>
                    <input id='phrase' className={styles.search__input} aria-label='Fraza' placeholder='Fraza' type="text" maxLength={50} />
                    <div className={styles.search__inputContainer}>
                        <input autoComplete='off' id='city' ref={locationRef} onChange={autocomplete} onKeyDown={autocompleteOff} className={`${styles.search__input} ${locationAutocomplete.length > 0 && styles.search__input_square}`} aria-label='Miasto' placeholder='Miasto' type="text" maxLength={40} />
                        {
                            locationAutocomplete.length > 0 &&
                            <div className={styles.search__autocomplete}>
                                {
                                    locationAutocomplete.map(location => {
                                        return (
                                            <button onClick={useAutocomplete} key={location} type='button' className={styles.search__autocompleteButton}>{location}</button>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                    <select id='level' className={styles.search__input} aria-label='Poziom'>
                        <option value="">Poziom</option>
                        <option value="JUNIOR">Junior</option>
                        <option value="MID">Mid</option>
                        <option value="SENIOR">Senior</option>
                    </select>
                </div>
                <div className={styles.search__row}>
                    <select id='contractType' className={styles.search__input} aria-label='Typ umowy'>
                        <option value="">Typ umowy</option>
                        <option value="TYMCZASOWA">Tymczasowa</option>
                        <option value="UMOWA_O_PRACE">Umowa o Pracę</option>
                        <option value="UMOWA_O_DZIELO">Umowa o dzieło</option>
                        <option value="UMOWA_ZLECENIE">Umowa zlecenie</option>
                        <option value="PRAKTYKI_ZAWODOWE">Praktyki zawodowe</option>
                        <option value="B2B">B2B</option>
                        <option value="STAZ">Staż</option>
                    </select>
                    <select id='mode' className={styles.search__input} aria-label='Tryb pracy'>
                        <option value="">Tryb pracy</option>
                        <option value="STACJONARNIE">Stacjonarnie</option>
                        <option value="ZDALNIE">Zdalnie</option>
                        <option value="HYBRYDOWO">Hybrydowo</option>
                    </select>
                    <button onClick={() => setTechnologiesVisible(true)} className={styles.search__button} type='button'>Technologie</button>
                </div>
                <div className={styles.search__row}>
                    <input id='salaryFrom' className={styles.search__input} aria-label='Płaca od' placeholder='Płaca od' type="number" min={0} />
                    <input id='salaryTo' className={styles.search__input} aria-label='Płaca do' placeholder='Płaca do' type="number" min={0} />
                    <button className={styles.search__button}>Wyszukaj</button>
                </div>
            </form>
            {
                technologiesVisible &&
                <div className={styles.search__technologies}>
                    {
                        technologies.map(technology => <button onClick={toggleTechnology} key={technology} className={`${styles.search__technology} ${technologiesChecked.includes(technology) && styles.search__technology_active}`}>{technology}</button>)
                    }
                    <button onClick={() => setTechnologiesVisible(false)} title='Zamknij' className={styles.search__close}>
                        <IoMdClose />
                    </button>
                </div>
            }
        </>
    )
}

export default Search
