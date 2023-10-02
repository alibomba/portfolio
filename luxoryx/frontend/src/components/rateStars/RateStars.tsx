import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { useEffect, useState } from 'react';


import styles from './rateStars.module.css';

interface Props {
  howMany: number;
  setHowMany?: React.Dispatch<React.SetStateAction<number>>;
}

const RateStars = ({ howMany, setHowMany }: Props) => {
  const [stars, setStars] = useState<React.ReactNode[] | undefined>(undefined);
  function changeStars(number: number) {
    setHowMany!(number);
  }


  useEffect(() => {
    const starsTemp: React.ReactNode[] = [
      <AiOutlineStar key={1} onClick={() => setHowMany && changeStars(1)} className={styles.star} />,
      <AiOutlineStar key={2} onClick={() => setHowMany && changeStars(2)} className={styles.star} />,
      <AiOutlineStar key={3} onClick={() => setHowMany && changeStars(3)} className={styles.star} />,
      <AiOutlineStar key={4} onClick={() => setHowMany && changeStars(4)} className={styles.star} />,
      <AiOutlineStar key={5} onClick={() => setHowMany && changeStars(5)} className={styles.star} />
    ]
    for (let i = 0; i < howMany; i++) {
      starsTemp[i] = <AiFillStar key={i + 1} onClick={() => setHowMany && changeStars(i + 1)} className={styles.star} />;
    }
    setStars(starsTemp);
  }, [howMany]);

  return (
    <div className={styles.stars}>
      {
        stars && stars.map(star => star)
      }
    </div>
  )
}

export default RateStars