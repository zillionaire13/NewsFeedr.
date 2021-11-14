import { useState, useEffect } from 'react'
import classes from '../App.module.css'
import NewsCard from './NewsCard';

export default function FetchCore(props) {

    const [isLoading, setisLoading] = useState(true)
    const [dataLoaded, setdataLoaded] = useState([])
    const [region, setregion] = useState()
    
    useEffect(()=>{
        fetch("http://ip-api.com/json")
        .then((res) => res.json())
        .then(data => {
            setregion(data.countryCode.toLowerCase())
        })
    }, [])

    const url = `https://newsapi.org/v2/top-headlines?q=${props.query}&country=${props.country||region}&category=${props.category || 'general'}&apiKey=d8a2725a8955420cbde72c01245fd36c`

    useEffect(() => {
        setisLoading(true)
        fetch(url)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((data) => {
                setdataLoaded(data.articles)
                setisLoading(false)
                console.log(url)
            })
    }, [url])


    if (isLoading) {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Loading...</h1>
                </header>
            </div>
        )
    }

    return (
        <ul className={classes.nCard}>
            {dataLoaded.map((article) => {
                return (
                    <div>
                        <li>
                            <NewsCard
                                title={article.title}
                                urlToImage={article.urlToImage}
                                author={article.author}
                                publishedAt={article.publishedAt}
                                description={article.description}
                                url={article.url}
                                source={article.source.name}
                                content={article.content}
                            />
                        </li>
                    </div>)
            })}
        </ul>
    )
}