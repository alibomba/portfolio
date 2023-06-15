import Article from '../article/Article';
import './whyUs.css';

const WhyUs = () => {
    return (
        <section className='why-us'>
            <header className="why-us__header">
                <h2 className="why-us__heading">Why choose Easybank?</h2>
                <p className="why-us__text">We leverage Open Banking to turn your bank account into your financial hub. Control your finances like never before.</p>
            </header>
            <main className="why-us__main">
                <Article
                    title="Online Banking"
                    img="img/icon-online.svg"
                    section="why-us"
                >
                    Our modern web and mobile applications allow you to keep track of your finances wherever you are in the world
                </Article>
                <Article
                    title="Simple Budgeting"
                    img="img/icon-budgeting.svg"
                    section="why-us"
                >
                    See exactly where your money goes each month. Receive notifications when you're close to hitting your limits.
                </Article>
                <Article
                    title="Fast Onboarding"
                    img="img/icon-onboarding.svg"
                    section="why-us"
                >
                    We don't do branches. Open your account in minutes online and start taking control of your finances right away.
                </Article >
                <Article
                    title="Open API"
                    img="img/icon-api.svg"
                    section="why-us"
                >
                    Manage your savings, investments, pension, and much more from one account.Tracking your money has never been easier.
                </Article >
            </main >
        </section >
    )
}

export default WhyUs
