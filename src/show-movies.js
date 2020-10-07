import React from "react";
import "./show-movies.css";
import { StarRating } from "./star-rating";


export class ShowMovies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieDetails: [],
      error: null,
      isLoading: true,
    };
  }

  fetchPlotDetails() {
    const allMovieDetails = this.props.movies.map((movie) => {
      return fetch(`https://imdb-api.com/en/API/Title/k_b8J57AJ4/${movie.id}`);
    });
    Promise.all(allMovieDetails)
      .then((files) => {
        files.forEach((file) => {
          this.processData(file.json());
        });
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  }
  processData = (prom) => {
    const details = this.state.movieDetails;
    prom.then((data) => {
      details.push(data);
    });
    this.setState({ ...this.state, movieDetails: details });
  };

  componentDidMount() {
    this.fetchPlotDetails();
  }

  render() {
    const { movies, isMobileView } = this.props;
    const ratingColor = [
      "white",
      "yellow",
      "orange",
      "pink",
      "aqua",
      "blue",
      "green",
      "black",
      "red",
      "purple",
    ];
    // const { year,image,plot } = this.state.movieDetails;
    const plot =
      " Fight Club is a 1999 American film directed by David Fincher and starring Brad Pitt, Edward Norton, and Helena Bonham Carter. It is based on the 1996 novel of the same name by Chuck Palahniuk. Norton plays the unnamed narrator, who is discontented with his white-collar job.";
    return (
      <div>
        {movies.map((movie, index) => {
          const {
            title,
            image,
            fullTitle,
            imDbRatingCount,
            imDbRating,
          } = movie;
          const ratingCount = imDbRatingCount.substr(
            0,
            imDbRatingCount.length - 3
          );
          const ReleaseYear = fullTitle.substr(fullTitle.indexOf("(") + 1, 4);
          return (
            <div key={index} className="movie-container">
              <div className="movie-title">
                <h3>{title}</h3>
                <p>{plot}</p>
                <p>Year- {ReleaseYear}</p>
                {!isMobileView ? (
                  <p style={{ color: ratingColor[Math.floor(imDbRating)] }}>
                    Ratings-{imDbRating}
                  </p>
                ) : (
                  <StarRating count={Math.floor(imDbRating)} />
                )}
              </div>

              <div>
                <img
                  className="image-container"
                  src={image}
                  alt={fullTitle}
                  height="200"
                  // width={isMobileView ? "200" : "300"}
                />
                {isMobileView}
                <p>Rating Count-{ratingCount}K</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
