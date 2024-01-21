import {
    Chart,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

import { Pie } from 'react-chartjs-2'
import styles from './pieChart.module.css';

Chart.register(
    ArcElement,
    Tooltip,
    Legend
);

interface ChartData {
    data: {
        labels: string[],
        datasets: {
            data: number[],
            backgroundColor: string[]
        }[]
    }
}

const PieChart = ({ data }: ChartData) => {
    return (
        <div className={styles.chartContainer}>
            <Pie data={data} />
        </div >
    )
}

export default PieChart
