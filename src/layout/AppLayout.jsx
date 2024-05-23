import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Outlet, useNavigate } from 'react-router-dom';
import NetfilxImg from './img/Netflix-img.png';

const AppLayout = () => {
  const [keyword,setKeyword] = useState('');
  const navigate = useNavigate()

  const searchByKeyword=(event)=>{
      event.preventDefault() // 새로고침을 막는다. submit으로 받을 경우 계속 리프래쉬를 하는데 이걸 쓰먄 리프래쉬 안함
      //url를 바꺼주기
      navigate(`/movies?q=${keyword}`); // url 경로 
      setKeyword(''); // 검색후 비워주기
  }
  return (
    <div>
    <Navbar expand="lg" style={{ backgroundColor: '#000' }} className="navbar-dark">
      <Container fluid>
        <Navbar.Brand href="#"><img src={NetfilxImg} alt="Logo" style={{width:'100px', height:'50px'}} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="movies">Movie</Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={searchByKeyword}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={keyword}
              onChange={(event)=> setKeyword(event.target.value)} // 입력해줄 수 있게 하는 함수
            />
            <Button variant="outline-danger" type='submit'>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet/> {/*Outlet을 쓰면 자손들을 보여줌*/}
    </div>
  )
}

export default AppLayout
