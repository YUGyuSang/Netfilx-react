import React from 'react'
import Banner from './components/Banner/Banner'
import PopularMovieSlide from './components/Banner/PopularMovieSlide/PopularMovieSlide'
import TopRatedMovieSlide from './components/Banner/TopRatedMovieSlide/TopRatedMovieSlide'
import UpcomingMoviesSlide from './components/Banner/UpcomingMoviesSlide/UpcomingMoviesSlide'

// 1.배너 만들기 => popular 아이템을 들고와서 첫 번째 영화를 보여주자
// 2.popular movie
// 3.top rated movie
// 4.upcomming movie
const Homepage = () => {
  return (
    <div>
        <Banner/>
        <PopularMovieSlide/>
        <TopRatedMovieSlide/>
        <UpcomingMoviesSlide/>
    </div>
  )
}

export default Homepage
