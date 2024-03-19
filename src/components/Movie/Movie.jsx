import React from "react";

export default function Movie({ movie }) {
  return (
    <>
      <div className="col-md-3">

        <div className="movie">
        
          <img src={"https://image.tmdb.org/t/p/original/" + movie.poster_path} className="w-100" alt={movie.title}/>
          <h5 className="text-center"> {movie.title}</h5>
        
        </div>
      </div>
    </>
  );
}
