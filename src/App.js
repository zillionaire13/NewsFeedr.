import classes from './App.module.css';
import {useRef} from 'react'
import FetchCore from './components/FetchCore';


function App() {

  const enteredQuery = useRef();

  function queryHandler(event){
    event.preventDefault();
    const searchQuery = enteredQuery.current.value;

    const queryBucket = {
      search: searchQuery,
    }

    
  }

  return (
    <div className={classes.App}>
      <header className={classes.Appheader}>
        <h1>NewsFeedr.</h1>

          <form className={classes.control} onSubmit={queryHandler} >
            <input type="text" id="search_field" ref={enteredQuery}/>
            <input type="submit"/>
          </form>
            <FetchCore />
      </header>
    </div>
  );
}

export default App;
