import React, { useState } from "react";
import Badge from "react-bootstrap/Badge";
import "./Moviedetail.style.css";
import { useMovieDetail } from "../../hooks/useMovieDetail";
import { Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useReview } from "../../hooks/useReview";
import MovieRecommendation from "./MovieRecommendation";

const Moviedetailpage = () => {
  const [rr,setRr] = useState(true);
  const [expandedReviews, setExpandedReviews] = useState([]);
  const { id } = useParams();
  const Rrtrueflase = () =>{
    setRr(!rr);
  }
  const {
    data: ReviewData,
    isLoading: isReviewLoading,
    isError: isReviewError,
    error: ReviewError,
  } = useReview(id);
  console.log("review", ReviewData);
  const {
    data: DetailData,
    isLoading: isDetailLoading,
    isError: isDetailError,
    error: DetailError,
  } = useMovieDetail(id);
  const {
    data: genreData,
    isLoading: isGenreLoading,
    isError: isGenreError,
    error: genreError,
  } = useMovieGenreQuery();
  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  if (isDetailLoading || isGenreLoading || isReviewLoading) {
    return <h1>Loading...</h1>;
  }

  if (isDetailError) {
    return <Alert variant="danger">{DetailError.message}</Alert>;
  }

  if (isGenreError) {
    return <Alert variant="danger">{genreError.message}</Alert>;
  }
  if (isReviewError) {
    return <Alert variant="danger">{ReviewError.message}</Alert>;
  }

  const movie = DetailData.data;
  console.log("name", movie);

  if (!movie) {
    return <Alert variant="danger">Movie not found</Alert>;
  }

  const genreNames = movie.genres.map((genre) => genre.name);
  const reviews = ReviewData.data.results;

  // 리뷰 내용을 더보기/접기 핸들러
  const toggleExpand = (index) => {
    if (expandedReviews.includes(index)) {
      // 이미 열려있는 경우, 해당 인덱스를 배열에서 제거하여 접기
      setExpandedReviews(expandedReviews.filter((item) => item !== index));
    } else {
      // 닫혀있는 경우, 해당 인덱스를 배열에 추가하여 열기
      setExpandedReviews([...expandedReviews, index]);
    }
  };

  return (
    <div className="ct">
      <div className="container">
        <div>
          <div
            className="movie-card"
            style={{
              backgroundImage: `url(https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path})`,
              transform: 'none',
            }}
          />
        </div>
        <div className="cm">
          {genreNames.map((name, index) => (
            <Badge key={index} bg="danger" className="badge">
              {name}
            </Badge>
          ))}
          <h1 className="title">{movie.title}</h1>
          <div className="title">{movie.overview}</div>
          <ul className="detailul">
            <li className="detailli">평점: {movie.vote_average.toFixed(1)}</li>
            <li className="detailli">인기도: {movie.popularity}</li>
            <li className="detailli">
              {movie.adult ? "애기들 보면 안돼!" : "전체이용가"}
            </li>
          </ul>
          <div className="title">
            <Badge pill bg="success" className="suc">
              Budget
            </Badge>{" "}
            {numberWithCommas(movie.budget)}
          </div>
          <div className="title">
            <Badge pill bg="success" className="suc">
              Release Date
            </Badge>{" "}
            {movie.release_date}
          </div>
          <div className="title">
            <Badge pill bg="success" className="suc">
              Run Time
            </Badge>{" "}
            {movie.runtime}분
          </div>
        </div>
      </div>

      <div className="container-2">
        {/* <h2 onClick={Rrtrueflase}>{rr ?'Review':'Recommendation'}</h2> */}
        <div className="togle">
        <h2 onClick={() => setRr(true)} style={{ color: rr ? 'red' : 'gray',cursor:'pointer' }}>Review </h2>
        <h3 style={{padding:'5px'}}> or </h3>
        <h2 onClick={() => setRr(false)} style={{ color: !rr ? 'red' : 'gray',cursor:'pointer' }}> Recommendation</h2>
        </div>
        <hr />
        {rr ?
          reviews.map((review, index) => (
            <div key={index} className="review-box">
              <div>⭐작성자⭐: {review.author}</div>
              <div>
                {expandedReviews.includes(index)
                  ? review.content
                  : `${review.content.slice(0, 400)}...`}
                <div>
                  <button className="btns" onClick={() => toggleExpand(index)}>
                    {expandedReviews.includes(index) ? "접기" : "펼치기"}
                  </button>
                </div>
              </div>
            </div>
          ))
          :
          <MovieRecommendation />}     
           </div>
    </div>
  );
};

export default Moviedetailpage;
