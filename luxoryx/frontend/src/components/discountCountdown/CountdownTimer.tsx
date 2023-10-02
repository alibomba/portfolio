import { useState, useEffect } from 'react';

import styles from './countdownTimer.module.css';

interface CountdownTimerProps {
    targetDate: string;
    className?: string;
}

interface TimeRemaining {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

function CountdownTimer({ targetDate, className }: CountdownTimerProps): JSX.Element {
    const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [countdownFinished, setCountdownFinished] = useState<boolean>(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentDate = new Date().getTime();
            const endDate = new Date(targetDate).getTime();
            const timeDiff = endDate - currentDate;

            if (timeDiff <= 0) {
                clearInterval(interval);
                setCountdownFinished(true);
            } else {
                const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                const hours = Math.floor(
                    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

                setTimeRemaining({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    const { days, hours, minutes, seconds } = timeRemaining;

    return (
        <>
            {
                !countdownFinished ? <p className={`${styles.discountTimer} ${className}`}>{`${days}:${hours}:${minutes}:${seconds}`}</p> : ''
            }
        </>
    );
}

export default CountdownTimer;