import React, { useEffect, useState } from "react";
import Navbar from "../Components/NavbarComp/Navbar/Navbar";
import MovieDetails from "../Components/MovieDetails/MovieDetails";

function Home() {

  const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
  
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("fight");
  const [selectedId, setSelectedId] = useState(null);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handelAddwatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handelDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) =>
    movie.imdbID !== id));
  }

  useEffect(function () {
    localStorage.setItem("watched", JSON.stringify(watched));
  },[watched]);

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=f0ffa61c&s=${query}`
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");
          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);

        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError([]);
        return;
      }

      fetchMovies();
    },
    [query]
  );


  return (
    <>
      <Navbar query={query} setQuery={setQuery} />
      <div className="container">
        <div className="row my-5">
          <div className="col-md-6">
            <main className="main">
              <div className="box">
                {isLoading && (
                  <div className="w-100 p-5 d-flex justify-content-center align-items-center">
                    <div className="spinner-grow" role="status">
                      <span className="fs-1 sr-only">Loading...</span>
                    </div>
                  </div>
                )}
                {!isLoading && !error && (
                  <ul className="list list-movies">
                    {movies?.map((movie) => (
                      <li
                        onClick={() => handleSelectMovie(movie.imdbID)}
                        key={movie.imdbID}
                      >
                        <img src={movie.Poster} alt={`${movie.Title} poster`} />
                        <h3>{movie.Title}</h3>
                        <div>
                          <p>
                            <span>🗓</span>
                            <span>{movie.Year}</span>
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                {error && (
                  <div className="alert alert-dange" role="alert">
                    <p className="fs-4 text-center">{error}</p>
                  </div>
                )}
              </div>
            </main>
          </div>

          <div className="col-md-6">
            <div className="box">
              {selectedId ? (
                <MovieDetails
                  selectedId={selectedId}
                  onCloseMovie={handleCloseMovie}
                  onAddWatched={handelAddwatched}
                  watched={watched}
                />
              ) : (
                <>
                  <div className="summary">
                    <h2>Movies you watched</h2>
                    <div>
                      <p>
                        <span>#️⃣</span>
                        <span>{watched.length} movies</span>
                      </p>
                      <p>
                        <span>⭐️</span>
                        <span>{avgImdbRating.toFixed(2)}</span>
                      </p>
                      <p>
                        <span>🌟</span>
                        <span>{avgUserRating.toFixed(2)}</span>
                      </p>
                      <p>
                        <span>⏳</span>
                        <span>{avgRuntime} min</span>
                      </p>
                    </div>
                  </div>

                  <ul className="list">
                    {watched.map((movie) => (
                      <li key={movie.imdbID}>
                        <img src={movie.poster} alt={`${movie.title} poster`} />
                        <h3>{movie.title}</h3>
                        <div>
                          <p>
                            <span>⭐️</span>
                            <span>{movie.imdbRating}</span>
                          </p>
                          <p>
                            <span>🌟</span>
                            <span>{movie.userRating}</span>
                          </p>
                          <p>
                            <span>⏳</span>
                            <span>{movie.runtime} min</span>
                          </p>

                          <button
                            className="btn-delete"
                            onClick={() => handelDeleteWatched(movie.imdbID)}
                          >
                            X
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
