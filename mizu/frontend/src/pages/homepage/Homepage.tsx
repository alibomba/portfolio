import { Hero, HomepageStats, NearProjects, HomepageQuote, Newsletter, LatestNews } from '../../sections';
import { Link } from 'react-router-dom';

import styles from './homepage.module.css';

const Homepage = () => {
  return (
    <>
      <Hero />
      <main>
        <HomepageStats />
        <NearProjects />
        <section className={styles.iframeSection}>
          <iframe className={styles.iframeSection__iframe} width="560" height="315" src="https://www.youtube.com/embed/18xB7LFRv6E?si=8dErCE1kmMxZIoIT" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </section>
        <section className={styles.adviceSection}>
          <h2 className={styles.adviceSection__heading}>Porady ekologiczne</h2>
          <Link to='/porady-ekologiczne' className={styles.adviceSection__button}>Zobacz</Link>
        </section>
        <HomepageQuote />
        <Newsletter />
        <LatestNews />
      </main>
    </>
  )
}

export default Homepage
