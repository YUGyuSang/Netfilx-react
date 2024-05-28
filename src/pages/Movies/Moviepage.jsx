import React, { useState } from 'react'
import { useSearchMovieQuery } from '../../hooks/useSerchMovie'
import { useSearchParams } from 'react-router-dom'
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import './Moviepage.style.css';

// nav바에 클릭해서 온경우 => pupㅕlarMovie 보여준다.
// 키워드를 입력해서 온경우 => 키워드와 관련된 영화들을 보여준다.
//페이지네이션 설치
//page state 만들기
//페이지네이션 클릭할때마다 page 바꿔주기
//page 값이 바뀔 때 마다 usesearchMovie에 page까지 넣어서 fetch
const Moviepage = () => {
  const[query,setQuery] = useSearchParams();
  const[page,setPage] = useState(1);
  const keyword = query.get("q");
  

  const {data,isLoading,isError,error} = useSearchMovieQuery({keyword,page});
  const handlePageClick=({selected})=>{
    setPage(selected+1);
  }
  if(isLoading) {
    return(
      <div className='spinner-area'>
        <Spinner
          animation='border'
          variant='dnager'
          style={{width:'5rem',height:"5rem"}}
        />
      </div>
    );
  }

  if(isError){
    return <Alert variant='danger'>{error.message}</Alert>
  }
  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>{" "}필터{" "}</Col>
        
        <Col lg={8} xs={12}>
        <Row>
          {data?.results.map((movie,index)=> (
          <Col key={index} lg={4} xs={12}>
            <MovieCard movie={movie}/>
          </Col>
          ))}
        </Row>
      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        // pageCount={data?.total_pages}//전체페이지가 몇개인지
        pageCount={12}
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        forcePage={page - 1}
        className='page-nav'
      />
        </Col>
        
      </Row>
    </Container>
  )
}

export default Moviepage
