// import classes from './App.module.css';
import { useState } from 'react'
import FetchCore from './components/FetchCore';
import FetchSources from './components/FetchSources';



function App() {


  const [parsedData, setParsedData] = useState({})

  function sendToParent(data) {
    setParsedData(data)
  }



  return (
    <div>
      <header>
        <h1 className='font-extrabold text-3xl p-5 pl-6 '>NewsFeedr.</h1>
        <div className='flex'>
          <FetchSources sendToParent={sendToParent} />
          <FetchCore
            query={parsedData.query || ""}
            country={parsedData.country}
            category={parsedData.category}
            language={parsedData.language}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
