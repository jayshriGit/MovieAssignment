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
      pageNo: 0,
    };

  }

  fetchPlotDetails() {
    const allMovieDetails = this.props.movies.map((movie) => {
      return fetch(`https://imdb-api.com/en/API/Title/k_7vlcbbzx/${movie.id}`);
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
      if (data.id !== null) details.push(data);
    });

    this.setState({
      ...this.state,
      movieDetails: details,
      isLoading: false,
      pageNo: this.props.pageNumber,
    });
  };

  componentDidMount() {
    this.fetchPlotDetails();
  }

  render() {
    const { movies, isMobileView } = this.props;
    const { isLoading, error, movieDetails } = this.state;
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

    return (
      <React.Fragment>
        <div>{error ? <p>{error.message}</p> : null}</div>
        <div style={{ textAlign: "center" }}>
          {!isLoading && movieDetails.length > 0 ? (
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
                const ReleaseYear = fullTitle.substr(
                  fullTitle.indexOf("(") + 1,
                  4
                );

                const plot = movieDetails.find((item) => item.id === movie.id).plot;
               

                return (
                  <div key={index} className="movie-container">
                    <div className="movie-title">
                      <h3>{title}</h3>
                      <p>{plot}</p>
                      <p>Year- {ReleaseYear}</p>
                      {!isMobileView ? (
                        <p
                          style={{ color: ratingColor[Math.floor(imDbRating)] }}
                        >
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
                      <p>Rating Count-{ratingCount}K</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <h4>"loading plot deatils..."</h4>
          )}
        </div>
      </React.Fragment>
    );
  }
}
