import React from 'react'
import './MovieRecommendation.style.css'
import { useRecommendation } from '../../hooks/useRecommendation'
import { Alert } from "react-bootstrap";
import { useParams } from 'react-router-dom';

const MovieRecommendation = () => {
    const { id } = useParams();
    const {
        data: RecommendationData,
        isLoading: isRecommendationLoading,
        isError: isRecommendationError,
        error: RecommendationError,
  } = useRecommendation(id);

  if(isRecommendationLoading){
    <h1>Loading...</h1>
  }
  if(isRecommendationError){
    return <Alert variant="danger">{RecommendationError.message}</Alert>;
  }

  console.log('추천',RecommendationData);

  return (
    <div>
      추천영화
    </div>
  )
}

export default MovieRecommendation
