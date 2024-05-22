import React from 'react'
import { usePopularMoviesQuery } from '../../../../../hooks/usePopularMovies'
import MovieSlider from '../../../../../common/MovieCard/MovieSlider/MovieSlider'
import {responsive} from "../../../../../constants/responsive"
import { Alert } from 'react-bootstrap'
import { useTopRatedMovies } from '../../../../../hooks/useTopRatedMovies'

const TopRatedMovieSlide = () => {

    const {data,isLoading,isError,error} = useTopRatedMovies()

    if(isLoading){
        return <h1>Loading...</h1>
    }
    if(isError){
        return <Alert variant='danger'>{error.message}</Alert>
    }

  return (
    <div>
      <MovieSlider title={"Top Rated Movies"} movies={data.results} responsive={responsive}/>
    </div>
  )
}

export default TopRatedMovieSlide
