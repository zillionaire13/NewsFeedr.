import { useEffect, useRef, useState } from "react"



export default function FetchSources(props) {

    

    const sources_url = `https://newsapi.org/v2/top-headlines/sources?apiKey=d8a2725a8955420cbde72c01245fd36c`
    const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });
    const languageNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'language' })
    useEffect(() => {
        fetch(sources_url)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            setloadedSources(data.sources)
        })
    }, [sources_url])
    const [loadedSources, setloadedSources] = useState([])
    
    const sources = [...new Set(loadedSources.map(i => i.country))]
    const languages = [...new Set(loadedSources.map(i => i.language))]
    const category = [...new Set(loadedSources.map(i => i.category))]
    const [queryLoader, setqueryLoader] = useState('')
    
    const sourceslist = useRef()
    const countrylist = useRef()
    const languagelist = useRef()
    const categorylist = useRef()
    const enteredQuery = useRef();

    const [source_option, setsourceoption] = useState('')
    const [country_option, setcountryoption] = useState('')
    const [language_option, setlangoption] = useState('')
    const [category_option, setcategoryoption] = useState('')

    const parseSelectData = {
        source: source_option,
        country: country_option,
        language: language_option,
        category: category_option,
        query : queryLoader
    }

    function handleSourcelist(e) {
        setsourceoption(e.target.value)
    }

    function handleCountrylist(e) {
        setcountryoption(e.target.value)
    }

    function handleLanglist(e) {
        setlangoption(e.target.value)
    }

    function handleCategorylist(e) {
        setcategoryoption(e.target.value)
    }

    function queryHandler(event){
        event.preventDefault();
        setqueryLoader(enteredQuery.current.value)
      }

    return (
        <div>
            <form  onChange={queryHandler} >
            <label htmlFor="searchbox">Search </label>
            <input name="searchbox" type="text" id="search_field" ref={enteredQuery}/>
            </form>
            <label htmlFor="sources" style={{display : 'none'}} >Select Source </label>
            <select name="sources" id="source_dropdown" ref={sourceslist} onChange={handleSourcelist} style={{display : 'none'}} >
                <option disabled selected value> -- Select a Source -- </option>
                {loadedSources.map((i) => {
                    return (
                        <option value={i.name}>{i.name}</option>
                    )
                })}
            </select>
            <br />
            <label htmlFor="country" >Select Country </label>
            <select name="country" id="country_dropdown" ref={countrylist} onChange={handleCountrylist}>
                <option disabled selected value> -- Select a Country -- </option>
                {sources.map((i) => {
                    return <option value={i}>{regionNamesInEnglish.of(i.toUpperCase())}</option>
                })}
            </select>
            <label htmlFor="language" style={{display : 'none'}} >Select Language </label>
            <select name="language" id="language_dropdown" ref={languagelist} onChange={handleLanglist} style={{display : 'none'}} >
                <option disabled selected value> -- Select Language -- </option>
                {languages.map((i) => {
                    return <option value={i}>{languageNamesInEnglish.of(i)}</option>
                })}
            </select>
            <br />
            <label htmlFor="category">Select Category </label>
            <select name="category" id="category_dropdown" ref={categorylist} onChange={handleCategorylist}>
                <option disabled selected value> -- Select a Category -- </option>
                {category.map((i) => {
                    return <option value={i}>{i.charAt(0).toUpperCase() + i.slice(1)}</option>
                })}
            </select>
            <br />
            <button onClick={() => {
                props.sendToParent(parseSelectData)
            }}>
                Apply
            </button>
        </div>
    )

}