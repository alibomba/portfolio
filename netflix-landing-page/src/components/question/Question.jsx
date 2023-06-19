import { useEffect, useRef } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import styles from './question.module.css';

const Question = ({ id, question, state, setState, children }) => {
    const buttonRef = useRef();


    useEffect(() => {
        const keyboardSupport = (e) => {
            console.log(e);
            if (e.key === ' ' || e.key === 'Enter') {
                changeState();
            }
        }
        buttonRef.current.addEventListener('keyup', keyboardSupport)
    });

    const expanded = state[id - 1];
    function changeState() {
        setState((prev) => {
            let newArray = prev.map(() => false);
            const indexToUpdate = id - 1;
            const updatedValue = !expanded;
            newArray = [
                ...newArray.slice(0, indexToUpdate),
                updatedValue,
                ...newArray.slice(indexToUpdate + 1)
            ];
            return newArray;
        });
    }

    return (
        <article className={styles.accordion}>
            <div ref={buttonRef} onClick={changeState} tabIndex="0" className={styles.accordion__header} role='button' aria-expanded={expanded ? 'true' : 'false'} aria-controls={`accordion-${id}`}>
                {question}
                {expanded ? <IoClose size={50} /> : <AiOutlinePlus size={50} />}
            </div>
            <div id={`accordion-${id}`} className={`${styles.accordion__content} ${expanded && styles.accordion__content_expanded}`}>
                {children}
            </div>
        </article>
    )
}

export default Question
