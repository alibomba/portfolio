import style from './button.module.css';

const Button = ({ children, header }) => {
    return <a href="#" className={`${style.button} ${header && 'header__button'}`}>{children}</a>
}

export default Button;
