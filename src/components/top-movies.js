import React from "react";
import { ShowMovies } from "./show-movies";
export class TopMovies extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      movies: [],
      error: null,
      pageNo: 1,
      totalNoOfPages: 0,
      screenSize: window.innerWidth,
    };
    window.addEventListener("resize", this.screenSizeUpdate);
  }

  fetchmovies() {
    fetch(`https://imdb-api.com/en/API/Top250Movies/k_07mgtpAz`)
      .then((response) => response.json())
      .then((data) => {
        if (data.items) {
          this.setState({
            movies: data.items,
            isLoading: false,
            totalNoOfPages: data.items.length
              ? Math.floor(data.items.length / 10)
              : 0,
          });
        }
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.fetchmovies();
    this.screenSizeUpdate();
  }

  screenSizeUpdate = () => {
    if (this.state.screenSize !== window.innerWidth) {
      this.setState({
        ...this.state,
        screenSize: window.innerWidth,
      });
    }
  };

  loadNextPage = () => {
    this.setState({
      ...this.state,
      pageNo: this.state.pageNo + 1,
    });
  };
  loadPrevPage = () => {
    this.setState({
      ...this.state,
      pageNo: this.state.pageNo - 1,
    });
  };
  render() {
    const {
      isLoading,
      movies,
      error,
      pageNo,
      totalNoOfPages,
      screenSize,
    } = this.state;
    const allMovies = movies;
    const perPageMovies = allMovies.slice(pageNo * 10, pageNo * 10 + 10);
    return (
      <React.Fragment>
        <div>{error ? <p>{error.message}</p> : null}</div>
        <div>
          {!isLoading ? (
            <div>
              {screenSize <= 700 ? (
                <ShowMovies movies={movies} isMobileView={true} />
              ) : (
                <div>
                  <ShowMovies movies={perPageMovies} isMobileView={false} />
                  <div className="page-button">
                    {pageNo > 1 ? (
                      <button onClick={this.loadPrevPage.bind(this)}>
                        PREV
                      </button>
                    ) : null}
                    {pageNo < totalNoOfPages ? (
                      <button onClick={this.loadNextPage.bind(this)}>
                        NEXT
                      </button>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <h4>...loading</h4>
          )}
        </div>
      </React.Fragment>
    );
  }
}
