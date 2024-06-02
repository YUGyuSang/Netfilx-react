import React from 'react'
import Button from 'react-bootstrap/Button';
import { Alert } from "react-bootstrap";
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';

const Genres = ({onGenreChange}) => {

    const {
        data: GenresData,
        isLoading: isGenresLoading,
        isError: isGenresError,
        error: GenresError,
      } = useMovieGenreQuery();

      if(isGenresLoading){
        return <h2>Loding...</h2>
      }
      if(isGenresError){
        return <Alert variant="danger">{GenresError.message}</Alert>;
    }
    console.log('Genres',GenresData);

  return (
    <div>
      {GenresData.map((name,index)=>(<Button style={{margin:'5px'}} key={index} variant="danger" onClick={() => onGenreChange(name.id)}>{name.name}</Button>))}
    </div>
  )
}

export default Genres
