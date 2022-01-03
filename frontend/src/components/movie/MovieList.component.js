import React from 'react';
import Movie from './Movie.component'

const MovieListViewMore = ({movies}) => {
    
    return(
        <div className="user-list">
            {movies && 
                movies.map((movie) => <Movie key={movie.id} {...movie} />)}
        </div>
    )
}

export default MovieListViewMore;