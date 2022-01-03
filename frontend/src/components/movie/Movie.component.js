import React from "react";
import AverageRatingValue from "./rating/AverateRatingValue";

const Movie = ({ title, description, releasedate, cast1, cast2, rating, pics}) => {
    return (
        <div className="random-user" style={{marginTop: 10, marginBottom: 10}}>
            <div className="user-image">
                <img src={pics} alt={title} />
            </div>
            <div className="user-details">
                <div>
                    <strong>Title: </strong> {title}
                </div>
                <div>
                    <strong>Description: </strong> {description}
                </div>
                <div>
                    <strong>Cast 1: </strong>{cast1}
                </div>
                <div>
                    <strong>Cast 2: </strong>{cast2}
                </div>
                <div>
                    <strong>Release Date: </strong>{releasedate}
                </div>
            </div>
            <div>
                <strong>Rating: </strong>
            </div>
            <div>
                <AverageRatingValue avgRatingValue={rating}/>
                {rating}
            </div>
      </div>
    );
  };


export default Movie;