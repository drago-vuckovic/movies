import React, { Component } from "react";
import MovieDataService from "../services/movie.service";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import Autocomplete from "react-autocomplete-2";

export default class MoviesList extends Component {
  
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveMovies = this.retrieveMovies.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveMovie = this.setActiveMovie.bind(this);
    this.removeAllMovies = this.removeAllMovies.bind(this);

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

    this.state = {
      movies: [],
      currentMovie: null,
      currentIndex: -1,
      searchTitle: "",

      page: 1,
      count: 0,
      pageSize: 10,
    };

    this.pageSizes = [10, 20, 30];
  }

  
  componentDidMount() {
    this.retrieveMovies();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  getRequestParams(searchTitle, page, pageSize) {
    let params = {};

    if (searchTitle) {
      params["title"] = searchTitle;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  }

  retrieveMovies() {

    const { searchTitle, page, pageSize } = this.state;
    const params = this.getRequestParams(searchTitle, page, pageSize);

    MovieDataService.getAll(params)
      .then(response => {
        const {movies, totalPages} = response.data;
        console.log("movies from response data");
        console.log(movies)
        
        this.setState({
          movies: movies,
          count: totalPages
        });
        console.log("response.data");
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  handlePageChange(event, value) {
    this.setState(
      {
        page: value,
      },
      () => {
        this.retrieveMovies();
      }
    );
  }

  handlePageSizeChange(event) {
    this.setState(
      {
        pageSize: event.target.value,
        page: 1
      },
      () => {
        this.retrieveMovies();
      }
    );
  }

  refreshList() {
    this.retrieveMovies();
    this.setState({
      currentMovie: null,
      currentIndex: -1
    });
  }

  setActiveMovie(movie, index) {
    this.setState({
      currentMovie: movie,
      currentIndex: index
    });
  }

  removeAllMovies() {
    MovieDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentMovie: null,
      currentIndex: -1
    });

    MovieDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          movies: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    const {searchTitle, movies, currentMovie, currentIndex, page, count, pageSize } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.retrieveMovies}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">

        <div>
        </div>


          <h4>Movies List</h4>
          <div className="mt-3">
            {"Items per Page: "}
            <select onChange={this.handlePageSizeChange} value={pageSize}>
              {this.pageSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <Pagination
              className="my-3"
              count={count}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              variant="outlined"
              shape="rounded"
              onChange={this.handlePageChange}
            />
          </div>

          <ul className="list-group">
            {movies &&
              movies.map((movie, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveMovie(movie, index)}
                  key={index}
                >
                  {movie.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTutorials}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentMovie ? (
            <div>
              <h4>Movie</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentMovie.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentMovie.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentMovie.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/movies/" + currentMovie.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a movie</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}