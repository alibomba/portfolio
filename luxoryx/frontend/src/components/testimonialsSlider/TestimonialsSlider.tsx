import { useState, useEffect } from 'react';
import { GrLinkPrevious, GrLinkNext } from 'react-icons/gr';
import Testimonial from '../testimonial/Testimonial';
import styles from './testimonialsSlider.module.css';



const TestimonialsSlider = () => {
    const [scrollX, setScrollX] = useState<number>(0);
    const [isEndOfScroll, setIsEndOfScroll] = useState<boolean>(false);

    useEffect(() => {
        const vw = window.innerWidth;
        if (scrollX >= 60 && vw >= 1610) {
            setIsEndOfScroll(true);
        }
        else if (scrollX >= 69 && vw < 1610 && vw >= 1430) {
            setIsEndOfScroll(true);
        }
        else if (scrollX >= 80 && vw < 1430 && vw >= 1230) {
            setIsEndOfScroll(true);
        }
        else if (scrollX >= 90 && vw < 1230 && vw >= 1026) {
            setIsEndOfScroll(true);
        }
        else if (scrollX >= 108 && vw < 1026 && vw >= 830) {
            setIsEndOfScroll(true);
        }
        else if (scrollX >= 105 && vw < 830 && vw >= 740) {
            setIsEndOfScroll(true);
        }
        else if (scrollX >= 108 && vw < 740 && vw >= 700) {
            setIsEndOfScroll(true);
        }
        else if (scrollX >= 72 && vw < 700 && vw >= 614) {
            setIsEndOfScroll(true);
        }
        else if (scrollX >= 82.5 && vw < 614 && vw >= 452) {
            setIsEndOfScroll(true);
        }
        else if (scrollX >= 84 && vw < 452 && vw >= 428) {
            setIsEndOfScroll(true);
        }
        else if (scrollX >= 88 && vw < 428 && vw >= 355) {
            setIsEndOfScroll(true);
        }
        else if (scrollX >= 90 && vw < 355 && vw >= 324) {
            setIsEndOfScroll(true);
        }
        else if (scrollX >= 93 && vw < 324 && vw >= 278) {
            setIsEndOfScroll(true);
        }
        else {
            setIsEndOfScroll(false);
        }

    }, [scrollX]);

    function sliderScroll(direction: 'previous' | 'next'): void {
        const vw = window.innerWidth;
        let offset: number = 0;
        if (vw >= 1610) {
            offset = 30;
        }
        else if (vw < 1610 && vw >= 1430) {
            offset = 23;
        }
        else if (vw < 1430 && vw >= 1230) {
            offset = 16;
        }
        else if (vw < 1230 && vw >= 830) {
            offset = 9;
        }
        else if (vw < 830 && vw >= 740) {
            offset = 7;
        }
        else if (vw < 740 && vw >= 614) {
            offset = 6;
        }
        else if (vw < 614 && vw >= 452) {
            offset = 7.5;
        }
        else if (vw < 452 && vw >= 428) {
            offset = 6;
        }
        else if (vw < 428 && vw >= 355) {
            offset = 4;
        }
        else if (vw < 355 && vw >= 278) {
            offset = 3;
        }


        if (direction === 'previous') {
            setScrollX(prev => prev - offset);
        }
        else if (direction === 'next') {
            setScrollX(prev => prev + offset);
        }
    }

    return (
        <div className={styles.testimonials}>
            <Testimonial
                scrollX={scrollX}
                imgUrl='andrzej-pawlak.jpg'
                text='Jestem stałym klientem tego sklepu i nigdy się nie zawiodłem. Zegarki, które stąd zakupiłem, zachwycają nie tylko designem, ale także trwałością. To miejsce, gdzie warto inwestować w luksus.'
                author='Andrzej Pawlak'
            />
            <Testimonial
                scrollX={scrollX}
                imgUrl='magdalena-jankowska.jpg'
                text='Biżuteria i zegarki z tego sklepu są absolutnie oszałamiające. Zakupiłam u nich pierścień zaręczynowy, który jest po prostu przepiękny. Jakość wykonania i obsługa klienta na najwyższym poziomie.'
                author='Magdalena Jankowska'
            />
            <Testimonial
                scrollX={scrollX}
                imgUrl='marta-kubiak.jpg'
                text='Moja nowa bransoletka i zegarek są doskonałymi dodatkami do mojej kolekcji biżuterii. Jestem pod wrażeniem elegancji i precyzji wykonania tych produktów. Gorąco polecam!'
                author='Marta Kubiak'
            />
            <Testimonial
                scrollX={scrollX}
                imgUrl='kamil-nowak.jpg'
                text='Moja żona otrzymała odemnie naszyjnik z tego sklepu na naszą rocznicę, a jej reakcja była bezcenna. Biżuteria jest piękna i wyjątkowa. Dziękujemy za dostarczenie tak wyjątkowego prezentu!'
                author='Kamil Nowak'
            />
            <Testimonial
                scrollX={scrollX}
                imgUrl='michal-wojciechowski.jpg'
                text='To były moje pierwsze zakupy w sklepie, i jestem zachwycony. Zegarek, który zakupiłem, jest nie tylko piękny, ale także precyzyjny. Obsługa klienta była pomocna i profesjonalna. Polecam każdemu poszukującemu wyjątkowego zegarka.'
                author='Michał Wojciechowski'
            />
            {
                scrollX !== 0 &&
                <button onClick={() => sliderScroll('previous')} className={`${styles.testimonials__button} ${styles.testimonials__button_previous}`}>
                    <GrLinkPrevious />
                </button>
            }
            {
                !isEndOfScroll &&
                <button onClick={() => sliderScroll('next')} className={`${styles.testimonials__button} ${styles.testimonials__button_next}`}>
                    <GrLinkNext />
                </button>
            }
        </div>
    )
}

export default TestimonialsSlider
