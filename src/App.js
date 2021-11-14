import classes from './App.module.css';
import {useState} from 'react'
import FetchCore from './components/FetchCore';
import FetchSources from './components/FetchSources';



function App() {
  
  
  const [parsedData, setParsedData] = useState({})

  function sendToParent (data){
    setParsedData(data)
  }
  


  return (
    <div className={classes.App}>
      <header className={classes.Appheader}>
        <h1>NewsFeedr.</h1>
            <FetchSources sendToParent = {sendToParent}/>
            <FetchCore 
              query={parsedData.query || ""}
              country ={parsedData.country}
              category={parsedData.category}
              language={parsedData.language}
            />
      </header>
    </div>
  );
}

export default App;
