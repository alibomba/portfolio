import './article.css';

const Article = (props) => {
    switch (props.section) {
        case 'why-us':
            return (
                <article className='why-us__article'>
                    <img src={props.img} className="why-us__article__img" />
                    <h3 className="why-us__article__heading">{props.title}</h3>
                    <p className="why-us__article__text">{props.children}</p>
                </article>
            )
        case 'latest':
            return (
                <article className='latest__article'>
                    <img src={props.img} alt={props.alt} className="latest__article__img" />
                    <div className="latest__article__bottom">
                        <p className="latest__article__author">By {props.author}</p>
                        <a href="#" className="latest__article__title">{props.title}</a>
                        <p className="latest__article__text">{props.children}</p>
                    </div>
                </article>
            )
    }

}

export default Article
