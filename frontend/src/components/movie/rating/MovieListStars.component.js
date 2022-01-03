import React, { useState, useEffect  } from 'react';
import MovieStarts from '../MovieStars.component'
import axios from 'axios';

const MovieListStars = () => {

    const [movies, setMovies] = useState([]);

    const handleMovies = (movies)=>{
        setMovies(movies)
    }

    useEffect(() => {
        console.log("use effect");
        loadMovies();
        
      });
    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
    
    const loadMovies = async () => {
        try {

            const responseMovies = await axios.get(`http://localhost:8080/api/movies/?page=0&size=1000`);
        
            responseMovies.data.movies.forEach((element, index, array) => {
                const baseLink = 'https://randomuser.me/api/portraits/med/lego/';
                const baseLinkWithRandomNumber = baseLink.concat(getRandomInt(1,10),'.jpg');
                element.pics=baseLinkWithRandomNumber;
            });

            this.handleMovies(responseMovies.data.movies);
            console.log(responseMovies.data.movies);
            

        } catch(error) {
            
        } finally {
            
        }
    }


    return(
        <div className="user-list">
            {movies && 
                movies.map((movie) => <MovieStarts key={movie.id} {...movie} />)}
        </div>
    )
}

export default MovieListStars;