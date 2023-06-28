import data from './data';
import { EventHandler, SyntheticEvent, useState } from 'react';
import { BsGenderMale, BsGenderFemale, BsGenderAmbiguous } from 'react-icons/bs';

import styles from './services.module.css';

const Services = () => {

    interface Services {
        [key: string]: {
            name: string;
            icon: JSX.Element;
        }[]
    };

    const services: Services = data;

    const [activeBodyPart, setActiveBodyPart] = useState<string>('uniwersalne');

    const handleMap: EventHandler<SyntheticEvent<HTMLAreaElement>> = (e) => {
        const hoveredArea = e.target as HTMLAreaElement;
        const activePart = hoveredArea.getAttribute('title') as string;

        if (activePart !== activeBodyPart) {
            setActiveBodyPart(activePart);
        }
    }

    return (
        <section className={styles.services}>
            <h2 className={styles.services__heading}>Nasze usługi</h2>
            <p
                className={styles.services__main__heading}
                style={{ textTransform: 'capitalize' }}
            >{activeBodyPart}:</p>
            <main className={styles.services__main}>

                <div className={styles.services__main__left}>
                    {services[activeBodyPart].map((item, index) => {
                        return <p key={index} className={styles.services__row}>{item.icon} {item.name}</p>
                    })}
                </div>

                <img className={styles.services__main__img_400} src="img/czlowiek-400.png" alt="sylwetka człowieka" useMap="#map-400" />
                <map className={styles.services__main__map_400} name="map-400">
                    <area tabIndex={0} onMouseOver={handleMap} onFocus={handleMap} target="" alt="włosy" title="włosy" coords="155,57,243,57,243,39,237,21,225,10,213,4,197,3,179,7,165,18,156,30,154,44" shape="poly" />
                    <area tabIndex={0} onMouseOver={handleMap} onFocus={handleMap} target="" alt="twarz" title="twarz" coords="170,131,230,130,229,108,232,98,239,94,243,83,244,72,240,66,243,57,155,57,157,64,154,70,154,83,159,94,166,103,169,117" shape="poly" />
                    <area tabIndex={0} onMouseOver={handleMap} onFocus={handleMap} target="" alt="ciało" title="ciało" coords="169,131,230,130,233,142,269,162,298,174,312,188,318,216,317,259,319,291,276,287,272,304,269,335,277,374,279,406,285,437,290,467,290,494,113,497,112,460,116,416,121,401,122,374,128,333,127,301,126,292,81,293,86,255,85,219,91,191,98,179,118,169,140,158,154,151,166,143,170,136" shape="poly" />
                    <area tabIndex={0} onMouseOver={handleMap} onFocus={handleMap} target="" alt="dłonie" title="dłonie" coords="41,466,68,471,67,501,64,513,65,528,67,540,50,551,33,553,22,542,26,507,26,498,10,512,5,504,13,496,28,482,37,475" shape="poly" />
                    <area tabIndex={0} onMouseOver={handleMap} onFocus={handleMap} target="" alt="dłonie" title="dłonie" coords="336,473,362,465,378,483,392,499,398,510,389,509,383,504,377,500,382,534,380,545,366,554,352,551,339,537,340,515,337,498,336,481" shape="poly" />
                    <area tabIndex={0} onMouseOver={handleMap} onFocus={handleMap} target="" alt="stopy" title="stopy" coords="137,794,162,793,164,808,157,846,154,859,153,878,146,893,137,896,133,886,126,895,118,891,108,875,111,861,120,848,129,836,133,823,135,807" shape="poly" />
                    <area tabIndex={0} onMouseOver={handleMap} onFocus={handleMap} target="" alt="stopy" title="stopy" coords="257,793,281,790,283,809,285,824,295,845,308,863,312,875,306,893,297,902,282,906,270,899,268,881,265,861,258,834,253,816,256,803" shape="poly" />
                </map>

                <img className={styles.services__main__img_250} src="img/czlowiek-250.png" alt="sylwetka człowieka" useMap='#map-250' />
                <map name="map-250">
                    <area tabIndex={0} onMouseOver={handleMap} onFocus={handleMap} target="" alt="włosy" title="włosy" coords="96,37,150,38,151,18,138,5,119,3,104,9,95,25" shape="poly" />
                    <area tabIndex={0} onMouseOver={handleMap} onFocus={handleMap} target="" alt="twarz" title="twarz" coords="106,85,144,84,142,71,143,63,148,59,152,51,150,37,97,36,95,49,102,59,106,74" shape="poly" />
                    <area tabIndex={0} onMouseOver={handleMap} onFocus={handleMap} target="" alt="ciało" title="ciało" coords="104,86,143,84,164,100,185,109,194,120,197,145,199,176,172,179,167,192,170,225,175,262,182,289,179,314,70,316,70,274,76,242,77,218,80,193,77,182,50,182,53,160,52,132,61,113,75,106,89,98,99,96" shape="poly" />
                    <area tabIndex={0} onMouseOver={handleMap} onFocus={handleMap} target="" alt="dłonie" title="dłonie" coords="25,291,40,297,40,311,39,323,40,337,30,343,22,346,14,340,15,312,5,315,8,307,17,300" shape="poly" />
                    <area tabIndex={0} onMouseOver={handleMap} onFocus={handleMap} target="" alt="dłonie" title="dłonie" coords="208,294,224,290,236,302,242,309,248,317,235,312,236,323,237,338,229,345,219,342,211,335,212,316,210,305" shape="poly" />
                    <area tabIndex={0} onMouseOver={handleMap} onFocus={handleMap} target="" alt="stopy" title="stopy" coords="85,498,102,498,99,518,96,539,93,559,78,557,66,548,70,532,78,525,84,512" shape="poly" />
                    <area tabIndex={0} onMouseOver={handleMap} onFocus={handleMap} target="" alt="stopy" title="stopy" coords="159,499,175,499,177,510,182,523,190,535,193,542,192,552,183,562,170,560,166,544,163,527,158,510" shape="poly" />
                </map>
            </main>
            <div className={styles.services__bottom}>
                <div className={styles.services__row}>
                    <BsGenderFemale className={styles.services__icon_big} />
                    Dla niej
                </div>
                <div className={styles.services__row}>
                    <BsGenderMale className={styles.services__icon_big} />
                    Dla niego
                </div>
                <div className={styles.services__row}>
                    <BsGenderAmbiguous className={styles.services__icon_big} />
                    Dla nich
                </div>
            </div>
        </section>
    )
}

export default Services
