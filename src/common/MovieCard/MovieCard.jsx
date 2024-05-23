import React from 'react'
import { Badge } from 'react-bootstrap'
import './MovieCard.style.css'
import { useMovieGenreQuery } from '../../hooks/useMovieGenre'
const MovieCard = ({movie}) => {

  const {data:genreData} = useMovieGenreQuery() // data: 이름을 다시 재정의 한다는 의미이다.

  const showGenre = (genreIdList)=>{
    if(!genreData)return []
    const genreNameList= genreIdList.map((id)=>{
      const genreObj = genreData.find((genre)=>genre.id === id)
      return genreObj.name;
    })

    return genreNameList
  }
  return (
    <div className='movie-card' style={{backgroundImage:"url("+`https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`+")"}}>
      
      <div className='overlay'>
        <h1 className='movietitle'>{movie.title}</h1>
        {showGenre(movie.genre_ids).map((id)=> <Badge className='badge' bg="danger">{id}</Badge>)}
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
