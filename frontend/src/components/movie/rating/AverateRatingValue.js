import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'

export default function AverageRatingValue(props) {

  return (
    <div>      
      <Rating 
        ratingValue={props.avgRatingValue*20} 
        allowHalfIcon
        readonly={props.avgRatingValue > 0}
      />
    </div>
  )
}