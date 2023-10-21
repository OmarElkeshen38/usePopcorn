import React, { useState } from 'react';

function Results(props) {

    // const [movies, setMovies] = useState(props.tempMovieData);

  return (
    <>
      <p className="num-results text-white">
        Found <strong>{props.query.length}</strong> results
      </p>
    </>
  );
}

export default Results
