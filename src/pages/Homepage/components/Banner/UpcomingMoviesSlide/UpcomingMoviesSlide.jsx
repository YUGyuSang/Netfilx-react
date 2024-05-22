import React from 'react'
import { useUpcomingMovies } from '../../../../../hooks/useUpcomingMovies'
import MovieSlider from '../../../../../common/MovieCard/MovieSlider/MovieSlider'
import { Alert } from 'react-bootstrap'
import {responsive} from "../../../../../constants/responsive"

const UpcomingMoviesSlide = () => {
    const {data,isLoading,isError,error} = useUpcomingMovies()

    if(isLoading){
        return <h1>Loading...</h1>
    }
    if(isError){
        return <Alert variant='danger'>{error.message}</Alert>
    }
  return (
    <div>
      <MovieSlider title={"Upcoming Movie"} movies={data.results} responsive={responsive}/>
    </div>
  )
}

export default UpcomingMoviesSlide
