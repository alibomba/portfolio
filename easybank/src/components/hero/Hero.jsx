import Button from "../button/Button"
import './hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero__left">
                <h2 className="hero__heading">Next generation<br />digital banking</h2>
                <p className="hero__text">Take your financial life online. Your Easybank account will be a one-stop-shop for spending, saving, budgeting, investing and much more</p>
                <Button>Request Invite</Button>
            </div>
            <div className="hero__right">
                <img className="hero__img" src="img/image-mockups.png" alt="mockups" />
            </div>
        </section>
    )
}

export default Hero;
