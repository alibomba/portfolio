import { useState } from 'react';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import Testimonial from '../../components/testimonial/Testimonial';
import styles from './testimonials.module.css';
import data from './data';

const Testimonials = () => {
    const [activeTestimonial, setActiveTestimonial] = useState<number>(0);

    function previousTestimonial() {
        setActiveTestimonial(prev => {
            if (prev === 0) {
                return data.length - 1;
            }
            else {
                return prev - 1;
            }
        });
    }

    function nextTestimonial() {
        setActiveTestimonial(prev => {
            if (prev === data.length - 1) {
                return 0;
            }
            else {
                return prev + 1;
            }
        });
    }

    return (
        <section className={styles.section}>
            <h2 className={styles.section__heading}>Opinie</h2>
            <div className={styles.section__slider}>
                <button onClick={previousTestimonial} title='Poprzednia opinia' className={`${styles.section__button} ${styles.section__button_previous}`}>
                    <FaLongArrowAltLeft />
                </button>
                {
                    <Testimonial
                        image={data[activeTestimonial].image}
                        fullName={data[activeTestimonial].fullName}
                        position={data[activeTestimonial].position}
                        content={data[activeTestimonial].content}
                    />
                }
                <button onClick={nextTestimonial} title='Następna opinia' className={styles.section__button}>
                    <FaLongArrowAltRight />
                </button>
            </div>
        </section>
    )
}

export default Testimonials
