import React from 'react';
import Badge from 'react-bootstrap/Badge';
import './Moviedetail.style.css';
import { useMovieDetail } from '../../hooks/useMovieDetail';
import { Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';

const Moviedetailpage = () => {
  const { id } = useParams();
  const { data: DetailData, isLoading: isDetailLoading, isError: isDetailError, error: DetailError } = useMovieDetail(id);
  const { data: genreData, isLoading: isGenreLoading, isError: isGenreError, error: genreError } = useMovieGenreQuery();

  if (isDetailLoading || isGenreLoading) {
    return <h1>Loading...</h1>;
  }

  if (isDetailError) {
    return <Alert variant='danger'>{DetailError.message}</Alert>;
  }

  if (isGenreError) {
    return <Alert variant='danger'>{genreError.message}</Alert>;
  }

  const movie = DetailData.data;

  if (!movie) {
    return <Alert variant='danger'>Movie not found</Alert>;
  }

  const genreNames = movie.genres.map(genre => genre.name);
  
  return (
    <div className='ct'>
      <div className='container'>
        <div>
          <div className='movie-card' style={{ backgroundImage: `url(https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path})` }} />
        </div>
        <div>
          {genreNames.map((name, index) => (
            <Badge key={index} bg="danger" className='badge'>
              {name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Moviedetailpage;