import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import Homepage from './pages/Homepage/Homepage';
import Moviepage from './pages/Movies/Moviepage';
import Moviedetailpage from './pages/MovieDetail/Moviedetailpage';
import NotFoundpage from './pages/NotFoundpage/NotFoundpage';
import 'bootstrap/dist/css/bootstrap.min.css';


// 홈페이지 /
// 영화 전체보여주는 페이지 /movie
// 영화 디테일 페이지 /movies/:id
function App() {
  return (
    <Routes>
       <Route path='/' element={<AppLayout/>}>
            <Route index element={<Homepage/>}/>
            
                <Route path='movies/:id' element={<Moviedetailpage/>} />
                <Route path='movies' element={<Moviepage/>} />
           

            <Route path='*' element={<NotFoundpage/>}/>
            {/* <Route path='/movie' element={<Moviepage/>}/>
            <Route path='/movies/:id' element={<Moviedetailpage/>}/> */}
            {/*둘이 같은 내용이다. 앞에 path가 겹치는게 많으면 저런식으로 작성하면 좋다.*/}
       </Route>
    </Routes>
  );
}

export default App;
