import Article from '../article/Article';
import './latest.css';

const Latest = () => {
    return (
        <section className='latest'>
            <h2 className="latest__heading">Latest Articles</h2>
            <div className="latest__container">
                <Article
                    title="Receive money in any currency with no fees"
                    author="Claire Robinson"
                    img="img/image-currency.jpg"
                    alt="cash"
                    section="latest"
                >
                    The world is getting smaller and we're becoming more mobile. So why should you be forced to only receive money in a single...
                </Article>
                <Article
                    title="Treat yourself without worrying about money"
                    author="Wilson Hutton"
                    img="img/image-restaurant.jpg"
                    alt="restaurant"
                    section="latest"
                >
                    Our simple budgeting feature allows you to separate out your spending and set realistic limits each month. That means you...
                </Article>
                <Article
                    title="Take your Easybank card wherever you go"
                    author="Wilson Hutton"
                    img="img/image-plane.jpg"
                    alt="plane"
                    section="latest"
                >
                    We want you to enjoy your travels.This is why we don't charge any fees on purchases while you're abroad.We'll even show you...
                </Article >
                <Article
                    title="Our invite-only Beta accounts are now live!"
                    author="Claire Robinson"
                    img="img/image-confetti.jpg"
                    alt="confetti"
                    section="latest"
                >
                    After a lot of hard work by the whole team, we're excited to launch our closed beta. It's easy to request an invite through the site...
                </Article >
            </div >
        </section >
    )
}

export default Latest
