import React from 'react';
import MovieViewMore from './MovieViewMore.component';

const MovieListViewMore = ({movies}) => {
    
    return(
        <div className="user-list">
            {movies && 
                movies.map(
                    (movie) => <MovieViewMore key={movie.login.uuid} {...movie} />)}
                    {/* (movie) => <Movie key={movie.id} {...movie} />)} */}
        </div>
    )
}

export default MovieListViewMore;