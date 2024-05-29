import React, { useState } from 'react'
import { useSearchMovieQuery } from '../../hooks/useSerchMovie'
import { useSearchParams } from 'react-router-dom'
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import './Moviepage.style.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useEffect } from 'react';


// nav바에 클릭해서 온경우 => pupㅕlarMovie 보여준다.
// 키워드를 입력해서 온경우 => 키워드와 관련된 영화들을 보여준다.
//페이지네이션 설치
//page state 만들기
//페이지네이션 클릭할때마다 page 바꿔주기
//page 값이 바뀔 때 마다 usesearchMovie에 page까지 넣어서 fetch

const sortMovies = (movies, sort) => {
  if (!movies) return [];
  switch (sort) {
    case 'popularity':
      return [...movies].sort((a, b) => b.popularity - a.popularity);
    case 'release_date':
      return [...movies].sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    case 'vote_average':
      return [...movies].sort((a, b) => b.vote_average - a.vote_average);
    default:
      return movies;
  }
};

const Moviepage = () => {
  const[query,setQuery] = useSearchParams();
  const[page,setPage] = useState(1);
  // const [sort, setSort] = useState('popularity.desc'); 기본 정렬 옵션
  const [sort, setSort] = useState(() => {
    // 이전에 설정된 정렬 상태가 로컬 스토리지에 저장되어 있는지 확인하고 없으면 기본값으로 설정합니다.
    const storedSort = localStorage.getItem('movieSort');
    return storedSort ? storedSort : 'popularity';
  });
  const keyword = query.get("q");

  useEffect(() => {
    // 페이지가 변경될 때마다 로컬 스토리지에 현재 정렬 상태를 저장합니다.
    localStorage.setItem('movieSort', sort);
  }, [sort]);
  
  const handleSortChange = (sortOption) => {
    setSort(sortOption);
    setPage(1); // 정렬 옵션이 변경될 때 페이지를 1로 리셋
  };

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

  const sortedMovies = sortMovies(data?.results, sort);

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
    <Navbar variant="dark" bg="dark" expand="lg" style={{width:'250px'}}>
      <Container fluid>
        <Navbar.Brand href="#home">정렬</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="고르기"
              menuVariant="dark"
              onSelect={handleSortChange}
            >
                    <NavDropdown.Item eventKey="popularity">인기순</NavDropdown.Item>
                    <NavDropdown.Item eventKey="release_date">개봉일순</NavDropdown.Item>
                    <NavDropdown.Item eventKey="vote_average">별점순</NavDropdown.Item>
            <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </Col>
        
        <Col lg={8} xs={12}>
        <Row>
          {sortedMovies.map((movie,index)=> (
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
