import React from "react";
import { StarRating } from "./star-rating";

const MovieComponent = (props) => {
  const { movies } = props;
  console.log(props);
  return (
    <React.Fragment>
      <div>
        {movies.map((movie, index) => {
          const {
            title,
            image,
            fullTitle,
            imDbRatingVotes,
            imDbRating,
            plot,
            year,
          } = movie;
          console.log("movie", movie);
          const ratingCount = imDbRatingVotes.substr(
            0,
            imDbRatingVotes.length - 3
          );
          return (
            <div key={index} className="movie-container">
              <div className="movie-title">
                <h3>{title}</h3>
                <p>{plot}</p>
                <p>Year- {year}</p>
                <StarRating count={Math.floor(imDbRating)} />
              </div>

              <div>
                <img
                  className="image-container"
                  src={image}
                  alt={fullTitle}
                  height="200"
                  // width={isMobileView ? "200" : "300"}
                />
                <p>Rating Count-{ratingCount}K</p>
              </div>
            </div>
          );
        })}
      </div>
      )
    </React.Fragment>
  );
};

export default MovieComponent;
