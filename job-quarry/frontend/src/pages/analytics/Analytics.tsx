import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_ANALYTICS } from '../../graphql/queries';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../components/input/Input';
import styles from './analytics.module.css';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import Popup from '../../components/popup/Popup';
import PieChart from '../../components/pieChart/PieChart';

interface Range {
    startDate: string,
    endDate: string
}

const Analytics = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [analyticsQuery] = useLazyQuery(GET_ANALYTICS);
    const [range, setRange] = useState<Range>({ startDate: '', endDate: '' });
    const [analytics, setAnalytics] = useState<Analytics | null>({
        totalViews: 200,
        CTR: {
            percentage: 32,
            thumbnailViewsMinusViews: 40,
            views: 200
        },
        applications: 12,
        applicationsToViews: 5.3,
        applicantsCategories: {
            notSpecified: 3,
            first: 0,
            second: 2,
            third: 4,
            fourth: 1,
            fifth: 0,
            sixth: 2
        }
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup>({ content: null, active: false, type: 'good' });

    useEffect(() => {
        async function fetchData() {
            const { data, error } = await analyticsQuery({
                variables: {
                    analyticsInput: {
                        id,
                        startDate: range.startDate && range.startDate,
                        endDate: range.endDate && range.endDate
                    }
                }
            });
            if (error) {
                const graphQLError = error.graphQLErrors[0];
                if (graphQLError.extensions.code === 'NOT_FOUND') {
                    navigate('/404');
                }
                else if (graphQLError.extensions.code === 'VALIDATION_ERROR') {
                    setPopup({ content: graphQLError.message, active: true, type: 'bad' });
                    setTimeout(() => setPopup(prev => ({ ...prev, active: false })), 4000);
                }
                else {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
                console.log(error);
                return;
            }
            setAnalytics(data.getAnalytics);
            setIsLoading(false);
        }

        fetchData();
    }, [range]);

    function changeDate(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement;
        const id = input.id;
        if (id === 'startDate') {
            setRange(prev => ({ ...prev, startDate: input.value }));
        }
        else if (id === 'endDate') {
            setRange(prev => ({ ...prev, endDate: input.value }));
        }
    }

    if (isLoading || !analytics) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <main className={styles.main}>
            <div className={styles.main__row}>
                <div className={styles.main__column}>
                    <label className={styles.main__label} htmlFor="startDate">Od daty</label>
                    <Input
                        className={styles.main__input}
                        id='startDate'
                        type='date'
                        placeholder='Od daty'
                        value={range.startDate}
                        onChange={changeDate}
                    />
                </div>
                <div className={styles.main__column}>
                    <label className={styles.main__label} htmlFor="endDate">Do daty</label>
                    <Input
                        className={styles.main__input}
                        id='endDate'
                        type='date'
                        placeholder='Do daty'
                        value={range.endDate}
                        onChange={changeDate}
                    />
                </div>
            </div>
            <p className={styles.main__paragraph}><b>Liczba wyświetleń:</b> {analytics.totalViews}</p>
            <p className={styles.main__paragraph}><b>CTR(Click-Through Rate):</b> {analytics.CTR.percentage ? `${analytics.CTR.percentage}%` : 'N/A'}</p>
            <div className={styles.main__column}>
                <p className={styles.main__paragraph}><b>Wykres CTR:</b></p>
                {
                    (analytics.CTR.views || analytics.CTR.thumbnailViewsMinusViews) ?
                        <PieChart
                            data={{
                                labels: ['Zobaczyło', 'Zobaczyło i weszło'],
                                datasets: [
                                    {
                                        data: [analytics.CTR.thumbnailViewsMinusViews, analytics.CTR.views],
                                        backgroundColor: ['#C700EB', '#00EBA3']
                                    }
                                ]
                            }}
                        />
                        : <p className={styles.main__paragraph}>N/A</p>
                }
            </div>
            <p className={styles.main__paragraph}><b>Liczba aplikacji:</b> {analytics.applications}</p>
            <p className={styles.main__paragraph}><b>Stosunek aplikacji do wyświetleń:</b> {analytics.applicationsToViews ? `${analytics.applicationsToViews}%` : 'N/A'}</p>
            <div className={styles.main__column}>
                <p className={styles.main__paragraph}><b>Wiek aplikantów:</b></p>
                {
                    (analytics.applicantsCategories.notSpecified || analytics.applicantsCategories.first || analytics.applicantsCategories.second || analytics.applicantsCategories.third || analytics.applicantsCategories.fourth || analytics.applicantsCategories.fifth || analytics.applicantsCategories.sixth) ?
                        <PieChart
                            data={{
                                labels: ['Brak danych', '18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
                                datasets: [
                                    {
                                        data: [analytics.applicantsCategories.notSpecified, analytics.applicantsCategories.first, analytics.applicantsCategories.second, analytics.applicantsCategories.third, analytics.applicantsCategories.fourth, analytics.applicantsCategories.fifth, analytics.applicantsCategories.sixth],
                                        backgroundColor: ['rgba(23, 12, 24, .65)', '#D208F6', '#B717D3', '#9E23B5', '#822D92', '#5C2E65', '#3F2843']
                                    }
                                ]
                            }}
                        />
                        : <p className={styles.main__paragraph}>N/A</p>
                }
            </div>
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </main>
    )
}

export default Analytics