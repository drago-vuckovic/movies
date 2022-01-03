import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'

export default function RateEachMovie(props) {
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate)
    console.log(rate/20)
  }

  return (
    <div>    
      <Rating 
        onClick={handleRating} 
        ratingValue={rating} 
        allowHalfIcon
      />
    </div>
  )
}