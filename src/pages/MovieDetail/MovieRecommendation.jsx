import React from 'react'
import './MovieRecommendation.style.css'
import { useRecommendation } from '../../hooks/useRecommendation'
import { Alert, Container, Row, Col } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import MovieCard from '../../common/MovieCard/MovieCard';
import './MovieRecommendation.style.css'

const MovieRecommendation = () => {
    const { id } = useParams();
    const {
        data: RecommendationData,
        isLoading: isRecommendationLoading,
        isError: isRecommendationError,
        error: RecommendationError,
    } = useRecommendation(id);

    if (isRecommendationLoading) {
        return <h1>Loading...</h1>; // JSX를 반환해야 합니다.
    }
    if (isRecommendationError) {
        return <Alert variant="danger">{RecommendationError.message}</Alert>; // JSX를 반환해야 합니다.
    }
    const recommendation = RecommendationData.data.results
    console.log('추천', RecommendationData);

    return (
        // <div>
        //     <div className='movie-car' style={{backgroundImage:"url("+`https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${recommendation[0].poster_path}`+")"}}>
        //         {console.log('추천1',recommendation[0].poster_path)}
        //     </div>
        // </div>
        <Container>
                <Row style={{width:'800px'}}>
                    {recommendation.map((movie, index) => (
                        <Col key={index} lg={4} xs={12} className='re-img'>
                            <MovieCard movie={movie} />
                        </Col>
                    ))}
                </Row>
        </Container>
    );
}

export default MovieRecommendation;
