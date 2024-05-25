import React from 'react'
import Badge from 'react-bootstrap/Badge';
import './Moviedetail.style.css'

const Moviedetailpage = () => {
  return (
    <div className='ct'>
    <div className='container'>
      <div>
        {/* <img src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path.id}`} alt="#" /> */}
      </div>
      <div>
        <Badge bg="danger">Danger</Badge>
      </div>
    </div>
    </div>
  )
}

export default Moviedetailpage
