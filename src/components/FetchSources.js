import { useEffect, useRef, useState } from "react"

export default function FetchSources(props) {


    const sidebarref = useRef()
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
        query: queryLoader
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

    function queryHandler(event) {
        event.preventDefault();
        setqueryLoader(enteredQuery.current.value)
    }

    return (
        <div>
            <div className="hidden sm:block shadow-lg md:w-[33%] md:min-w-max h-[88vh] relative ml-3 mt-3" ref={sidebarref}>
                <div className="flex flex-col gap-2 p-3 ">
                    <form className="flex flex-row flex-wrap justify-between" onChange={queryHandler} >
                        {/* <label htmlFor="searchbox">Search </label> */}
                        <input className=" w-full border p-3 rounded" name="searchbox" placeholder="Search Query" type="text" id="search_field" ref={enteredQuery} />
                    </form>
                    <div className="flex flex-row flex-wrap justify-between">
                        {/* <label htmlFor="sources" style={{ display: 'none' }} >Select Source </label> */}
                        <select className=" w-1/2" name="sources" id="source_dropdown" ref={sourceslist} onChange={handleSourcelist} style={{ display: 'none' }} >
                            <option disabled selected value> -- Select a Source -- </option>
                            {loadedSources.map((i) => {
                                return (
                                    <option value={i.name}>{i.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="flex flex-wrap flex-row justify-between">
                        {/* <label htmlFor="country" >Select Country </label> */}
                        <select className=" w-full p-3 rounded bg-white border shadow" name="country" id="country_dropdown" ref={countrylist} onChange={handleCountrylist}>
                            <option disabled selected value> Country </option>
                            {sources.map((i) => {
                                return <option value={i}>{regionNamesInEnglish.of(i.toUpperCase())}</option>
                            })}
                        </select>
                    </div>
                    <div className="flex flex-wrap flex-row justify-between">
                        {/* <label htmlFor="language" style={{ display: 'none' }} >Select Language </label> */}
                        <select className=" w-full" name="language" id="language_dropdown" ref={languagelist} onChange={handleLanglist} style={{ display: 'none' }} >
                            <option disabled selected value> Language -- </option>
                            {languages.map((i) => {
                                return <option value={i}>{languageNamesInEnglish.of(i)}</option>
                            })}
                        </select>
                    </div>
                    <div className="flex flex-row flex-wrap justify-between">
                        {/* <label htmlFor="category">Select Category </label> */}
                        <select className=" w-full p-3 rounded bg-white border shadow" name="category" id="category_dropdown" ref={categorylist} onChange={handleCategorylist}>
                            <option disabled selected value> Category  </option>
                            {category.map((i) => {
                                return <option value={i}>{i.charAt(0).toUpperCase() + i.slice(1)}</option>
                            })}
                        </select>
                    </div>
                </div>
                <button
                    className="absolute right-0 p-2 m-3 border 
                bg-blue-500 rounded-lg text-white font-bold shadow-lg"
                    onClick={() => {
                        props.sendToParent(parseSelectData)
                    }}>
                    Apply
                </button>
            </div>
            <button
                    id="filtercontrol"
                    className=" hidden md:block md:sticky left-5 bottom-5 m-3 border-2 rounded p-3 bg-white"
                    onClick={() => {
                        sidebarref.current.classList.toggle('sm:hidden')
                        console.log(document.getElementById('filtercontrol').innerHTML)
                        if(sidebarref.current.classList.contains('sm:hidden')){
                            document.getElementById('filtercontrol').innerHTML = "Show Filters"
                        }else {
                            document.getElementById('filtercontrol').innerHTML = "Hide Filters"
                        }
                    }}
                >
                Show Filters
                </button>
        </div>
    )

}