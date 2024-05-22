import React from 'react'
import { Badge } from 'react-bootstrap'
import './MovieCard.style.css'

const MovieCard = ({movie}) => {
  return (
    <div className='movie-card' style={{backgroundImage:"url("+`https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`+")"}}>
      
      <div className='overlay'>
        <h1 className='movietitle'>{movie.title}</h1>
        {movie.genre_ids.map((id)=> <Badge className='badge' bg="danger">{id}</Badge>)}
        <div className='vpa'>
            <div>👍평점: {movie.vote_average}</div>
            <div>인기도: {movie.popularity}</div>
            <div>나이: {movie.adult?'애기들 보면 안돼!':'전체이용가'}</div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
