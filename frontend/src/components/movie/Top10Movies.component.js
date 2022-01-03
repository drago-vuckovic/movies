import React, { Component } from "react";
import MovieDataService from "../../services/movie.service";
import { Link } from "react-router-dom";
import axios from "axios";
// import MovieListViewMore from "./MovieListViewMore";
import MovieList from './MovieList.component';

export default class Top10Movies extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        isLoading: false,
        errorMsg: '',
        searchTitle: "",
        movies: [],
        page: 0,
        count: 0,
        pageSize: 10,
      };
    
    componentDidMount() {     
        this.loadMovies();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            this.loadMovies();
        }
    }
        
    loadMore = () => {
        this.setState((prevState) => ({
            page: prevState.page + 1
        }));
    };

    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
      

    loadMovies = async () => {
        try {
            
            const { page } = this.state;
            
            this.setState({ isLoading: true });
            
            const responseMovies = 
                await axios.get(`http://localhost:8080/api/movies/?page=${page}&size=10`);
                   
            responseMovies.data.movies.forEach((element, index, array) => {
                const baseLink = 'https://randomuser.me/api/portraits/med/lego/';
                const baseLinkWithRandomNumber = baseLink.concat(this.getRandomInt(1,10),'.jpg');
                element.pics=baseLinkWithRandomNumber;
            });

            console.log(responseMovies.data.movies);

            this.setState((prevState) => ({
                movies: [...prevState.movies, ...responseMovies.data.movies],
                errorMsg: ''
            }));

        } catch(error) {
            this.setState({
                errorMsg: 'Error while loading data. Try again later.'
              });
        } finally {
            this.setState({ isLoading: false });
        }
    }

    render() {

        const { searchTitle, movies, isLoading, errorMsg } = this.state;

        return(
            <div>
                <div className="main-section">

                    <MovieList movies={movies}/>

                    {errorMsg && <p className="errorMsg">{errorMsg}</p>}

                    <div className="load-more">
                        <button onClick={this.loadMore} className="btn-grad">
                            {isLoading ? 'Loading...' : 'Load More'}
                        </button>

                    </div>

                    {isLoading && <p className="loading">Loading...</p>}

                </div>
            </div>
        )
    }
}