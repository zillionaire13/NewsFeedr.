import classes from './NewsCard.module.css'

export default function NewsCard(props) {

    return (
        <div className={classes.card}>
            <div className={classes.body}>
                <div className={classes.image}>
                    <img src={props.urlToImage} alt="" />
                </div>
                <div className={classes.body_content}>
                    <h1 className={classes.title}>{props.title}</h1>
                    <p>By <span className={classes.author}>{props.author}</span> on <span className={classes.source}> {props.source}</span></p>
                    <p className={classes.teaser}>{props.description}</p>
                    <p className={classes.content}>{props.content}</p>
                    <a href={props.url}><button className={classes.btn}>Read More..</button></a>
                </div>
            </div>
        </div>
    )
}