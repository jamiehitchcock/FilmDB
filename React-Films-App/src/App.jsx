import { useState, useEffect } from "react";

import classes from "./styles/Root.module.scss";
import FilmComponent from "./components/FilmComp";

function App() {

  const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
  const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

  const [films, setFilms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [requestedTerm, setRequestedTerm] = useState('Featured Films');

  useEffect(() => {
    fetchFilmData(FEATURED_API);
  }, []);

  async function fetchFilmData(API) {
    try {
      const response = await fetch(API);
      if (!response.ok) {
        throw new Error("Network response failed");
      }
      const resData = await response.json();
      console.log("resData =", resData);
      setFilms(resData.results);
    }
    catch (error) {
      console.error("Error fetching films: ", error);
    }
  }

  const handleOnSubmit = (e) => {
    // prevent submitting form
    e.preventDefault();

    if (searchTerm) {
      fetchFilmData(SEARCH_API + searchTerm);
      setSearchTerm('');
      setRequestedTerm(searchTerm);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  const handleOnChange = (e) => {
    // take search term from input
    setSearchTerm(e.target.value);
  }

  return (
    <>
      <header className={classes.header}>
        <h1 className={classes.header__logo}>FilmDB</h1>
        <form onSubmit={handleOnSubmit}>
          <input className={classes.header__search} type="search" placeholder="Film search..." value={searchTerm} onChange={handleOnChange} />
        </form>
      </header>

      <div className={classes.container}>
        <h2 className={classes.container__request}>{requestedTerm}</h2>

        <div className={classes.container__filmsWrapper}>
          {films.length > 0 && films.map((film) =>
            <FilmComponent {...film} key={film.id} />
          )}
        </div>

      </div>
    </>
  )
}

export default App