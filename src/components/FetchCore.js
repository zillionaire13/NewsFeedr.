import { useState, useEffect } from 'react'
import classes from '../App.module.css'
import NewsCard from './NewsCard';

export default function FetchCore(props) {

    const url = `https://newsapi.org/v2/everything?q=${props.query}&apiKey=0cf9a5d664af4b3898ac8d07d4870737`
    const [isLoading, setisLoading] = useState(true)
    const [dataLoaded, setdataLoaded] = useState([])

    useEffect(() => {
        setisLoading(true)
        fetch(url)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((data) => {
                data.articles.map((article) => {
                    dataLoaded.push(article)
                    return console.log('OK')
                })
                setisLoading(false)
                setdataLoaded(dataLoaded)
            })
    }, [props.query])


    if (isLoading) {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Loading...</h1>
                </header>
            </div>
        )
    }
    
    return(
        <ul className={classes.nCard}>
            {dataLoaded.map((article)=>{
              return <li>
                <NewsCard 
                  title ={article.title}
                  urlToImage={article.urlToImage}
                  author={article.author}
                  publishedAt={article.publishedAt}
                  description={article.description}
                  url={article.url}
                  source = {article.source.name}
                  content = {article.content}
                />
              </li>
            })}
          </ul>
    )
}